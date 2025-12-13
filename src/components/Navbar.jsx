import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Award, UserCircle, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getUserImage } from '../services/authService';
import logoNew from '../assets/images/logo-final.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Our Family', path: '/team' },
        { name: 'Events', path: '/events' },
        { name: 'Courses', path: '/courses' },
        { name: 'Our Socials', path: '/our-socials' },
        { name: 'Become Contributor', path: '/become-contributor' },
    ];

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center space-x-3">
                        <img
                            src={logoNew}
                            alt="365 Connect"
                            className="h-12 rounded-full"
                        />
                        <div className="flex">
                            <span className="text-2xl font-black text-secondary">3</span>
                            <span className="text-2xl font-black text-accent">6</span>
                            <span className="text-2xl font-black text-blue">5</span>
                            <span className="text-2xl font-black text-white">Connect</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.path} className="text-gray-300 hover:text-white transition-colors text-sm font-medium relative group">
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue transition-all group-hover:w-full"></span>
                            </Link>
                        ))}

                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <img
                                        src={getUserImage()}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full border-2 border-orange-500 hover:border-orange-400 transition-all"
                                    />
                                </button>

                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden"
                                        >
                                            <div className="px-4 py-3 border-b border-gray-700">
                                                <p className="text-sm text-white font-medium">{user?.name}</p>
                                                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                                            </div>
                                            <div className="py-2">
                                                <Link
                                                    to="/my-profile"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <UserCircle size={16} className="mr-3" />
                                                    My Profile
                                                </Link>
                                                <Link
                                                    to="/my-courses"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <BookOpen size={16} className="mr-3" />
                                                    My Courses
                                                </Link>
                                                <Link
                                                    to="/my-certificates"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <Award size={16} className="mr-3" />
                                                    My Certificates
                                                </Link>
                                                <Link
                                                    to="/my-events"
                                                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                                    onClick={() => setShowUserMenu(false)}
                                                >
                                                    <Award size={16} className="mr-3" />
                                                    My Events
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                                >
                                                    <LogOut size={16} className="mr-3" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                                    Sign In
                                </Link>
                                <Link to="/signup" className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:opacity-90 transition-all shadow-lg shadow-blue-500/25">
                                    Join Community
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-secondary">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-primary/95 backdrop-blur-xl border-b border-white/10"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {isAuthenticated ? (
                                <>
                                    <div className="border-t border-gray-700 my-2"></div>
                                    <div className="px-3 py-2">
                                        <p className="text-sm text-white font-medium">{user?.name}</p>
                                        <p className="text-xs text-gray-400">{user?.email}</p>
                                    </div>
                                    <Link
                                        to="/my-profile"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        to="/my-certificates"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        My Certificates
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="border-t border-gray-700 my-2"></div>
                                    <Link
                                        to="/login"
                                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white/5"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Join Community
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
