import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { communityAPI } from '../services/apiService';

const Team = () => {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadTeamMembers();
    }, []);

    const loadTeamMembers = async () => {
        try {
            const data = await communityAPI.getTeamMembers();
            setTeam(data);
        } catch (err) {
            setError('Failed to load team members');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to get contributor image path
    const getContributorImage = (member) => {
        const contributorImages = {
            'Aqeel Khalid': '/contributors/Aqeel Khalid.jpg',
            'Ashir Mumtaz': '/contributors/Ashir Mumtaz.png',
            'Shaheer Ahmad': '/contributors/Shaheer Ahmad.png',
            'Yawer Iqbal': '/contributors/Yawer Iqbal.jpg'
        };

        // Try to find local contributor image by full name
        const localImage = contributorImages[member.fullname];
        if (localImage) return localImage;

        // Fallback to API entityimage if available
        if (member.entityimage) {
            return `data:image/png;base64,${member.entityimage}`;
        }

        // Final fallback to default avatar
        return '/assets/images/icons8-account-64.png';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 flex items-center justify-center">
                <div className="text-white text-xl">Loading team members...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-black mb-4 text-white drop-shadow-lg">
                        Our Team
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Meet the talented contributors behind 365Connect Community
                    </p>
                </motion.div>

                {error && (
                    <div className="text-center text-red-500 mb-8">{error}</div>
                )}

                {/* Render Team Groups */}
                {(() => {
                    const groups = { Leadership: [], Contributors: [] };

                    team.forEach(member => {
                        const role = (member.jobtitle || '').toLowerCase();
                        if (role.includes('contributor')) {
                            groups.Contributors.push(member);
                        } else {
                            groups.Leadership.push(member);
                        }
                    });

                    const groupKeys = ['Leadership', 'Contributors'];

                    // Check if empty
                    if (team.length === 0 && !loading && !error) {
                        return <div className="text-center text-gray-400 text-xl">No team members found</div>;
                    }

                    return groupKeys.map(groupName => {
                        const members = groups[groupName];
                        if (members.length === 0) return null;

                        return (
                            <div key={groupName} className="mb-16">
                                <h2 className="text-3xl font-bold text-white mb-8 border-b border-gray-700 pb-2">{groupName}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {members.map((member, index) => (
                                        <motion.div
                                            key={member.contactid || index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all border border-gray-700"
                                        >
                                            <img
                                                src={getContributorImage(member)}
                                                alt={member.fullname}
                                                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 object-cover"
                                            />
                                            <h3 className="text-xl font-bold text-white text-center">{member.fullname || 'Team Member'}</h3>
                                            {member.jobtitle && (
                                                <p className="text-blue-400 text-center mb-2 font-medium">{member.jobtitle}</p>
                                            )}
                                            {member.emailaddress1 && (
                                                <p className="text-sm text-gray-400 text-center">{member.emailaddress1}</p>
                                            )}

                                            <div className="flex justify-center space-x-3 mt-4">
                                                {member.linkedin && (
                                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                                                        <i className="fab fa-linkedin text-xl"></i>
                                                    </a>
                                                )}
                                                {/* Add other socials if available in data */}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        );
                    });
                })()}
            </div>
        </div>
    );
};

export default Team;
