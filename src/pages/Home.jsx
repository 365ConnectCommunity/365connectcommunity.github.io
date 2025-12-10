import React from 'react';
import Hero from '../components/Hero';
import { Calendar, BookOpen, Newspaper, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue/50 transition-all group backdrop-blur-sm"
    >
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-blue-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
            <Icon size={28} />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 leading-relaxed font-light">{description}</p>
    </motion.div>
);

const Home = () => {
    return (
        <div className="bg-primary overflow-hidden">
            <Hero />

            {/* Features Section */}
            <section id="why-us" className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why Join Us?</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Discover what makes our community unique and how we can effectively help you grow.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Calendar}
                            title="Events"
                            description="Connect, educate, and inspire. We host engaging events designed to explore the exciting world of Microsoft technologies."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon={BookOpen}
                            title="Courses"
                            description="Gateway to learning content. Empower yourself with skills to excel in today's technology-driven landscape."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon={Newspaper}
                            title="Blogs"
                            description="Insights, updates, and in-depth articles. Stay informed and engaged with the latest Microsoft trends."
                            delay={0.3}
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/10"></div>
                <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 text-secondary mb-8">
                        <Award size={32} />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get Certified Today</h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">Take any online event and get your certificate immediately. Register your free account to get started.</p>
                    <a href="https://365connectcommunity.azurewebsites.net/" className="inline-block px-10 py-5 bg-gradient-to-r from-secondary to-orange-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-1">
                        Register Now
                    </a>
                </div>
            </section>

            {/* Contact Section Preview */}
            <section id="contact" className="py-24 bg-black/20">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Seek Guidance</h2>
                        <p className="text-gray-400">Reach out to our experts for support</p>
                    </div>

                    <form className="space-y-6 text-left p-8 md:p-12 bg-white/5 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                            <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea rows="4" className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors"></textarea>
                        </div>
                        <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-blue-600/20">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>

        </div>
    );
};

export default Home;
