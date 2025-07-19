import React from 'react';

const Header = () => {
    return (
        <header className="bg-[#000C0e] p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold text-red-400">Hustle Parade </h1>
                <ul className="flex space-x-6">
                    <li><a href="#" className="hover:text-green-400">Discover</a></li>
                    <li><a href="#" className="hover:text-green-400">Collaborate</a></li>
                    <li><a href="#" className="hover:text-green-400">Podcast</a></li>
                    <li><a href="#" className="hover:text-green-400">Join</a></li>
                    <li><a href="#" className="hover:text-green-400">Login</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header