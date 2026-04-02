import { useState } from 'react';

export const useForm = (initialValues, onSubmit) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
    };

    const handleSubmit = async (e, validationFn) => {
        e.preventDefault();
        setIsSubmitting(true);

        const validationErrors = validationFn ? validationFn(values) : {};

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            await onSubmit(values);
        } catch (error) {
            setErrors({ submit: error.message || 'An error occurred' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setValues,
        setErrors,
        reset
    };
};

