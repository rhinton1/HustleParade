import React from 'react';

const PodcastPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white py-8">
            <div className="container mx-auto max-w-4xl px-4">
                <h1 className="text-4xl font-bold mb-2">Podcast</h1>
                <p className="text-gray-400 mb-8">Listen to conversations with musicians and industry experts</p>

                {/* Featured Episode */}
                <div className="bg-gray-800 p-6 rounded-lg mb-8">
                    <h2 className="text-2xl font-bold mb-4">Latest Episode</h2>
                    <div className="flex gap-6">
                        <img
                            src="https://via.placeholder.com/200"
                            alt="Podcast Thumbnail"
                            className="w-40 h-40 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">Episode 1: The Art of Remote Collaboration</h3>
                            <p className="text-gray-400 mb-4">
                                In this first episode, we talk about how musicians can effectively collaborate across
                                distances, overcome challenges, and create amazing music together.
                            </p>
                            <p className="text-gray-500 text-sm mb-4">Duration: 45 min | Published 2 weeks ago</p>
                            <audio controls className="w-full">
                                <source src="podcast-episode.mp3" type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                </div>

                {/* Episodes List */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">All Episodes</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-800 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Episode 1: The Art of Remote Collaboration</h3>
                            <p className="text-gray-400 text-sm mb-2">45 min • 2 weeks ago</p>
                            <button className="text-green-400 hover:text-green-300 font-semibold">
                                Listen Now →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Coming Soon */}
                <div className="mt-8 bg-gradient-to-r from-purple-900 to-indigo-900 p-8 rounded-lg text-center">
                    <h3 className="text-2xl font-bold mb-2">More Episodes Coming Soon</h3>
                    <p className="text-gray-300">
                        Subscribe to stay updated on new episodes and conversations with artists in the HustleParade community.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PodcastPage;

