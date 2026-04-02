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
        <div className="min-h-screen bg-black text-white py-8">
            <div className="container mx-auto max-w-4xl px-4">
                <h1 className="text-5xl font-black mb-3 text-yellow-300">🔍 DISCOVER HEAT 🔍</h1>
                <p className="text-gray-300 font-bold mb-10">Find fire beats, producers, and rappers from around the world.</p>

                {/* Tabs */}
                <div className="flex gap-4 mb-10 border-b-2 border-gray-700">
                    <button
                        onClick={() => setActiveTab('music')}
                        className={`pb-3 px-6 font-black transition ${
                            activeTab === 'music'
                                ? 'border-b-4 border-yellow-400 text-yellow-300 text-lg'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        🎵 BEATS
                    </button>
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`pb-3 px-6 font-black transition ${
                            activeTab === 'posts'
                                ? 'border-b-4 border-yellow-400 text-yellow-300 text-lg'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        📣 BARS
                    </button>
                </div>

                {loading && <div className="text-center text-gray-400 text-lg">Loading the culture...</div>}
                {error && <div className="text-center text-red-400 font-bold">{error}</div>}

                {!loading && !error && (
                    <div>
                        {activeTab === 'music' && (
                            <div className="text-center text-gray-400 py-20">
                                <p className="mb-4 text-2xl">🎵 Beat catalog loading...</p>
                                <p className="text-sm">Drop your beats to appear here! 🔥</p>
                            </div>
                        )}

                        {activeTab === 'posts' && (
                            <div className="text-center text-gray-400 py-20">
                                <p className="mb-4 text-2xl">📣 Freestyle posts loading...</p>
                                <p className="text-sm">Share your thoughts to appear here! 🎤</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Discover;

