import React from 'react';

const PodcastPage = () => {
    return (
        <div className="min-h-screen bg-black text-white py-8">
            <div className="container mx-auto max-w-4xl px-4">
                <h1 className="text-5xl font-black mb-3 text-yellow-300">🎙️ CULTURE TALK RADIO 🎙️</h1>
                <p className="text-gray-300 font-bold mb-10">Conversations with producers, rappers, and industry legends.</p>

                {/* Featured Episode */}
                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg mb-10 border-2 border-yellow-400">
                    <h2 className="text-3xl font-black mb-6 text-yellow-300">🔥 LATEST DROP</h2>
                    <div className="flex gap-6 flex-col md:flex-row">
                        <img
                            src="https://via.placeholder.com/200/1a1a1a/FFD700?text=Episode1"
                            alt="Podcast Thumbnail"
                            className="w-48 h-48 rounded-lg object-cover border-2 border-yellow-400"
                        />
                        <div className="flex-1">
                            <h3 className="text-2xl font-black mb-3 text-yellow-300">BEHIND THE BEATS</h3>
                            <p className="text-gray-300 mb-4 font-bold text-lg">
                                With legendary producer Metro Boomin, we discuss the evolution of trap music, 
                                working with top artists, and the future of hip hop production.
                            </p>
                            <p className="text-gray-400 text-sm mb-6 font-bold">Duration: 1 hr 15 min | Released 1 week ago</p>
                            <audio controls className="w-full bg-gray-800 rounded">
                                <source src="podcast-episode.mp3" type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                </div>

                {/* Episodes List */}
                <div>
                    <h2 className="text-3xl font-black mb-6 text-yellow-300 border-b-2 border-yellow-400 pb-3">📻 ALL EPISODES</h2>
                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-lg border-l-4 border-yellow-400">
                            <h3 className="text-xl font-black text-yellow-300 mb-2">BEHIND THE BEATS</h3>
                            <p className="text-gray-300 text-sm mb-3 font-bold">1 hr 15 min • 1 week ago</p>
                            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-2 px-6 rounded-full transition transform hover:scale-105">
                                🔊 LISTEN NOW
                            </button>
                        </div>
                        <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-lg border-l-4 border-gray-600">
                            <h3 className="text-xl font-black text-gray-300 mb-2">THE GRIND MENTALITY</h3>
                            <p className="text-gray-400 text-sm mb-3 font-bold">58 min • 2 weeks ago</p>
                            <button className="bg-gray-600 hover:bg-gray-700 text-white font-black py-2 px-6 rounded-full transition transform hover:scale-105">
                                🔊 LISTEN NOW
                            </button>
                        </div>
                        <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-lg border-l-4 border-gray-600">
                            <h3 className="text-xl font-black text-gray-300 mb-2">FLOW & PRODUCTION SECRETS</h3>
                            <p className="text-gray-400 text-sm mb-3 font-bold">1 hr 2 min • 3 weeks ago</p>
                            <button className="bg-gray-600 hover:bg-gray-700 text-white font-black py-2 px-6 rounded-full transition transform hover:scale-105">
                                🔊 LISTEN NOW
                            </button>
                        </div>
                    </div>
                </div>

                {/* Coming Soon */}
                <div className="mt-12 bg-gradient-to-r from-yellow-500 to-orange-500 p-10 rounded-lg text-center border-2 border-yellow-300">
                    <h3 className="text-3xl font-black mb-3 text-black">🎤 MORE FIRE COMING 🎤</h3>
                    <p className="text-black font-bold text-lg">
                        Subscribe to get notified about new episodes with your favorite artists and producers.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PodcastPage;

