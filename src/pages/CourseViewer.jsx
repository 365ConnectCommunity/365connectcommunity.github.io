import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, PlayCircle, Lock, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

const CourseViewer = () => {
    const { courseId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const foundCourse = courses.find(c => c.id === courseId);
        if (!foundCourse) {
            navigate('/courses');
            return;
        }
        setCourse(foundCourse);

        if (user) {
            // Check enrollment
            const enrolled = JSON.parse(localStorage.getItem(`enrolled_${user.email}`) || '[]');
            if (!enrolled.includes(courseId)) {
                alert('You are not enrolled in this course.');
                navigate('/courses');
                return;
            }

            // Load progress
            const savedProgress = JSON.parse(localStorage.getItem(`progress_${user.email}_${courseId}`) || '[]');
            setCompletedLessons(savedProgress);

            // Set initial active lesson (first uncompleted or simply first)
            if (foundCourse.modules.length > 0 && foundCourse.modules[0].lessons.length > 0) {
                setActiveLesson(foundCourse.modules[0].lessons[0]);
            }
        } else {
            navigate('/login');
        }
    }, [courseId, user, navigate]);

    const handleLessonSelect = (lesson) => {
        setActiveLesson(lesson);
        // On mobile, close sidebar after selection
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    const markAsComplete = () => {
        if (!activeLesson || !user) return;

        if (!completedLessons.includes(activeLesson.id)) {
            const newProgress = [...completedLessons, activeLesson.id];
            setCompletedLessons(newProgress);
            localStorage.setItem(`progress_${user.email}_${courseId}`, JSON.stringify(newProgress));
        }

        // Auto-advance logic could go here
    };

    if (!course || !activeLesson) return <div className="text-white text-center py-20">Loading course...</div>;

    return (
        <div className="flex h-screen bg-gray-900 pt-20">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-30 w-80 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 pt-20 md:pt-0`}>
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-white font-bold truncate">{course.title}</h2>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400">
                        <X size={24} />
                    </button>
                </div>
                <div className="overflow-y-auto h-full pb-20">
                    {course.modules.map(module => (
                        <div key={module.id} className="mb-2">
                            <div className="px-4 py-2 bg-gray-700/50 text-gray-300 text-sm font-semibold uppercase tracking-wider">
                                {module.title}
                            </div>
                            {module.lessons.map(lesson => {
                                const isCompleted = completedLessons.includes(lesson.id);
                                const isActive = activeLesson.id === lesson.id;

                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => handleLessonSelect(lesson)}
                                        className={`w-full flex items-center px-4 py-3 hover:bg-gray-700 transition-colors text-left ${isActive ? 'bg-blue-600/10 border-r-4 border-blue-500' : ''}`}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle size={18} className="text-green-500 mr-3 flex-shrink-0" />
                                        ) : (
                                            <PlayCircle size={18} className={`mr-3 flex-shrink-0 ${isActive ? 'text-blue-500' : 'text-gray-500'}`} />
                                        )}
                                        <span className={`text-sm ${isActive ? 'text-blue-400 font-medium' : 'text-gray-400'}`}>
                                            {lesson.title}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-gray-900 relative">
                {/* Mobile Header for Sidebar Toggle */}
                <div className="md:hidden p-4 bg-gray-800 border-b border-gray-700 flex items-center">
                    <button onClick={() => setSidebarOpen(true)} className="text-white mr-4">
                        <Menu size={24} />
                    </button>
                    <span className="text-white font-bold truncate">{activeLesson.title}</span>
                </div>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold text-white mb-6">{activeLesson.title}</h1>

                        <div className="prose prose-invert max-w-none mb-12">
                            {activeLesson.content.split('\n').map((line, idx) => {
                                // Basic Markdown Parsing
                                const processText = (text) => {
                                    // Bold: **text**
                                    const parts = text.split(/(\*\*.*?\*\*)/g);
                                    return parts.map((part, i) => {
                                        if (part.startsWith('**') && part.endsWith('**')) {
                                            return <strong key={i} className="text-white">{part.slice(2, -2)}</strong>;
                                        }
                                        // Links: [text](url) - (Simple regex for basic links)
                                        const linkParts = part.split(/(\[.*?\]\(.*?\))/g);
                                        if (linkParts.length > 1) {
                                            return linkParts.map((linkPart, j) => {
                                                const linkMatch = linkPart.match(/\[(.*?)\]\((.*?)\)/);
                                                if (linkMatch) {
                                                    return (
                                                        <a key={`${i}-${j}`} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                                                            {linkMatch[1]}
                                                        </a>
                                                    );
                                                }
                                                return linkPart;
                                            });
                                        }
                                        return part;
                                    });
                                };

                                const trimmedLine = line.trim();
                                if (!trimmedLine) return <div key={idx} className="h-4"></div>;

                                if (trimmedLine.startsWith('*') || trimmedLine.startsWith('- ') || /^\d+\./.test(trimmedLine)) {
                                    return (
                                        <li key={idx} className="ml-4 list-disc text-gray-300 mb-2 pl-2">
                                            {processText(trimmedLine.replace(/^[\*\-\d\.]+\s?/, ''))}
                                        </li>
                                    );
                                }

                                return (
                                    <p key={idx} className="mb-4 text-gray-300 leading-relaxed">
                                        {processText(trimmedLine)}
                                    </p>
                                );
                            })}
                        </div>

                        <div className="flex justify-between items-center border-t border-gray-700 pt-8">
                            <button className="text-gray-400 hover:text-white flex items-center disabled:opacity-50" disabled>
                                <ChevronLeft size={20} className="mr-2" />
                                Previous Lesson
                            </button>

                            <button
                                onClick={markAsComplete}
                                className={`px-6 py-3 rounded-lg font-bold transition-colors flex items-center ${completedLessons.includes(activeLesson.id) ? 'bg-green-600/20 text-green-500 cursor-default' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                            >
                                {completedLessons.includes(activeLesson.id) ? (
                                    <>
                                        <CheckCircle size={20} className="mr-2" />
                                        Completed
                                    </>
                                ) : (
                                    'Mark as Complete'
                                )}
                            </button>

                            <button className="text-gray-400 hover:text-white flex items-center disabled:opacity-50" disabled>
                                Next Lesson
                                <ChevronRight size={20} className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseViewer;
