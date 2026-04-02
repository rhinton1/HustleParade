import React from 'react';

const PodcastPlayer = () => {
    return (
        <section className="container mx-auto py-20">
            <h3 className="text-5xl font-black text-center mb-12 text-yellow-300">🎙️ CULTURE TALK 🎙️</h3>
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg shadow-lg border-2 border-yellow-400 flex items-center space-x-6">
                {/* Placeholder for podcast episode image */}
                <img src="https://via.placeholder.com/120/1a1a1a/FFD700?text=HipHop" alt="Podcast Thumbnail" className="w-32 h-32 rounded-lg border-2 border-yellow-400" />
                <div className="flex-grow">
                    <h4 className="text-2xl font-black mb-2 text-yellow-300">BEHIND THE BEATS</h4>
                    <p className="text-gray-300 text-sm mb-4 font-bold">Featuring: Famous Producer | Duration: 45:30</p>
                    {/* Audio player implementation would go here */}
                    <audio controls className="w-full bg-gray-800 rounded">
                        <source src="podcast-episode.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
        </section>
    );
};

export default PodcastPlayer;