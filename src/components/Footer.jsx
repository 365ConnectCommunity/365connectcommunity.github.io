import React from 'react';
import { Linkedin, Youtube, Mail, Github, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#0f1623] border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                            365Connect
                        </span>
                        <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                            Empowering the community with Microsoft D365 and Power Platform technologies. Learn, teach, and collaborate.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#family" className="hover:text-blue transition-colors">Our Family</a></li>
                            <li><a href="#resources" className="hover:text-blue transition-colors">Resources</a></li>
                            <li><a href="#contact" className="hover:text-blue transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-blue transition-colors">Events</a></li>
                            <li><a href="#" className="hover:text-blue transition-colors">Courses</a></li>
                            <li><a href="#" className="hover:text-blue transition-colors">Blogs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <div className="flex space-x-3">
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-blue/20 hover:text-blue transition-all"><Linkedin size={18} /></a>
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-500 transition-all"><Youtube size={18} /></a>
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-gray-500/20 hover:text-white transition-all"><Github size={18} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} 365Connect Community. All rights reserved.</p>
                    <p>Designed with <span className="text-red-500">♥</span> by Shaheer Ahmad</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
