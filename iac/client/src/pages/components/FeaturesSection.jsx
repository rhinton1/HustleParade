import React from 'react';

const FeaturesSection = () => {
    return (
        <section className="bg-gray-800 py-16">
            <div className="container mx-auto text-center">
                <h3 className="text-4xl font-bold mb-12">How It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-6 rounded-lg shadow-lg bg-gray-700">
                        <h4 className="text-2xl font-semibold mb-2">Find Your Tribe</h4>
                        <p className="text-gray-300">Discover musicians with complementary skills and styles.</p>
                    </div>
                    <div className="p-6 rounded-lg shadow-lg bg-gray-700">
                        <h4 className="text-2xl font-semibold mb-2">Collaborate Seamlessly</h4>
                        <p className="text-gray-300">Share ideas, track progress, and create music together.</p>
                    </div>
                    <div className="p-6 rounded-lg shadow-lg bg-gray-700">
                        <h4 className="text-2xl font-semibold mb-2">Release Your Sound</h4>
                        <p className="text-gray-300">Prepare your collaborative tracks for distribution.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;