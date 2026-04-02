import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../components/AuthModal';

const Collaborate = () => {
    const { isAuthenticated } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white py-8">
                <div className="container mx-auto max-w-4xl px-4">
                    <h1 className="text-5xl font-black mb-4 text-yellow-300">🎛️ COLLAB STATION 🎛️</h1>
                    <p className="text-gray-300 font-bold mb-8">Connect with producers, rappers, and engineers worldwide.</p>

                    <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-lg text-center border-2 border-yellow-400">
                        <p className="mb-6 text-xl font-bold text-gray-200">Sign in to drop your beats and find your next feature</p>
                        <button
                            onClick={() => setShowAuthModal(true)}
                            className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-4 px-10 rounded-full text-lg transition transform hover:scale-105"
                        >
                            LOGIN TO COLLAB 🔥
                        </button>
                    </div>
                </div>
                <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} mode="login" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white py-8">
            <div className="container mx-auto max-w-4xl px-4">
                <h1 className="text-5xl font-black mb-4 text-yellow-300">🎛️ COLLAB STATION 🎛️</h1>
                <p className="text-gray-300 font-bold mb-10">Connect with producers, rappers, and engineers worldwide.</p>

                {/* Upload Music Section */}
                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg mb-10 border-2 border-yellow-400">
                    <h2 className="text-3xl font-black mb-4 text-yellow-300">🔊 DROP YOUR BEAT</h2>
                    <p className="text-gray-300 mb-8 font-bold">Share your production and find your next collab partner</p>
                    
                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-black mb-2 text-yellow-400">BEAT NAME</label>
                            <input
                                type="text"
                                placeholder="e.g., Golden Hour Trap Beat"
                                className="w-full p-3 bg-gray-800 text-white border-2 border-gray-700 rounded placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black mb-2 text-yellow-400">DESCRIPTION</label>
                            <textarea
                                placeholder="BPM, sample credits, vibe, looking for rappers/singers..."
                                className="w-full p-3 bg-gray-800 text-white border-2 border-gray-700 rounded placeholder-gray-500 resize-none h-24 focus:border-yellow-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black mb-2 text-yellow-400">FULL TRACK URL</label>
                            <input
                                type="url"
                                placeholder="https://example.com/beat.mp3"
                                className="w-full p-3 bg-gray-800 text-white border-2 border-gray-700 rounded placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black mb-2 text-yellow-400">PREVIEW CLIP URL</label>
                            <input
                                type="url"
                                placeholder="https://example.com/preview.mp3"
                                className="w-full p-3 bg-gray-800 text-white border-2 border-gray-700 rounded placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded border-2 border-gray-700">
                            <input
                                type="checkbox"
                                id="public"
                                defaultChecked
                                className="w-5 h-5 cursor-pointer"
                            />
                            <label htmlFor="public" className="text-sm font-bold cursor-pointer">
                                Make this beat available for features 🌍
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-4 rounded transition transform hover:scale-105"
                        >
                            🚀 UPLOAD BEAT
                        </button>
                    </form>
                </div>

                {/* Find Collaborators Section */}
                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border-2 border-yellow-400">
                    <h2 className="text-3xl font-black mb-4 text-yellow-300">🔍 FIND YOUR SQUAD</h2>
                    <p className="text-gray-300 mb-6 font-bold">Browse artists looking to collaborate</p>
                    <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3 px-8 rounded-full transition transform hover:scale-105">
                        🎤 BROWSE COLLABORATORS
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Collaborate;

