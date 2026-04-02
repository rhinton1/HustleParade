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
        <div className="min-h-screen bg-black text-white py-8">
            <div className="container mx-auto max-w-4xl px-4">
                {/* Welcome Section */}
                <div className="mb-8 border-b-2 border-yellow-400 pb-6">
                    <h1 className="text-5xl font-black mb-2 text-yellow-300">🎙️ {user?.username}'S STUDIO 🎙️</h1>
                    <p className="text-gray-300 font-bold">Drop bars, share beats, find your squad.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-700 rounded text-white font-bold border-2 border-red-500">
                        ❌ {error}
                    </div>
                )}

                {/* Create Post Section */}
                <div className="mb-8 bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border-2 border-yellow-400">
                    <h2 className="text-3xl font-black mb-4 text-yellow-300">📝 DROP A FREESTYLE</h2>
                    <form onSubmit={handleCreatePost}>
                        <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="Share your thoughts, bars, production ideas, or collab requests..."
                            className="w-full p-4 bg-gray-800 text-white border-2 border-gray-700 rounded mb-4 placeholder-gray-500 resize-none h-24 focus:border-yellow-400 focus:outline-none"
                        />
                        <button
                            type="submit"
                            disabled={!newPost.trim()}
                            className="bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-600 text-black font-black py-3 px-8 rounded-full transition transform hover:scale-105"
                        >
                            🔥 POST IT
                        </button>
                    </form>
                </div>

                {/* Posts Section */}
                <div className="mb-12">
                    <h2 className="text-3xl font-black mb-6 text-yellow-300 border-b-2 border-yellow-400 pb-3">📣 YOUR FREESTYLES ({posts.length})</h2>
                    {posts.length === 0 ? (
                        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded border-2 border-gray-700 text-gray-400 text-center">
                            No posts yet. Drop your first freestyle above! 🎤
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <div key={post._id} className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-lg border-l-4 border-yellow-400">
                                    <p className="text-white mb-3 text-lg">{post.content}</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-400 text-sm font-bold">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-yellow-400 font-bold">
                                            {post.public ? '🌍 PUBLIC' : '🔒 PRIVATE'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Music Section */}
                <div>
                    <h2 className="text-3xl font-black mb-6 text-yellow-300 border-b-2 border-yellow-400 pb-3">🎵 YOUR BEATS ({music.length})</h2>
                    {music.length === 0 ? (
                        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded border-2 border-gray-700 text-gray-400 text-center">
                            No beats yet.{' '}
                            <a href="/collaborate" className="text-yellow-400 hover:text-yellow-300 font-bold">
                                Upload your first track
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {music.map((track) => (
                                <div key={track._id} className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-lg border-l-4 border-yellow-400">
                                    <h3 className="text-2xl font-black text-yellow-300 mb-2">{track.title}</h3>
                                    {track.description && (
                                        <p className="text-gray-300 mb-3">{track.description}</p>
                                    )}
                                    {track.clipUrl && (
                                        <audio controls className="w-full mb-4 bg-gray-800 rounded">
                                            <source src={track.clipUrl} type="audio/mpeg" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-400 text-sm font-bold">
                                            {new Date(track.createdAt).toLocaleDateString()}
                                        </p>
                                        <p className="text-yellow-400 font-bold">
                                            {track.public ? '🌍 PUBLIC' : '🔒 PRIVATE'}
                                        </p>
                                    </div>
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

