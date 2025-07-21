import React from 'react';

const PodcastPlayer = () => {
    return (
        <section className="container mx-auto py-16">
            <h3 className="text-4xl font-bold text-center mb-8">Our Latest Podcast</h3>
            <div className="max-w-xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4">
                {/* Placeholder for podcast episode image */}
                <img src="https://via.placeholder.com/100" alt="Podcast Thumbnail" className="w-24 h-24 rounded-lg" />
                <div className="flex-grow">
                    <h4 className="text-2xl font-semibold mb-2">Episode Title: The Art of Remote Collaboration</h4>
                    <p className="text-gray-400 text-sm mb-4">Guest: [Guest Name] | Duration: 45:30</p>
                    {/* Audio player implementation would go here */}
                    <audio controls className="w-full">
                        <source src="podcast-episode.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            </div>
        </section>
    );
};

export default PodcastPlayer;