import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black py-8 text-gray-300 border-t-4 border-yellow-400">
            <div className="container mx-auto px-4">
                <p className="text-center font-bold text-yellow-400 mb-4">&copy; 2026 Hustle Parade. All beats reserved.</p>
                <div className="flex justify-center space-x-8 mt-4">
                    <a href="#" className="hover:text-yellow-400 font-bold">PRIVACY</a>
                    <a href="#" className="hover:text-yellow-400 font-bold">TERMS</a>
                    <a href="#" className="hover:text-yellow-400 font-bold">CONTACT</a>
                </div>
                <p className="text-center text-gray-500 text-sm mt-6">Stay creative. Keep grinding. 🎤</p>
            </div>
        </footer>
    );
};

export default Footer;