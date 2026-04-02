import React, { createContext, useState, useEffect } from 'react';
import authService from '../hooks/AuthContext';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(authService.user);
    const [token, setToken] = useState(authService.token);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Sync React state whenever the auth service state changes
    useEffect(() => {
        const unsubscribe = authService.subscribe(({ user, token }) => {
            setUser(user);
            setToken(token);
        });
        return unsubscribe;
    }, []);

    // Re-hydrate the user from the server on initial load
    useEffect(() => {
        const hydrate = async () => {
            if (authService.token) {
                // Reject if the stored token is already expired
                if (authService.isTokenExpired()) {
                    authService.logout();
                } else {
                    try {
                        await authService.fetchCurrentUser();
                    } catch {
                        authService.logout();
                    }
                }
            }
            setLoading(false);
        };

        hydrate();
    }, []);

    const register = async (username, email, password) => {
        setError(null);
        try {
            return await authService.register(username, email, password);
        } catch (err) {
            setError(err.message);
            throw err.message;
        }
    };

    const login = async (emailOrUsername, password) => {
        setError(null);
        try {
            return await authService.login(emailOrUsername, password);
        } catch (err) {
            setError(err.message);
            throw err.message;
        }
    };

    const logout = () => {
        setError(null);
        authService.logout();
    };

    const value = {
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated: !!token,
        // Expose token helpers from the service
        isTokenExpired: () => authService.isTokenExpired(),
        tokenExpiresIn: () => authService.tokenExpiresIn(),
        decodeToken: () => authService.decodeToken(),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};



