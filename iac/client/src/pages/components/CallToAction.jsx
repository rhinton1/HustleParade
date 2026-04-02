import React from 'react';

const CallToAction = ({ onSignUp }) => {
    return (
        <section className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-orange-500 text-center py-20 border-y-4 border-black">
            <div className="container mx-auto">
                <h2 className="text-5xl font-black mb-4 text-black drop-shadow-lg">LET'S GET IT 💯</h2>
                <p className="text-2xl mb-8 text-black font-bold">Join thousands of artists building the next generation of hip hop</p>
                <button
                    onClick={onSignUp}
                    className="bg-black hover:bg-gray-900 text-yellow-400 font-black py-4 px-10 rounded-full text-xl transition duration-300 transform hover:scale-105 border-2 border-black"
                >
                    SIGN UP NOW 🎤
                </button>
            </div>
        </section>
    );
};

export default CallToAction;