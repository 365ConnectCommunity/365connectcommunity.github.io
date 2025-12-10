```javascript
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
                    <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Our Team
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Meet the talented contributors behind 365Connect Community
                    </p>
                </motion.div>

                {error && (
                    <div className="text-center text-red-500 mb-8">{error}</div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <motion.div
                            key={member.contactid || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all"
                        >
                            {member.entityimage && (
                                <img 
                                    src={`data: image / png; base64, ${ member.entityimage } `} 
                                    alt={member.fullname} 
                                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 object-cover" 
                                />
                            )}
                            <h3 className="text-xl font-bold text-white text-center">{member.fullname || 'Team Member'}</h3>
                            {member.jobtitle && (
                                <p className="text-gray-400 text-center mb-2">{member.jobtitle}</p>
                            )}
                            {member.emailaddress1 && (
                                <p className="text-sm text-gray-500 text-center">{member.emailaddress1}</p>
                            )}
                        </motion.div>
                    ))}
                </div>

                {team.length === 0 && !loading && !error && (
                    <div className="text-center text-gray-400 text-xl">No team members found</div>
                )}
            </div>
        </div>
    );
};

export default Team;
