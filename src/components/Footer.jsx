import React from 'react';
import { Linkedin, Youtube, Mail, Github, Twitter, Globe, Facebook, Instagram, Users } from 'lucide-react';
import { supportAPI } from '../services/apiService';
import logoNew from '../assets/images/logo-final.png';

const Footer = () => {
    return (
        <footer className="bg-[#0f1623] border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-3 mb-4">
                            <img
                                src={logoNew}
                                alt="365 Connect"
                                className="h-10 rounded-full"
                            />
                            <span className="text-2xl font-bold text-white">
                                365Connect
                            </span>
                        </div>
                        <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                            Empowering the community with Microsoft D365 and Power Platform technologies. Learn, teach, and collaborate.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/team" className="hover:text-blue transition-colors">Our Family</a></li>
                            <li><a href="/events" className="hover:text-blue transition-colors">Resources</a></li>
                            <li><a href="/support" className="hover:text-blue transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/events" className="hover:text-blue transition-colors">Events</a></li>
                            <li><a href="/courses" className="hover:text-blue transition-colors">Courses</a></li>
                            <li><a href="/blog" className="hover:text-blue transition-colors">Blogs</a></li>
                        </ul>
                    </div>

                    <div className="footer-connect-section">
                        <h4 className="text-white font-semibold mb-4">Connect</h4>
                        <div className="flex flex-wrap gap-3">
                            <a href="https://instagram.com/365_connect" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200 border border-gray-700" title="Instagram">
                                <Instagram size={18} />
                            </a>
                            <a href="https://www.youtube.com/@365ConnectCommunity" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200 border border-gray-700" title="YouTube">
                                <Youtube size={18} />
                            </a>
                            <a href="https://powerusers.microsoft.com/t5/365-Connect-Community/gh-p/365ConnectCommunity" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200 border border-gray-700" title="Microsoft User Group">
                                <Users size={18} />
                            </a>
                            <a href="https://www.meetup.com/365connect/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200 border border-gray-700" title="Meetup Community">
                                <Users size={18} />
                            </a>
                            <a href="https://pk.linkedin.com/company/365-connect-community" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200 border border-gray-700" title="LinkedIn Page">
                                <Linkedin size={18} />
                            </a>
                            <a href="https://www.linkedin.com/groups/12822091/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200 border border-gray-700" title="LinkedIn Group">
                                <Linkedin size={18} />
                            </a>
                            <a href="https://github.com/365connectcommunity" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200 border border-gray-700" title="GitHub">
                                <Github size={18} />
                            </a>
                            <a href="https://365connectcommunity.github.io/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200 border border-gray-700" title="Website">
                                <Globe size={18} />
                            </a>
                            <a href="https://365connectcommunity.blogspot.com/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200 border border-gray-700" title="Community Blog">
                                <Globe size={18} />
                            </a>
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
