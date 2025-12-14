import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Box, Database, Code } from 'lucide-react';
import SEO from '../components/SEO';

const Tools = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
            <SEO
                title="Tools & Components"
                description="Free PCF Controls, Sample Apps, and Utilities for the Power Platform Community. Coming Soon!"
            />
            <div className="container mx-auto px-4 max-w-6xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center min-h-[60vh]"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full mb-8 shadow-lg shadow-blue-500/30 animate-pulse">
                        <Settings className="text-white" size={64} />
                    </div>

                    <h1 className="text-6xl font-black mb-6 text-white drop-shadow-2xl">
                        Tools & Components
                    </h1>

                    <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 font-bold mb-8">
                        Everything will be FREE. Always.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full mt-12">
                        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 p-6 rounded-2xl flex flex-col items-center">
                            <Box className="text-blue-400 mb-4" size={40} />
                            <h3 className="text-xl font-bold text-white mb-2">PCF Controls</h3>
                            <p className="text-gray-300 text-sm">Custom controls to enhance your UX.</p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 p-6 rounded-2xl flex flex-col items-center">
                            <Database className="text-purple-400 mb-4" size={40} />
                            <h3 className="text-xl font-bold text-white mb-2">Sample Apps</h3>
                            <p className="text-gray-300 text-sm">Reverse engineer our best templates.</p>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 p-6 rounded-2xl flex flex-col items-center">
                            <Code className="text-green-400 mb-4" size={40} />
                            <h3 className="text-xl font-bold text-white mb-2">Code Snippets</h3>
                            <p className="text-gray-300 text-sm">Ready-to-use JS & Power Fx.</p>
                        </div>
                    </div>

                    <p className="mt-16 text-gray-400 uppercase tracking-widest font-semibold text-sm">
                        Coming Soon
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Tools;
