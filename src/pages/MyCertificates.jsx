import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { certificatesAPI } from '../services/apiService';
import { courses } from '../data/courses';
import { Award, Download, Calendar } from 'lucide-react';

const MyCertificates = () => {
    const { user } = useAuth();
    const [certificates, setCertificates] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCertificates();
        loadEnrolledCourses();
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

    const loadEnrolledCourses = () => {
        if (!user?.email) return;
        const enrolledIds = JSON.parse(localStorage.getItem(`enrolled_${user.email}`) || '[]');
        const enrolled = courses.filter(course => enrolledIds.includes(course.id));
        setEnrolledCourses(enrolled);
    };

    const getProgress = (courseId) => {
        if (!user?.email) return 0;
        const progress = JSON.parse(localStorage.getItem(`progress_${user.email}_${courseId}`) || '[]');
        const course = courses.find(c => c.id === courseId);
        if (!course) return 0;
        const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
        return totalLessons === 0 ? 0 : Math.round((progress.length / totalLessons) * 100);
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
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

                                    <div className="space-y-2 mb-6">
                                        <p className="text-gray-300 text-sm">
                                            <span className="font-bold text-blue-400">Recipient:</span> {cert.recipientname || user?.name || 'User'}
                                        </p>
                                        <p className="text-gray-300 text-sm">
                                            <span className="font-bold text-blue-400">Type:</span> {cert.certificatetype || 'Completion'}
                                        </p>
                                        {cert.eventdate && (
                                            <p className="text-gray-300 text-sm">
                                                <span className="font-bold text-blue-400">Event Date:</span> {cert.eventdate}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex flex-col space-y-3">
                                        {(cert.verificationlink || cert.certificateid) && (
                                            <a
                                                href={cert.verificationlink || `/certificate/${cert.certificateid}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                                            >
                                                Verify Certificate
                                            </a>
                                        )}
                                        {cert.downloadlink && (
                                            <a
                                                href={cert.downloadlink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
                                            >
                                                <Download size={16} className="mr-2" />
                                                Download Certificate
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* My Courses Section */}
                    {enrolledCourses.length > 0 && (
                        <div className="mt-12">
                            <h2 className="text-4xl font-black mb-8 text-white drop-shadow-lg text-center">
                                My Active Courses
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {enrolledCourses.map((course, index) => {
                                    const progress = getProgress(course.id);
                                    return (
                                        <motion.div
                                            key={course.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-gray-800 rounded-2xl p-6 border border-gray-700 flex flex-col"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white mb-2">{course.title}</h3>
                                                    <p className="text-gray-400 text-sm">{course.level} • {course.duration}</p>
                                                </div>
                                                <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold">
                                                    {progress}%
                                                </div>
                                            </div>

                                            <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
                                                <div
                                                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full transition-all duration-500"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>

                                            <a
                                                href={`/course/${course.id}`}
                                                className="mt-auto w-full py-3 bg-white text-black font-bold rounded-lg text-center hover:bg-gray-200 transition-colors"
                                            >
                                                {progress === 100 ? 'Review Course' : 'Continue Learning'}
                                            </a>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default MyCertificates;
