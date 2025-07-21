import React from 'react';

const HeroSection = () => {
    return (
        <section className="bg-gradient-to-r from-purple-800 to-indigo-800 text-center py-20">
            <div className="container mx-auto">
                <h2 className="text-5xl font-extrabold mb-4">Unite Your Musical Vision</h2>
                <p className="text-xl mb-8">Connect with talented musicians, producers, and vocalists worldwide.</p>
                <button className="bg-green-400 hover:bg-green-500 text-gray-900 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                    Start Collaborating
                </button>
            </div>
        </section>
    );
};

export default HeroSection;