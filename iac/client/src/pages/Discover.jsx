import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const Discover = () => {
    const [posts, setPosts] = useState([]);
    const [music, setMusic] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('music');

    useEffect(() => {
        const fetchPublicContent = async () => {
            setLoading(true);
            setError('');
            try {
                // Fetch public posts and music from all users
                // Note: You may need to add endpoints like /posts/public and /music/public
                // For now, we'll fetch from a featured user or add pagination
                setPosts([]);
                setMusic([]);
            } catch (err) {
                setError('Failed to load content');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPublicContent();
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white py-8">
            <div className="container mx-auto max-w-4xl px-4">
                <h1 className="text-4xl font-bold mb-2">Discover</h1>
                <p className="text-gray-400 mb-8">Find talented musicians and amazing music from the community.</p>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-700">
                    <button
                        onClick={() => setActiveTab('music')}
                        className={`pb-2 px-4 font-semibold transition ${
                            activeTab === 'music'
                                ? 'border-b-2 border-green-500 text-green-400'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        🎵 Music
                    </button>
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`pb-2 px-4 font-semibold transition ${
                            activeTab === 'posts'
                                ? 'border-b-2 border-green-500 text-green-400'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        📝 Posts
                    </button>
                </div>

                {loading && <div className="text-center text-gray-400">Loading...</div>}
                {error && <div className="text-center text-red-400">{error}</div>}

                {!loading && !error && (
                    <div>
                        {activeTab === 'music' && (
                            <div className="text-center text-gray-400 py-12">
                                <p className="mb-4">🎵 Music catalog coming soon</p>
                                <p className="text-sm">Share your music to appear here!</p>
                            </div>
                        )}

                        {activeTab === 'posts' && (
                            <div className="text-center text-gray-400 py-12">
                                <p className="mb-4">📝 Community posts coming soon</p>
                                <p className="text-sm">Share your thoughts to appear here!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Discover;

