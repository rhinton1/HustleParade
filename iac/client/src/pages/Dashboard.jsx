import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';

const Dashboard = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [music, setMusic] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            setError('');
            try {
                const [postsRes, musicRes] = await Promise.all([
                    api.get('/posts/user'),
                    api.get('/music/user')
                ]);
                setPosts(postsRes.data);
                setMusic(musicRes.data);
            } catch (err) {
                setError('Failed to load your content');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newPost.trim()) return;

        try {
            const response = await api.post('/posts', {
                content: newPost,
                public: true
            });
            setPosts([response.data, ...posts]);
            setNewPost('');
        } catch (err) {
            setError('Failed to create post');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading your dashboard...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white py-8">
            <div className="container mx-auto max-w-4xl px-4">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Welcome, {user?.username}! 🎵</h1>
                    <p className="text-gray-400">Manage your music, posts, and collaborations here.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-600 rounded text-white">
                        {error}
                    </div>
                )}

                {/* Create Post Section */}
                <div className="mb-8 bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Share Something</h2>
                    <form onSubmit={handleCreatePost}>
                        <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="What's on your mind? Share your thoughts, ideas, or ask for collaborators..."
                            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded mb-4 placeholder-gray-500 resize-none h-24"
                        />
                        <button
                            type="submit"
                            disabled={!newPost.trim()}
                            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-2 px-6 rounded transition"
                        >
                            Post
                        </button>
                    </form>
                </div>

                {/* Posts Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Your Posts ({posts.length})</h2>
                    {posts.length === 0 ? (
                        <div className="bg-gray-800 p-6 rounded text-gray-400 text-center">
                            No posts yet. Share your first post above!
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <div key={post._id} className="bg-gray-800 p-6 rounded-lg">
                                    <p className="text-white mb-2">{post.content}</p>
                                    <p className="text-gray-500 text-sm">
                                        {new Date(post.createdAt).toLocaleDateString()} • {post.public ? '🌍 Public' : '🔒 Private'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Music Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Your Music ({music.length})</h2>
                    {music.length === 0 ? (
                        <div className="bg-gray-800 p-6 rounded text-gray-400 text-center">
                            No music uploaded yet.{' '}
                            <a href="/collaborate" className="text-green-400 hover:text-green-300">
                                Share your first track
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {music.map((track) => (
                                <div key={track._id} className="bg-gray-800 p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-white mb-2">{track.title}</h3>
                                    {track.description && (
                                        <p className="text-gray-400 mb-2">{track.description}</p>
                                    )}
                                    {track.clipUrl && (
                                        <audio controls className="w-full mb-2">
                                            <source src={track.clipUrl} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    )}
                                    <p className="text-gray-500 text-sm">
                                        {new Date(track.createdAt).toLocaleDateString()} • {track.public ? '🌍 Public' : '🔒 Private'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

