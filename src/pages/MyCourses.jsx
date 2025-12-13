import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { courses } from '../data/courses';
import { BookOpen, CheckCircle, PlayCircle, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const MyCourses = () => {
    const { user } = useAuth();
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        if (user) {
            const enrolledIds = JSON.parse(localStorage.getItem(`enrolled_${user.email}`) || '[]');
            const enrolled = courses.filter(course => enrolledIds.includes(course.id));
            setEnrolledCourses(enrolled);
        }
    }, [user]);

    const getProgress = (courseId) => {
        if (!user?.email) return 0;
        const progress = JSON.parse(localStorage.getItem(`progress_${user.email}_${courseId}`) || '[]');
        const course = courses.find(c => c.id === courseId);
        if (!course) return 0;
        const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
        return totalLessons === 0 ? 0 : Math.round((progress.length / totalLessons) * 100);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
            <SEO
                title="My Courses"
                description="View and continue your active courses on 365Connect."
            />
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-5xl font-black mb-12 text-white drop-shadow-lg text-center">
                        My Courses
                    </h1>

                    {!user ? (
                        <div className="text-center text-white text-xl">Please log in to view your courses.</div>
                    ) : enrolledCourses.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="bg-gradient-to-r from-green-500 to-teal-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="text-white" size={48} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-300 mb-4">No Active Courses</h2>
                            <p className="text-gray-400 mb-8">
                                You haven't started any courses yet.
                            </p>
                            <Link to="/courses" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
                                Browse Catalog
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {enrolledCourses.map((course, index) => {
                                const progress = getProgress(course.id);
                                const isCompleted = progress === 100;

                                return (
                                    <motion.div
                                        key={course.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gray-800 rounded-2xl p-6 border border-gray-700 flex flex-col hover:border-blue-500/50 transition-all shadow-xl"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    {isCompleted && (
                                                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full font-bold flex items-center">
                                                            <CheckCircle size={12} className="mr-1" /> COMPLETED
                                                        </span>
                                                    )}
                                                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full font-bold">
                                                        {course.level}
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl font-bold text-white mb-1 leading-tight">{course.title}</h3>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <div className="flex justify-between text-sm text-gray-400 mb-2">
                                                <span>Progress</span>
                                                <span className={isCompleted ? "text-green-500 font-bold" : "text-blue-400"}>{progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full transition-all duration-1000 ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-blue-500 to-cyan-400'}`}
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/course/${course.id}`}
                                            className={`mt-auto w-full py-3 font-bold rounded-xl text-center transition-all flex items-center justify-center gap-2 ${isCompleted
                                                ? 'bg-gray-700 text-white hover:bg-gray-600 border border-gray-600'
                                                : 'bg-white text-black hover:bg-gray-200'
                                                }`}
                                        >
                                            {isCompleted ? (
                                                <>
                                                    <Award size={18} className="text-yellow-400" />
                                                    Revise Course
                                                </>
                                            ) : (
                                                <>
                                                    <PlayCircle size={18} />
                                                    Continue Learning
                                                </>
                                            )}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default MyCourses;
