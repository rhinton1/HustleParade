import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthModal from '../../components/AuthModal';

const Header = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="bg-[#000C0e] p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <h1 className="text-3xl font-bold text-red-400 hover:text-red-300 cursor-pointer">Hustle Parade</h1>
                </Link>
                <ul className="flex space-x-6 items-center">
                    <li><Link to="/discover" className="text-white hover:text-green-400">Discover</Link></li>
                    <li><Link to="/collaborate" className="text-white hover:text-green-400">Collaborate</Link></li>
                    <li><Link to="/podcast" className="text-white hover:text-green-400">Podcast</Link></li>
                    
                    {!isAuthenticated ? (
                        <>
                            <li>
                                <button
                                    onClick={() => setShowAuthModal(true)}
                                    className="text-white hover:text-green-400 font-semibold"
                                >
                                    Login
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/dashboard" className="text-white hover:text-green-400 font-semibold">
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/settings" className="text-white hover:text-blue-400 font-semibold">
                                    ⚙️ {user?.username}
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="text-white hover:text-red-400 font-semibold"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} mode="login" />
        </header>
    );
};

export default Header