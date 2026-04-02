import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';

const UserProfile = () => {
    const { username } = useParams();
    const { user: currentUser } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [music, setMusic] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            setError('');
            try {
                const [userRes, postsRes, musicRes] = await Promise.all([
                    api.get(`/users/${username}`),
                    api.get(`/posts/public/${username}`),
                    api.get(`/music/public/${username}`)
                ]);
                setProfile(userRes.data);
                setPosts(postsRes.data);
                setMusic(musicRes.data);
            } catch (err) {
                setError('Failed to load user profile');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchUserProfile();
        }
    }, [username]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading profile...</div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen bg-gray-900 text-white py-8">
                <div className="container mx-auto max-w-4xl px-4">
                    <div className="bg-gray-800 p-8 rounded-lg text-center">
                        <p className="text-red-400 mb-4">{error || 'User not found'}</p>
                        <button
                            onClick={() => navigate('/discover')}
                            className="text-green-400 hover:text-green-300 font-semibold"
                        >
                            Back to Discover
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white py-8">
            <div className="container mx-auto max-w-4xl px-4">
                {/* Profile Header */}
                <div className="bg-gray-800 p-8 rounded-lg mb-8">
                    <div className="flex items-center gap-6">
                        {profile.profilePicture ? (
                            <img
                                src={profile.profilePicture}
                                alt={profile.username}
                                className="w-24 h-24 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-3xl font-bold">
                                {profile.username[0].toUpperCase()}
                            </div>
                        )}
                        <div>
                            <h1 className="text-4xl font-bold mb-2">@{profile.username}</h1>
                            <p className="text-gray-400 mb-4">{profile.email}</p>
                            <p className="text-sm text-gray-500">
                                Joined {new Date(profile.createdAt).toLocaleDateString()}
                            </p>
                            {currentUser?.id !== profile._id && (
                                <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition">
                                    Connect
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-700">
                    <button className="pb-2 px-4 font-semibold border-b-2 border-green-500 text-green-400">
                        🎵 Music ({music.length})
                    </button>
                    <button className="pb-2 px-4 font-semibold text-gray-400 hover:text-white">
                        📝 Posts ({posts.length})
                    </button>
                </div>

                {/* Music Section */}
                <div>
                    {music.length === 0 ? (
                        <div className="bg-gray-800 p-6 rounded text-gray-400 text-center">
                            No music shared yet
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
                                        {new Date(track.createdAt).toLocaleDateString()}
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

export default UserProfile;

