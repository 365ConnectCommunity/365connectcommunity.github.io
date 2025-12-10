import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supportAPI } from '../services/apiService';
import { Share2, ExternalLink } from 'lucide-react';

const OurSocials = () => {
    const [socials, setSocials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSocials();
    }, []);

    const loadSocials = async () => {
        try {
            const data = await supportAPI.getSocials();
            setSocials(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Default socials if API doesn't return data
    const defaultSocials = [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/company/365connect-community', icon: '💼' },
        { name: 'Twitter', url: 'https://twitter.com/365connect', icon: '🐦' },
        { name: 'YouTube', url: 'https://youtube.com', icon: '▶️' },
        { name: 'GitHub', url: 'https://github.com/365connectcommunity', icon: '💻' }
    ];

    const displaySocials = socials.length > 0 ? socials : defaultSocials;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Share2 className="text-white" size={48} />
                    </div>
                    <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Our Socials
                    </h1>
                    <p className="text-xl text-gray-400">
                        Connect with us on social media and stay updated with the latest news and events
                    </p>
                </motion.div>

                {loading ? (
                    <div className="text-center text-white text-xl">Loading...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {displaySocials.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all group border border-gray-700 hover:border-blue-500"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-4xl">{social.icon || '🌐'}</div>
                                        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                            {social.name}
                                        </h3>
                                    </div>
                                    <ExternalLink className="text-gray-600 group-hover:text-blue-400 transition-colors" size={24} />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OurSocials;
