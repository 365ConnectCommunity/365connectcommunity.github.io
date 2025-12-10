import React from 'react';
import { motion } from 'framer-motion';

const Team = () => {
    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Family</h1>
                <p className="text-gray-400 text-xl">Meet the dedicated individuals behind 365Connect.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <motion.div
                        key={item}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors"
                    >
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mb-4"></div>
                        <h3 className="text-xl font-bold text-white">Team Member {item}</h3>
                        <p className="text-blue-400 mb-2">Role Title</p>
                        <p className="text-gray-400 text-sm">Passionate about Microsoft technologies and community building.</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Team;
