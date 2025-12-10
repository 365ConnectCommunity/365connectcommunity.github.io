import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background elements */}
            <div className="absolute inset-0 bg-primary">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-medium">
                        Welcome to 365Connect
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-tight">
                        <span className="block text-white mb-2">Building</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
                            Power Users
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-400 mb-10 leading-relaxed">
                        Join the premier community for Microsoft D365 and Power Platform. Learn, collaborate, and grow with experts worldwide.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#why-us"
                            className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-all flex items-center gap-2"
                        >
                            Get Started <ArrowRight size={20} />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://www.youtube.com/watch?v=iy8knAr4coo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                            <Play size={20} fill="currentColor" /> Watch Video
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
