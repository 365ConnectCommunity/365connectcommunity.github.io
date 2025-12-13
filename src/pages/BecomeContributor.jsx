import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Share2, Mic, Settings } from 'lucide-react';

const BecomeContributor = () => {
    const steps = [
        {
            title: 'Submit a Community Blog (Beta)',
            description: "If you have valuable insights, tips, or knowledge related to D365 and Power Platform, you can contribute by writing a community blog.",
            instructions: [
                { text: 'Fill out the Community Blog Submission Form with your blog post details.', link: '#' },
                { text: 'Our team will review your submission, and once approved, it will be published on our Community Blog.', link: '/blog' }
            ],
            icon: <BookOpen className="text-blue-400" size={32} />
        },
        {
            title: 'Submit a Sample Solution',
            description: "Contribute to our GitHub repository with sample solutions or improvements.",
            instructions: [
                { text: 'View Detailed Steps here: How to Submit a Sample', link: 'https://github.com/365ConnectCommunity/sample-solutions/wiki/How-to-submit-a-Power-App-sample' }
            ],
            icon: <Code className="text-purple-400" size={32} />
        },
        {
            title: 'Share Content and Events (Coming Soon)',
            description: "Help us by sharing valuable content and information about events related to D365 and Power Platform.",
            instructions: [
                { text: 'Share relevant content, articles, or resources on your social media profiles or within our community.', link: null },
                { text: 'Announce and promote D365 and Power Platform events, webinars, or meetups.', link: null }
            ],
            icon: <Share2 className="text-green-400" size={32} />
        },
        {
            title: 'Speak at an Event',
            description: "If you have expertise in these technologies, consider becoming a speaker at one of our community events.",
            instructions: [
                { text: 'Submit your topic proposal and speaker details to our event organizers.', link: '/team' },
                { text: 'If selected, prepare and deliver your presentation to our community.', link: null }
            ],
            icon: <Mic className="text-red-400" size={32} />
        },
        {
            title: 'Update Our Website (Beta)',
            description: "If you notice any bugs or have suggestions for improving our website, you can contribute by forking our repository and submitting a pull request.",
            instructions: [
                { text: "Fork our website's GitHub repository.", link: '#' },
                { text: 'Create a new branch for your changes.', link: null },
                { text: 'Make the necessary updates or fixes.', link: null },
                { text: 'Submit a pull request to merge your changes into our website.', link: null }
            ],
            icon: <Settings className="text-orange-400" size={32} />
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-black mb-4 text-white drop-shadow-lg">
                        Become a Contributor
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6"></div>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Welcome to the 365Connect Community! We're excited that you want to help us promote and advance Microsoft D365 and Power Platform technologies.
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-blue-500 transition-all shadow-lg group"
                        >
                            <div className="flex items-start gap-6">
                                <div className="p-4 bg-gray-900 rounded-xl border border-gray-700 group-hover:border-blue-500/50 transition-colors">
                                    {step.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 font-bold text-sm border border-blue-500/20">
                                            {index + 1}
                                        </span>
                                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                                    </div>
                                    <p className="text-gray-400 mb-6 ml-11">{step.description}</p>

                                    <div className="space-y-3 ml-11">
                                        {step.instructions.map((instruction, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2.5"></div>
                                                <p className="text-gray-300">
                                                    {instruction.link ? (
                                                        <a
                                                            href={instruction.link}
                                                            target={instruction.link.startsWith('http') ? '_blank' : '_self'}
                                                            rel={instruction.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                                            className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/30 hover:decoration-blue-300"
                                                        >
                                                            {instruction.text}
                                                        </a>
                                                    ) : (
                                                        instruction.text
                                                    )}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-16 p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500/20"
                >
                    <p className="text-lg text-gray-300">
                        Together, we can make the 365Connect Community a vibrant hub for D365 and Power Platform enthusiasts.
                        <br />
                        <span className="font-bold text-white mt-2 block">Get started today and help us grow!</span>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default BecomeContributor;
