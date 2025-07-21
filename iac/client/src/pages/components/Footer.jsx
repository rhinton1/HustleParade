import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 py-8 text-gray-400 text-center">
            <div className="container mx-auto">
                <p>&copy; 2025 Hustle Parade. All rights reserved.</p>
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="#" className="hover:text-green-400">Privacy Policy</a>
                    <a href="#" className="hover:text-green-400">Terms of Service</a>
                    <a href="#" className="hover:text-green-400">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;