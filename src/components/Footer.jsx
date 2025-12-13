import React, { useState, useEffect } from 'react';
import { Linkedin, Youtube, Mail, Github, Twitter, Globe } from 'lucide-react';
import { supportAPI } from '../services/apiService';
import logoNew from '../assets/images/logo-final.png';

const Footer = () => {
    const [socials, setSocials] = useState([]);

    useEffect(() => {
        loadSocials();
    }, []);

    const loadSocials = async () => {
        try {
            const data = await supportAPI.getSocials();
            setSocials(data.slice(0, 4)); // Limit to 4 icons for footer
        } catch (err) {
            console.error('Failed to load socials', err);
        }
    };

    const getIcon = (name) => {
        const lowerName = name?.toLowerCase() || '';
        if (lowerName.includes('linkedin')) return <Linkedin size={18} />;
        if (lowerName.includes('youtube')) return <Youtube size={18} />;
        if (lowerName.includes('github')) return <Github size={18} />;
        if (lowerName.includes('twitter') || lowerName.includes('x')) return <Twitter size={18} />;
        if (lowerName.includes('mail')) return <Mail size={18} />;
        return <Globe size={18} />;
    };

    const getHoverColor = (name) => {
        const lowerName = name?.toLowerCase() || '';
        if (lowerName.includes('linkedin')) return 'hover:bg-blue/20 hover:text-blue';
        if (lowerName.includes('youtube')) return 'hover:bg-red-500/20 hover:text-red-500';
        if (lowerName.includes('github')) return 'hover:bg-gray-500/20 hover:text-white';
        if (lowerName.includes('twitter') || lowerName.includes('x')) return 'hover:bg-sky-500/20 hover:text-sky-500';
        return 'hover:bg-purple-500/20 hover:text-purple-500';
    };

    // Default socials if API fails
    const defaultSocials = [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/company/365connect-community', icon: '💼' },
        { name: 'Twitter', url: 'https://twitter.com/365connect', icon: '🐦' },
        { name: 'YouTube', url: 'https://youtube.com', icon: '▶️' },
        { name: 'GitHub', url: 'https://github.com/365connectcommunity', icon: '💻' }
    ];

    const displaySocials = socials.length > 0 ? socials : defaultSocials;

    return (
        <footer className="bg-[#0f1623] border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-3 mb-4">
                            <img
                                src={logoNew}
                                alt="365 Connect"
                                className="h-10 mix-blend-multiply bg-white rounded-full p-0.5"
                            />
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                                365Connect
                            </span>
                        </div>
                        <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                            Empowering the community with Microsoft D365 and Power Platform technologies. Learn, teach, and collaborate.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/team" className="hover:text-blue transition-colors">Our Family</a></li>
                            <li><a href="/events" className="hover:text-blue transition-colors">Resources</a></li>
                            <li><a href="/support" className="hover:text-blue transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/events" className="hover:text-blue transition-colors">Events</a></li>
                            <li><a href="/courses" className="hover:text-blue transition-colors">Courses</a></li>
                            <li><a href="/blog" className="hover:text-blue transition-colors">Blogs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <div className="flex space-x-3">
                            {displaySocials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 rounded-full bg-white/5 transition-all ${getHoverColor(social.name)}`}
                                    title={social.name}
                                >
                                    {getIcon(social.name)}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} 365Connect Community. All rights reserved.</p>
                    <p>Designed with <span className="text-red-500">♥</span> by Shaheer Ahmad</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
