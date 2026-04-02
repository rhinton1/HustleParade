import React, { useState } from 'react';
import AuthModal from '../components/AuthModal';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PodcastPlayer from './components/PodcastPlayer';
import CollaborationShowcase from './components/CollaborationShowcase';
import CallToAction from './components/CallToAction';

const HomePage = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-black text-white">
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