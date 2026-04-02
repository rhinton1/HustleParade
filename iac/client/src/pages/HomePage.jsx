import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../components/AuthModal';
import Header from './components/Header'
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PodcastPlayer from './components/PodcastPlayer';
import CollaborationShowcase from './components/CollaborationShowcase';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const HomePage = () => {
    const { isAuthenticated } = useAuth();
    const [showAuthModal, setShowAuthModal] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-[#B0A287] text-white">
            <main className="flex-grow">
                <HeroSection onGetStarted={() => setShowAuthModal(true)} />
                <CollaborationShowcase />
                <FeaturesSection />
                <PodcastPlayer />
                <CallToAction onSignUp={() => setShowAuthModal(true)} />
            </main>
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} mode="login" />
        </div>
    )
}

export default HomePage;