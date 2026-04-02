import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getValidationErrors } from '../utils/validation';

const AuthModal = ({ isOpen, onClose, mode = 'login' }) => {
    const [formMode, setFormMode] = useState(mode);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, register, error: authError } = useAuth();

    const handleClose = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors({});
        setFormMode(mode);
        onClose();
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        const formData = { email: email || username, password };
        const validationErrors = getValidationErrors(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const identifier = email || username;
            await login(identifier, password);
            handleClose();
        } catch (err) {
            setErrors({ auth: err });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        const validationErrors = getValidationErrors({
            username,
            email,
            password,
            confirmPassword
        });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            await register(username, email, password);
            handleClose();
        } catch (err) {
            setErrors({ auth: err });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    const displayError = errors.auth || authError;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-white">
                    {formMode === 'login' ? 'Login' : 'Create Account'}
                </h2>

                {displayError && (
                    <div className="mb-4 p-3 bg-red-600 text-white rounded text-sm">
                        {displayError}
                    </div>
                )}

                <form onSubmit={formMode === 'login' ? handleLogin : handleRegister}>
                    {formMode === 'register' && (
                        <div className="mb-4">
                            <label className="block text-gray-300 mb-2 text-sm">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-500 ${
                                    errors.username ? 'border-red-500' : 'border-gray-600'
                                }`}
                                placeholder="username"
                            />
                            {errors.username && (
                                <p className="text-red-400 text-xs mt-1">{errors.username}</p>
                            )}
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2 text-sm">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-500 ${
                                errors.email ? 'border-red-500' : 'border-gray-600'
                            }`}
                            placeholder="your@email.com"
                        />
                        {errors.email && (
                            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2 text-sm">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-500 ${
                                errors.password ? 'border-red-500' : 'border-gray-600'
                            }`}
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                        )}
                    </div>

                    {formMode === 'register' && (
                        <div className="mb-6">
                            <label className="block text-gray-300 mb-2 text-sm">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full p-2 border rounded bg-gray-800 text-white placeholder-gray-500 ${
                                    errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                                }`}
                                placeholder="••••••••"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded transition"
                    >
                        {isSubmitting ? 'Processing...' : (formMode === 'login' ? 'Login' : 'Sign Up')}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-gray-400 text-sm">
                        {formMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
                        {' '}
                        <button
                            onClick={() => {
                                setFormMode(formMode === 'login' ? 'register' : 'login');
                                setErrors({});
                            }}
                            className="text-green-400 hover:text-green-300 font-semibold"
                        >
                            {formMode === 'login' ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>

                <button
                    onClick={handleClose}
                    className="mt-4 w-full text-gray-400 hover:text-gray-300 py-2"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AuthModal;


