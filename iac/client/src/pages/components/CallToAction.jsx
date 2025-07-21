import React from 'react';

const CallToAction = () => {
    return (
        <section className="bg-gradient-to-l from-green-500 to-teal-500 text-center py-20">
            <div className="container mx-auto">
                <h2 className="text-4xl font-bold mb-4">Ready to Amplify Your Music?</h2>
                <p className="text-xl mb-8">Join the growing community of artists making music together.</p>
                <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                    Sign Up Now
                </button>
            </div>
        </section>
    );
};

export default CallToAction;