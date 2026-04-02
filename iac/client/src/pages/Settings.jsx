import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';

const Settings = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleProfilePictureUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Update would need to be added to backend
            // For now, just show placeholder
            setSuccess('Profile picture URL saved (backend endpoint needed)');
        } catch (err) {
            setError('Failed to update profile picture');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white py-8">
            <div className="container mx-auto max-w-2xl px-4">
                <h1 className="text-4xl font-bold mb-8">Settings</h1>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-700">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`pb-2 px-4 font-semibold transition ${
                            activeTab === 'profile'
                                ? 'border-b-2 border-green-500 text-green-400'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        👤 Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('account')}
                        className={`pb-2 px-4 font-semibold transition ${
                            activeTab === 'account'
                                ? 'border-b-2 border-green-500 text-green-400'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        🔒 Account
                    </button>
                </div>

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-6">Profile Information</h2>

                        {error && (
                            <div className="mb-4 p-3 bg-red-600 rounded text-white">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mb-4 p-3 bg-green-600 rounded text-white">
                                {success}
                            </div>
                        )}

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Username</label>
                                <input
                                    type="text"
                                    value={user?.username || ''}
                                    disabled
                                    className="w-full p-3 bg-gray-700 text-gray-400 border border-gray-600 rounded cursor-not-allowed"
                                />
                                <p className="text-gray-500 text-xs mt-1">Username cannot be changed</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    disabled
                                    className="w-full p-3 bg-gray-700 text-gray-400 border border-gray-600 rounded cursor-not-allowed"
                                />
                                <p className="text-gray-500 text-xs mt-1">Contact support to change email</p>
                            </div>

                            <form onSubmit={handleProfilePictureUpdate}>
                                <label className="block text-sm font-semibold mb-2">Profile Picture URL</label>
                                <input
                                    type="url"
                                    value={profilePicture}
                                    onChange={(e) => setProfilePicture(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded mb-3 placeholder-gray-500"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-2 px-6 rounded transition"
                                >
                                    {loading ? 'Saving...' : 'Update Picture'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Account Tab */}
                {activeTab === 'account' && (
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Change Password</h3>
                                <p className="text-gray-400 mb-4">
                                    Password change functionality coming soon
                                </p>
                            </div>

                            <div className="border-t border-gray-700 pt-6">
                                <h3 className="text-lg font-semibold mb-2 text-red-400">Danger Zone</h3>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to logout?')) {
                                            logout();
                                        }
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Settings;

