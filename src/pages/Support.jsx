import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supportAPI } from '../services/apiService';
import { MessageCircle, Send } from 'lucide-react';

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', message: '' });

        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ type: 'error', message: 'All fields are required' });
            return;
        }

        setLoading(true);

        try {
            await supportAPI.submitSupport(formData.name, formData.email, formData.message);
            setStatus({ type: 'success', message: 'Support request submitted successfully! We will get back to you soon.' });
            setFormData({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus({ type: 'error', message: 'Failed to submit support request. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageCircle className="text-white" size={40} />
                    </div>
                    <h1 className="text-5xl font-black mb-4 text-white">
                        Get Support
                    </h1>
                    <p className="text-xl text-gray-400">
                        Need help? Drop us a message and we'll get back to you as soon as possible.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl"
                >
                    {status.message && (
                        <div className={`mb-6 px-4 py-3 rounded-lg ${status.type === 'success'
                            ? 'bg-green-500/10 border border-green-500 text-green-500'
                            : 'bg-red-500/10 border border-red-500 text-red-500'
                            }`}>
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-300 mb-2 font-medium">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="John Doe"
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2 font-medium">Your Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="your@email.com"
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2 font-medium">Your Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 resize-none"
                                    placeholder="How can we help you?"
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                            >
                                <Send size={20} className="mr-2" />
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Support;
