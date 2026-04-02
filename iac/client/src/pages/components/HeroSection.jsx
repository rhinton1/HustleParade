import React from 'react';

const HeroSection = ({ onGetStarted }) => {
    return (
        <section className="bg-gradient-to-r from-black via-gray-900 to-black text-center py-32 border-b-4 border-yellow-400">
            <div className="container mx-auto">
                <div className="mb-4 text-yellow-400 text-2xl font-bold tracking-wider">🎤 YO HIP HOP COLLAB 🎤</div>
                <h2 className="text-7xl font-black mb-6 text-yellow-300 drop-shadow-lg" style={{textShadow: '0 0 20px rgba(250, 204, 21, 0.5)'}}>
                    MAKE BEATS. DROP HEAT.
                </h2>
                <p className="text-2xl mb-8 text-gray-200 font-bold">Connect with producers, rappers & artists in the culture</p>
                <button
                    onClick={onGetStarted}
                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-4 px-10 rounded-full text-xl transition duration-300 transform hover:scale-105 shadow-lg border-2 border-yellow-300"
                >
                    🚀 START GRINDING
                </button>
            </div>
        </section>
    );
};

export default HeroSection;