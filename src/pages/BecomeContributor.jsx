import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, FileText, User, Mail, Globe, Briefcase } from 'lucide-react';
import { db } from '../services/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const BecomeContributor = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        reason: '',
        portfolio: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await addDoc(collection(db, 'contributor_applications'), {
                uid: user?.uid || null,
                ...formData,
                status: 'pending',
                createdAt: Timestamp.now()
            });
            setSubmitted(true);
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("Failed to submit application. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-900 px-4">
                <div className="bg-gray-800 p-8 rounded-2xl max-w-lg w-full text-center border border-green-500/30">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send className="text-green-500" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Application Submitted!</h2>
                    <p className="text-gray-300 mb-6">
                        Thank you for your interest in becoming a contributor. Our team will review your application and get back to you soon via email.
                    </p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-12 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Become a Contributor
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Share your knowledge, host events, and help build the community.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Info Column */}
                    <div className="space-y-8">
                        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-bold mb-4 flex items-center">
                                <Briefcase className="mr-3 text-orange-500" />
                                What you can do
                            </h3>
                            <ul className="space-y-3 text-gray-300">
                                <li className="flex items-start">
                                    <span className="mr-2 text-green-500">✓</span> Host webinars and workshops
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-green-500">✓</span> Publish courses and tutorials
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-green-500">✓</span> Mentor other community members
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2 text-green-500">✓</span> Gain visibility in the network
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Form Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 text-gray-500" size={18} />
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1">Portfolio / LinkedIn URL</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-3 text-gray-500" size={18} />
                                    <input
                                        required
                                        type="url"
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        placeholder="https://linkedin.com/in/johndoe"
                                        value={formData.portfolio}
                                        onChange={e => setFormData({ ...formData, portfolio: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1">Why do you want to contribute?</label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 text-gray-500" size={18} />
                                    <textarea
                                        required
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all min-h-[120px]"
                                        placeholder="Tell us about your expertise and what you'd like to share..."
                                        value={formData.reason}
                                        onChange={e => setFormData({ ...formData, reason: e.target.value })}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {submitting ? (
                                    <span className="animate-pulse">Submitting...</span>
                                ) : (
                                    <>
                                        Submit Application <Send className="ml-2" size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BecomeContributor;
