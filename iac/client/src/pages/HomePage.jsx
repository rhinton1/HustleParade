import React from 'react';
import Header from './components/Header'
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PodcastPlayer from './components/PodcastPlayer';
import CollaborationShowcase from './components/CollaborationShowcase';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#B0A287] text-white">
            <Header />
            <main className="flex-grow">
                <HeroSection />
                <CollaborationShowcase /> {/* Displays featured collaborations or projects */}
                <FeaturesSection /> {/* Highlights key platform features */}
                <PodcastPlayer /> {/* Integrated podcast player */}
                <CallToAction />
            </main>
            <Footer />
        </div>
    )
}

export default HomePage;