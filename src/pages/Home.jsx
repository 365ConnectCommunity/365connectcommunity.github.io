import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, BookOpen, Youtube, Linkedin, Github, MessageCircle, Sparkles, Heart, Code } from 'lucide-react';
import Hero from '../components/Hero';

const Home = () => {
    // We'll embed the channel's latest uploads section
    const channelId = 'UC9vIK0Y5uwV8GCvN5wD3Kmg'; // 365Connect Community channel ID

    const stats = [
        { icon: Users, value: '1000+', label: 'Community Members' },
        { icon: Calendar, value: '50+', label: 'Events Hosted' },
        { icon: BookOpen, value: '100+', label: 'Resources Shared' },
        { icon: Heart, value: '500+', label: 'Lives Impacted' }
    ];

    const features = [
        {
            icon: Users,
            title: 'Join Our Community',
            description: 'Connect with D365 and Power Platform enthusiasts from around the world',
            link: '/signup',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Calendar,
            title: 'Attend Events',
            description: 'Join our virtual and in-person meetups, workshops, and webinars',
            link: '/events',
            color: 'from-purple-500 to-pink-500'
        },
        {
            icon: Code,
            title: 'Learn & Grow',
            description: 'Access tutorials, courses, and resources to level up your skills',
            link: '/courses',
            color: 'from-orange-500 to-red-500'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            <Hero />

            {/* Community Stats */}
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all">
                                    <stat.icon className="mx-auto mb-4 text-blue-400" size={40} />
                                    <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                                    <div className="text-gray-400">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* What We Offer */}
            <section className="py-20 bg-black/30">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Sparkles className="text-yellow-400" size={24} />
                            <span className="text-yellow-400 font-bold">What We Offer</span>
                        </div>
                        <h2 className="text-5xl font-black bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
                            Why Join 365Connect?
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            We're more than just a community - we're a family of passionate tech enthusiasts
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link to={feature.link}>
                                    <div className="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all border border-gray-700 hover:border-blue-500 h-full">
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <feature.icon className="text-white" size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-400 mb-4">{feature.description}</p>
                                        <div className="flex items-center text-blue-400 font-medium">
                                            Learn More <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest YouTube Videos */}
            <section className="py-20 bg-gradient-to-b from-black to-gray-900">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Youtube className="text-red-500" size={32} />
                            <span className="text-red-500 font-bold text-xl">Latest from YouTube</span>
                        </div>
                        <h2 className="text-5xl font-black bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent mb-4">
                            Watch & Learn
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                            Check out our latest tutorials, event recordings, and community updates
                        </p>
                        <a
                            href="https://www.youtube.com/@365ConnectCommunity"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105"
                        >
                            <Youtube size={24} />
                            Subscribe to Our Channel
                        </a>
                    </motion.div>

                    {/* Embed Latest Uploads from YouTube Channel */}
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700"
                        >
                            <div className="aspect-video">
                                <iframe
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/iy8knAr4coo?si=XQBYd6-tqJK27RSt&controls=0"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            </div>
                            <div className="p-6 text-center">
                                <p className="text-gray-400 mb-4">Latest uploads from our channel</p>
                                <a
                                    href="https://www.youtube.com/@365ConnectCommunity/videos"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-medium transition-colors"
                                >
                                    View All Videos <ArrowRight size={16} />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Community Testimonial / Call to Action */}
            <section className="py-20 bg-black/50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-3xl p-12 border border-blue-500/30">
                            <Heart className="mx-auto mb-6 text-pink-400" size={64} />
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                                Join Our Growing Community
                            </h2>
                            <p className="text-xl text-gray-300 mb-8">
                                Connect with passionate professionals, learn from experts, and grow your career in the Microsoft ecosystem.
                                Whether you're a beginner or an expert, there's a place for you here!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-bold rounded-full transition-all shadow-lg shadow-blue-500/25"
                                >
                                    <Users size={24} />
                                    Join Free Today
                                </Link>
                                <Link
                                    to="/events"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-full transition-all"
                                >
                                    <Calendar size={24} />
                                    Browse Events
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Social Links */}
            <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h3 className="text-2xl font-bold text-white mb-8">Connect With Us</h3>
                        <div className="flex justify-center gap-6">
                            <a
                                href="https://www.youtube.com/@365ConnectCommunity"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-red-500/25"
                            >
                                <Youtube className="text-white" size={28} />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/365connect-community"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-blue-500/25"
                            >
                                <Linkedin className="text-white" size={28} />
                            </a>
                            <a
                                href="https://github.com/365connectcommunity"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-all hover:scale-110"
                            >
                                <Github className="text-white" size={28} />
                            </a>
                            <Link
                                to="/support"
                                className="w-14 h-14 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-purple-500/25"
                            >
                                <MessageCircle className="text-white" size={28} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
