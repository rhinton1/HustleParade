const BASE_URL = 'http://localhost:4000/api';
const TOKEN_KEY = 'token';

export class AuthContext {
    #user = null;
    #token = null;
    #listeners = new Set();

    constructor() {
        // Restore token from storage on instantiation
        this.#token = localStorage.getItem(TOKEN_KEY) || null;
    }

    // ─── Getters ────────────────────────────────────────────────────────────────

    get user() {
        return this.#user;
    }

    get token() {
        return this.#token;
    }

    get isAuthenticated() {
        return !!this.#token;
    }

    // ─── Auth Operations ────────────────────────────────────────────────────────

    /**
     * Register a new user.
     * @param {string} username
     * @param {string} email
     * @param {string} password
     * @returns {Promise<{token: string, user: object}>}
     */
    async register(username, email, password) {
        const data = await this.#request('POST', '/auth/register', {
            username,
            email,
            password,
        });
        this.#setSession(data.token, data.user);
        return data;
    }

    /**
     * Login with email/username and password.
     * @param {string} emailOrUsername
     * @param {string} password
     * @returns {Promise<{token: string, user: object}>}
     */
    async login(emailOrUsername, password) {
        const data = await this.#request('POST', '/auth/login', {
            emailOrUsername,
            password,
        });
        this.#setSession(data.token, data.user);
        return data;
    }

    /**
     * Fetch the current authenticated user from the server.
     * Useful for re-hydrating state after a page refresh.
     * @returns {Promise<object>} The current user object.
     */
    async fetchCurrentUser() {
        if (!this.#token) throw new Error('No token available');
        const user = await this.#request('GET', '/auth/me');
        this.#user = user;
        this.#notify();
        return user;
    }

    /**
     * Logout the current user and clear all session data.
     */
    logout() {
        this.#clearSession();
    }

    // ─── Token Helpers ──────────────────────────────────────────────────────────

    /**
     * Decode the JWT payload without verifying the signature.
     * @returns {object|null} Decoded payload or null if no token.
     */
    decodeToken() {
        if (!this.#token) return null;
        try {
            const payload = this.#token.split('.')[1];
            return JSON.parse(atob(payload));
        } catch {
            return null;
        }
    }

    /**
     * Check whether the current token has expired.
     * @returns {boolean}
     */
    isTokenExpired() {
        const decoded = this.decodeToken();
        if (!decoded?.exp) return true;
        return Date.now() >= decoded.exp * 1000;
    }

    /**
     * Returns ms until token expiry, or 0 if expired/no token.
     * @returns {number}
     */
    tokenExpiresIn() {
        const decoded = this.decodeToken();
        if (!decoded?.exp) return 0;
        return Math.max(0, decoded.exp * 1000 - Date.now());
    }

    // ─── Change Listener (for non-React consumers) ───────────────────────────

    /**
     * Subscribe to auth state changes.
     * @param {Function} listener - Called with { user, token, isAuthenticated } on change.
     * @returns {Function} Unsubscribe function.
     */
    subscribe(listener) {
        this.#listeners.add(listener);
        return () => this.#listeners.delete(listener);
    }

    // ─── Private Helpers ─────────────────────────────────────────────────────

    #setSession(token, user) {
        this.#token = token;
        this.#user = user;
        localStorage.setItem(TOKEN_KEY, token);
        this.#notify();
    }

    #clearSession() {
        this.#token = null;
        this.#user = null;
        localStorage.removeItem(TOKEN_KEY);
        this.#notify();
    }

    #notify() {
        const state = {
            user: this.#user,
            token: this.#token,
            isAuthenticated: this.isAuthenticated,
        };
        this.#listeners.forEach((fn) => fn(state));
    }

    async #request(method, endpoint, body = null) {
        const headers = { 'Content-Type': 'application/json' };
        if (this.#token) headers['Authorization'] = `Bearer ${this.#token}`;

        const config = {
            method,
            headers,
        };
        if (body) config.body = JSON.stringify(body);

        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || `Request failed: ${response.status}`);
        }

        return data;
    }
}

// Singleton export — share one instance across the app
export default new AuthContext();

