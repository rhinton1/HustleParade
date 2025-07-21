import React from 'react';

const CollaborationShowcase = () => {
    return (
        <section className="container mx-auto py-16">
            <h3 className="text-4xl font-bold text-center mb-12">Featured Collaborations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Placeholder for collaboration cards */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h4 className="text-2xl font-semibold mb-2">Track Title</h4>
                    <p className="text-gray-400 mb-4">Artist 1 ft. Artist 2</p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
                        Listen Now
                    </button>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h4 className="text-2xl font-semibold mb-2">Another Track</h4>
                    <p className="text-gray-400 mb-4">Producer X & Vocalist Y</p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
                        Listen Now
                    </button>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h4 className="text-2xl font-semibold mb-2">Experimental Piece</h4>
                    <p className="text-gray-400 mb-4">Ensemble Z</p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full">
                        Listen Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CollaborationShowcase;