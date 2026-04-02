import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../components/AuthModal';

const Collaborate = () => {
    const { isAuthenticated } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-900 text-white py-8">
                <div className="container mx-auto max-w-4xl px-4">
                    <h1 className="text-4xl font-bold mb-2">Collaborate</h1>
                    <p className="text-gray-400 mb-8">Connect with musicians and create amazing music together.</p>

                    <div className="bg-gray-800 p-8 rounded-lg text-center">
                        <p className="mb-6 text-lg">Sign in to start collaborating with other artists</p>
                        <button
                            onClick={() => setShowAuthModal(true)}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition"
                        >
                            Login to Collaborate
                        </button>
                    </div>
                </div>
                <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} mode="login" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white py-8">
            <div className="container mx-auto max-w-4xl px-4">
                <h1 className="text-4xl font-bold mb-2">Collaborate</h1>
                <p className="text-gray-400 mb-8">Connect with musicians and create amazing music together.</p>

                {/* Upload Music Section */}
                <div className="bg-gray-800 p-6 rounded-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4">Upload Your Music</h2>
                    <p className="text-gray-400 mb-6">Share your tracks and find collaboration opportunities</p>
                    
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Track Title</label>
                            <input
                                type="text"
                                placeholder="e.g., Summer Vibes Remix"
                                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded placeholder-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Description</label>
                            <textarea
                                placeholder="Tell others about your track..."
                                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded placeholder-gray-500 resize-none h-24"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Full Track URL</label>
                            <input
                                type="url"
                                placeholder="https://example.com/track.mp3"
                                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded placeholder-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Preview Clip URL</label>
                            <input
                                type="url"
                                placeholder="https://example.com/preview.mp3"
                                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded placeholder-gray-500"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="public"
                                defaultChecked
                                className="w-4 h-4"
                            />
                            <label htmlFor="public" className="text-sm">
                                Make this track public so others can discover it
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded transition"
                        >
                            Upload Track
                        </button>
                    </form>
                </div>

                {/* Find Collaborators Section */}
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Find Collaborators</h2>
                    <p className="text-gray-400 mb-6">Browse musicians looking to collaborate</p>
                    <button className="text-green-400 hover:text-green-300 font-semibold">
                        Browse Collaborators →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Collaborate;

