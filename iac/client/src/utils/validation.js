// Form validation utilities
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateUsername = (username) => {
    // 3-20 characters, alphanumeric and underscores only
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
};

export const validatePassword = (password) => {
    // At least 6 characters
    return password && password.length >= 6;
};

export const getValidationErrors = (formData) => {
    const errors = {};

    if (formData.username !== undefined) {
        if (!formData.username.trim()) {
            errors.username = 'Username is required';
        } else if (!validateUsername(formData.username)) {
            errors.username = 'Username must be 3-20 characters (alphanumeric and underscores only)';
        }
    }

    if (formData.email !== undefined) {
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            errors.email = 'Invalid email address';
        }
    }

    if (formData.password !== undefined) {
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (!validatePassword(formData.password)) {
            errors.password = 'Password must be at least 6 characters';
        }
    }

    if (formData.confirmPassword !== undefined && formData.password !== undefined) {
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
    }

    return errors;
};

