import React from 'react';

const CollaborationShowcase = () => {
    return (
        <section className="container mx-auto py-20">
            <h3 className="text-5xl font-black text-center mb-16 text-yellow-300">🌟 HEAT ON DECK 🌟</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Placeholder for collaboration cards */}
                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg shadow-lg border-2 border-yellow-400 hover:border-yellow-300 transition">
                    <h4 className="text-2xl font-black mb-2 text-yellow-300">GOLD STANDARD</h4>
                    <p className="text-gray-300 mb-4 font-bold">J. Cole ft. The Weeknd</p>
                    <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-2 px-4 rounded-full transform hover:scale-105 transition">
                        🔊 LISTEN
                    </button>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg shadow-lg border-2 border-yellow-400 hover:border-yellow-300 transition">
                    <h4 className="text-2xl font-black mb-2 text-yellow-300">BARS & BEATS</h4>
                    <p className="text-gray-300 mb-4 font-bold">Kendrick Lamar x Metro Boomin</p>
                    <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-2 px-4 rounded-full transform hover:scale-105 transition">
                        🔊 LISTEN
                    </button>
                </div>
                <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg shadow-lg border-2 border-yellow-400 hover:border-yellow-300 transition">
                    <h4 className="text-2xl font-black mb-2 text-yellow-300">CYPHER DREAMS</h4>
                    <p className="text-gray-300 mb-4 font-bold">Tyler, The Creator & Drake</p>
                    <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-2 px-4 rounded-full transform hover:scale-105 transition">
                        🔊 LISTEN
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CollaborationShowcase;