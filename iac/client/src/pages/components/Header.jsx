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
        <header className="bg-black border-b-4 border-yellow-400 shadow-lg">
            <nav className="container mx-auto flex justify-between items-center px-4 py-4">
                <Link to="/">
                    <h1 className="text-3xl font-black text-yellow-400 hover:text-yellow-300 cursor-pointer drop-shadow-lg" style={{textShadow: '0 0 10px rgba(250, 204, 21, 0.3)'}}>
                        🎤 HUSTLE PARADE
                    </h1>
                </Link>
                <ul className="flex space-x-8 items-center">
                    <li><Link to="/discover" className="text-yellow-300 hover:text-yellow-400 font-bold">DISCOVER</Link></li>
                    <li><Link to="/collaborate" className="text-yellow-300 hover:text-yellow-400 font-bold">COLLAB</Link></li>
                    <li><Link to="/podcast" className="text-yellow-300 hover:text-yellow-400 font-bold">PODCAST</Link></li>
                    
                    {!isAuthenticated ? (
                        <>
                            <li>
                                <button
                                    onClick={() => setShowAuthModal(true)}
                                    className="bg-yellow-400 hover:bg-yellow-300 text-black font-black py-2 px-6 rounded-full transition transform hover:scale-105"
                                >
                                    LOGIN
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/dashboard" className="text-yellow-300 hover:text-yellow-400 font-bold">
                                    STUDIO
                                </Link>
                            </li>
                            <li>
                                <Link to="/settings" className="text-yellow-300 hover:text-yellow-400 font-bold">
                                    ⚙️ {user?.username}
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition"
                                >
                                    LOGOUT
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