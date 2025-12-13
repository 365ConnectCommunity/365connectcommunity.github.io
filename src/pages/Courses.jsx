import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Clock, BarChart } from 'lucide-react';

const Courses = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    useEffect(() => {
        if (user) {
            const savedEnrollments = JSON.parse(localStorage.getItem(`enrolled_${user.email}`) || '[]');
            setEnrolledCourses(savedEnrollments);
        }
    }, [user]);

    const handleEnroll = (courseId) => {
        if (!user) {
            alert('Please log in to enroll in courses.');
            navigate('/login');
            return;
        }

        const newEnrollments = [...enrolledCourses, courseId];
        localStorage.setItem(`enrolled_${user.email}`, JSON.stringify(newEnrollments));
        setEnrolledCourses(newEnrollments);
        navigate(`/course/${courseId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-black mb-4 text-white drop-shadow-lg">
                        Learning Paths
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Master Power Platform with our curated courses.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => {
                        const isEnrolled = enrolledCourses.includes(course.id);

                        return (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col"
                            >
                                <div className="h-48 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                                    <BookOpen size={64} className="text-white opacity-50" />
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                                        <div className="flex items-center">
                                            <Clock size={14} className="mr-1" />
                                            {course.duration}
                                        </div>
                                        <div className="flex items-center">
                                            <BarChart size={14} className="mr-1" />
                                            {course.level}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                                    <p className="text-gray-400 mb-6 flex-1">{course.description}</p>

                                    {isEnrolled ? (
                                        <Link
                                            to={`/course/${course.id}`}
                                            className="block w-full text-center py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
                                        >
                                            Continue Learning
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => handleEnroll(course.id)}
                                            className="block w-full text-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                                        >
                                            Enroll Now
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Courses;
