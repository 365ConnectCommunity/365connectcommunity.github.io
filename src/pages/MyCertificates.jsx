import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { certificatesAPI } from '../services/apiService';
import { Award, Download, Calendar } from 'lucide-react';

const MyCertificates = () => {
    const { user } = useAuth();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCertificates();
    }, []);

    const loadCertificates = async () => {
        if (!user?.email) {
            setError('Please log in to view your certificates');
            setLoading(false);
            return;
        }

        try {
            const data = await certificatesAPI.getCertificates(user.email);
            setCertificates(data);
        } catch (err) {
            setError('Failed to load certificates');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 flex items-center justify-center">
                <div className="text-white text-xl">Loading certificates...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-5xl font-black mb-12 text-white drop-shadow-lg text-center">
                        My Certificates
                    </h1>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-8 text-center">
                            {error}
                        </div>
                    )}

                    {certificates.length === 0 && !error ? (
                        <div className="text-center py-20">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Award className="text-white" size={48} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-300 mb-4">No Certificates Yet</h2>
                            <p className="text-gray-400">
                                Complete courses and attend events to earn certificates!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certificates.map((cert, index) => (
                                <motion.div
                                    key={cert.certificateid || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-500/20 transition-all border border-gray-700"
                                >
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                        <Award className="text-white" size={32} />
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {cert.name || cert.certificatename || 'Certificate'}
                                    </h3>

                                    {cert.issueddate && (
                                        <div className="flex items-center text-gray-400 text-sm mb-4">
                                            <Calendar size={14} className="mr-2" />
                                            <span>{new Date(cert.issueddate).toLocaleDateString()}</span>
                                        </div>
                                    )}

                                    {cert.description && (
                                        <p className="text-gray-400 text-sm mb-4">
                                            {cert.description}
                                        </p>
                                    )}

                                    {cert.certificateurl && (
                                        <a
                                            href={cert.certificateurl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                                        >
                                            <Download size={16} className="mr-2" />
                                            Download
                                        </a>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default MyCertificates;
