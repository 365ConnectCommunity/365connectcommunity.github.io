import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { communityAPI } from '../services/apiService';
import { Users } from 'lucide-react';

const CommunityMembers = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadMembers();
    }, []);

    const loadMembers = async () => {
        try {
            const data = await communityAPI.getCommunityMembers();
            setMembers(data);
        } catch (err) {
            setError('Failed to load community members');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 flex items-center justify-center">
                <div className="text-white text-xl">Loading members...</div>
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
                    <h1 className="text-5xl font-black mb-4 text-white">
                        Community Members
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Meet our vibrant community of D365 and Power Platform enthusiasts
                    </p>
                </motion.div>

                {error && <div className="text-center text-red-500 mb-8">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {members.map((member, index) => {
                        // Safe mapping incase API returns raw sa_ fields or new migrated fields
                        const image = member.entityimage || member.sa_imageurl || member.sa_entityimage || member.imageurl;

                        let name = 'Community Member';
                        if (member.firstname && member.lastname) {
                            name = `${member.firstname} ${member.lastname}`;
                        } else if (member.fullname) {
                            name = member.fullname;
                        } else if (member.sa_fullname) {
                            name = member.sa_fullname;
                        } else if (member.sa_firstname) {
                            name = `${member.sa_firstname} ${member.sa_lastname}`;
                        }

                        const email = member.email || member.emailaddress1 || member.sa_email || '';

                        return (
                            <motion.div
                                key={member.contactid || member.sa_contactid || index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center hover:shadow-2xl hover:shadow-purple-500/10 transition-all"
                            >

                                {image ? (
                                    <img
                                        src={`data:image/png;base64,${image}`}
                                        alt={name}
                                        className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-purple-500 object-cover"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                        <Users className="text-white" size={40} />
                                    </div>
                                )}
                                <h3 className="text-lg font-bold text-white">{name}</h3>
                                {email && (
                                    <p className="text-xs text-gray-500 mt-1">{email}</p>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {members.length === 0 && !loading && !error && (
                    <div className="text-center text-gray-400 text-xl">No members found</div>
                )}
            </div>
        </div>
    );
};

export default CommunityMembers;
