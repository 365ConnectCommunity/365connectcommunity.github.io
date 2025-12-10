import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const Courses = () => {
    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Courses</h1>
                <p className="text-gray-400 text-xl">Enhance your skills with our curated learning paths.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4].map((item) => (
                    <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                    >
                        <div className="h-48 bg-gray-800 flex items-center justify-center">
                            <BookOpen size={48} className="text-gray-700" />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">Introduction to D365</h3>
                            <p className="text-gray-400 text-sm mb-4">A comprehensive guide for beginners to start their journey.</p>
                            <button className="w-full py-3 border border-white/20 rounded-lg text-white font-medium hover:bg-white hover:text-primary transition-colors">View Course</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
