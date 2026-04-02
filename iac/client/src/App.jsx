import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import Discover from './pages/Discover'
import Collaborate from './pages/Collaborate'
import Podcast from './pages/Podcast'
import UserProfile from './pages/UserProfile'
import Settings from './pages/Settings'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './pages/components/Header'
import Footer from './pages/components/Footer'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/collaborate" element={<Collaborate />} />
                    <Route path="/podcast" element={<Podcast />} />
                    <Route path="/user/:username" element={<UserProfile />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    )
}

export default App