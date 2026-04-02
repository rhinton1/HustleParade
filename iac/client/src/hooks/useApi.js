import { useState, useEffect } from 'react';
import api from '../api/axios';

export const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(url, options);
                setData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        if (url) {
            fetchData();
        }
    }, [url]);

    return { data, loading, error };
};

export const usePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const post = async (url, payload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post(url, payload);
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'Request failed';
            setError(errorMsg);
            throw errorMsg;
        } finally {
            setLoading(false);
        }
    };

    return { post, loading, error };
};

export const usePut = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const put = async (url, payload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(url, payload);
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'Request failed';
            setError(errorMsg);
            throw errorMsg;
        } finally {
            setLoading(false);
        }
    };

    return { put, loading, error };
};

export const useDelete = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const delete_ = async (url) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.delete(url);
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'Request failed';
            setError(errorMsg);
            throw errorMsg;
        } finally {
            setLoading(false);
        }
    };

    return { delete: delete_, loading, error };
};

