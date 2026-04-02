import React from 'react';

const FeaturesSection = () => {
    return (
        <section className="bg-gray-950 py-20 border-t-4 border-b-4 border-yellow-400">
            <div className="container mx-auto text-center">
                <h3 className="text-5xl font-black mb-16 text-yellow-300">🔥 THE GRIND PROCESS 🔥</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-lg shadow-lg bg-gradient-to-b from-gray-900 to-black border-2 border-yellow-400">
                        <div className="text-4xl mb-4">🎯</div>
                        <h4 className="text-2xl font-black mb-3 text-yellow-300">DROP YOUR CATALOG</h4>
                        <p className="text-gray-300 text-lg">Showcase your beats, bars, and production to the world.</p>
                    </div>
                    <div className="p-8 rounded-lg shadow-lg bg-gradient-to-b from-gray-900 to-black border-2 border-yellow-400">
                        <div className="text-4xl mb-4">🤝</div>
                        <h4 className="text-2xl font-black mb-3 text-yellow-300">FIND YOUR SQUAD</h4>
                        <p className="text-gray-300 text-lg">Connect with producers, rappers, and engineers who vibe with your sound.</p>
                    </div>
                    <div className="p-8 rounded-lg shadow-lg bg-gradient-to-b from-gray-900 to-black border-2 border-yellow-400">
                        <div className="text-4xl mb-4">💿</div>
                        <h4 className="text-2xl font-black mb-3 text-yellow-300">RELEASE FIRE</h4>
                        <p className="text-gray-300 text-lg">Distribute your collaborative tracks and blow up the charts.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;