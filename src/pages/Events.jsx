import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const Events = () => {
    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Upcoming Events</h1>
                <p className="text-gray-400 text-xl">Join us for our upcoming sessions and workshops.</p>
            </motion.div>

            <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                    <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex flex-col md:flex-row items-center bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue/50 transition-colors"
                    >
                        <div className="w-full md:w-48 h-32 bg-gray-800 rounded-xl flex items-center justify-center mb-4 md:mb-0 md:mr-8 flex-shrink-0">
                            <Calendar size={32} className="text-gray-600" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold mb-2">Upcoming</span>
                            <h3 className="text-2xl font-bold text-white mb-2">Power Platform Masterclass</h3>
                            <p className="text-gray-400 mb-4">Learn how to build scalable apps with Power Apps and Automate.</p>
                            <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-gray-500">
                                <span>Dec 15, 2023</span>
                                <span>•</span>
                                <span>Online (Teams)</span>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex-shrink-0">
                            <button className="px-6 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-200 transition-colors">Register</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Events;
