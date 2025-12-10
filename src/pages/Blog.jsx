import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const Blog = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 flex items-center justify-center">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                        <FileText className="text-white" size={48} />
                    </div>
                    <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Blog
                    </h1>
                    <p className="text-3xl text-gray-300 mb-4">Coming Soon</p>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Our blog with insights, tutorials, and updates about D365 and Power Platform is on its way!
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Blog;
