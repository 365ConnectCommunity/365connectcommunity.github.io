import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import { CheckCircle, PlayCircle, Lock, ChevronLeft, ChevronRight, Menu, X, Award, Loader2 } from 'lucide-react';
import { courseAPI, certificatesAPI } from '../services/apiService';

const CourseViewer = () => {
    const { courseId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [activeLesson, setActiveLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [issuingCertificate, setIssuingCertificate] = useState(false);
    const [certificateId, setCertificateId] = useState(null);

    useEffect(() => {
        const loadCourseData = async () => {
            const foundCourse = courses.find(c => c.id === courseId);
            if (!foundCourse) {
                navigate('/courses');
                return;
            }
            setCourse(foundCourse);

            if (user) {
                // Check enrollment
                try {
                    const enrolledIds = await courseAPI.getUserEnrollments(user.uid);
                    if (!enrolledIds.includes(courseId)) {
                        alert('You are not enrolled in this course.');
                        navigate('/courses');
                        return;
                    }
                } catch (error) {
                    console.error("Error checking enrollment:", error);
                }

                // Load progress from Firestore
                try {
                    const savedProgress = await courseAPI.getProgress(user.uid, courseId);
                    setCompletedLessons(savedProgress);

                    // Check if certificate already exists
                    const certCheck = await certificatesAPI.checkCertificate(user.email, foundCourse.title);
                    if (certCheck.exists) {
                        setCertificateId(certCheck.certificateId);
                    }
                } catch (error) {
                    console.error("Error loading progress:", error);
                }

                // Set initial active lesson (first uncompleted or simple logic)
                if (foundCourse.modules.length > 0 && foundCourse.modules[0].lessons.length > 0) {
                    setActiveLesson(foundCourse.modules[0].lessons[0]);
                }
            } else {
                navigate('/login');
            }
        };

        loadCourseData();
    }, [courseId, user, navigate]);

    const handleLessonSelect = (lesson) => {
        setActiveLesson(lesson);
        // On mobile, close sidebar after selection
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    const markAsComplete = async () => {
        if (!activeLesson || !user) return;

        if (!completedLessons.includes(activeLesson.id)) {
            const newProgress = [...completedLessons, activeLesson.id];
            setCompletedLessons(newProgress);

            // Save to Firestore
            await courseAPI.saveProgress(user.uid, courseId, newProgress);

            // Check for Course Completion
            const allLessonsCount = course.modules.flatMap(m => m.lessons).length;
            if (newProgress.length === allLessonsCount) {
                handleCourseCompletion();
            }
        }
    };

    const handleCourseCompletion = async () => {
        if (!user || certificateId) return; // Already have cert or no user

        setIssuingCertificate(true);
        try {
            // Check again to be safe
            const check = await certificatesAPI.checkCertificate(user.email, course.title);
            if (check.exists) {
                setCertificateId(check.certificateId);
            } else {
                // Issue Certificate
                const certData = {
                    uid: user.uid,
                    email: user.email,
                    recipientname: `${user.firstname || user.displayName || 'Learner'} ${user.lastname || ''}`.trim(),
                    eventname: course.title,
                    description: `For successfully completing the course: ${course.title}`,
                    name: `${course.title} Certificate`,
                };

                const result = await certificatesAPI.issueCertificate(certData);
                if (result.success) {
                    setCertificateId(result.certificateId);
                }
            }
        } catch (error) {
            console.error("Error issuing certificate:", error);
        } finally {
            setIssuingCertificate(false);
        }
    };

    // Navigation Helpers
    const allLessons = course ? course.modules.flatMap(m => m.lessons) : [];
    const currentLessonIndex = allLessons.findIndex(l => l.id === activeLesson?.id);
    const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
    const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

    const goToPrevLesson = () => {
        if (prevLesson) {
            handleLessonSelect(prevLesson);
        }
    };

    const goToNextLesson = () => {
        if (nextLesson) {
            handleLessonSelect(nextLesson);
        }
    };

    // Check for course completion
    const totalLessons = allLessons.length;
    const progressPercentage = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
    const isCourseCompleted = totalLessons > 0 && completedLessons.length === totalLessons;

    // LinkedIn Share
    const shareToLinkedIn = () => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(`I just completed the ${course.title} on 365Connect Community!`);
        window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${title} ${url}`, '_blank');
    };

    // Navigate to Certificate View
    const viewCertificate = () => {
        if (certificateId) {
            navigate(`/certificate/${certificateId}`);
        }
    };

    if (!course) return <div>Course not found</div>;
    if (!activeLesson) return <div>Lesson not found</div>;

    if (isCourseCompleted && activeLesson.id === allLessons[allLessons.length - 1].id && completedLessons.includes(activeLesson.id)) {
        // If we are on the last lesson and it is completed, show the completion screen as an overlay or replace content?
        // Let's replace the Main Content area with a celebration view if the user chooses to "View Certificate"
        // or just show it below the lesson content.
        // Actually, let's just show an overlay if they just finished.
    }

    return (
        <div className="flex bg-gray-900 min-h-screen pt-20 relative">
            <SEO
                title={`${activeLesson.title} - ${course.title}`}
                description={`Learn ${activeLesson.title} as part of the ${course.title} on 365Connect.`}
            />

            {/* Completion Overlay (Only visible when finishing the last lesson?) 
                Actually, let's make it a dedicated "Lesson" view or simpler: 
                If complete, show a banner. 
            */}

            {isCourseCompleted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-blue-500/30 max-w-lg w-full text-center shadow-2xl relative overflow-hidden">
                        {/* Fireworks Effect (CSS-based particles could be added here, simplified for now) */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>

                        <CheckCircle size={80} className="mx-auto text-green-500 mb-6 animate-bounce" />
                        <h2 className="text-4xl font-black text-white mb-2">Congratulations!</h2>
                        <p className="text-gray-300 mb-8 text-lg">You have successfully completed <strong>{course.title}</strong>.</p>

                        <div className="space-y-4">
                            {issuingCertificate ? (
                                <div className="text-blue-400 flex items-center justify-center gap-2">
                                    <Loader2 className="animate-spin" /> Generating Certificate...
                                </div>
                            ) : (
                                <button onClick={viewCertificate} disabled={!certificateId} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <Award size={20} /> View Certificate
                                </button>
                            )}
                            <button onClick={shareToLinkedIn} className="w-full py-4 bg-[#0077b5] hover:bg-[#006396] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                                <span>In</span> Share on LinkedIn
                            </button>
                            <button onClick={() => navigate('/courses')} className="text-gray-400 hover:text-white text-sm mt-4">
                                Back to Courses
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-30 w-80 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 pt-20 md:pt-0`}>
                <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-white font-bold truncate">{course.title}</h2>
                    <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400">
                        <X size={24} />
                    </button>
                </div>
                {/* Progress Bar in Sidebar */}
                <div className="h-2 bg-gray-700 w-full">
                    <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
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
                                    // 1. Split by Bold: **text**
                                    const boldParts = text.split(/(\*\*.*?\*\*)/g);

                                    return boldParts.map((boldPart, i) => {
                                        if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
                                            return <strong key={`b-${i}`} className="text-white font-bold">{boldPart.slice(2, -2)}</strong>;
                                        }

                                        // 2. Split by Italics: *text* (only in non-bold parts)
                                        // We use a regex that looks for *content* but we must be careful not to match empty strings
                                        const italicParts = boldPart.split(/(\*[^*\n]+\*)/g); // Simple split by *...*

                                        return italicParts.map((italicPart, j) => {
                                            if (italicPart.startsWith('*') && italicPart.endsWith('*') && italicPart.length > 2) {
                                                return <em key={`i-${i}-${j}`} className="italic text-gray-300">{italicPart.slice(1, -1)}</em>;
                                            }

                                            // 3. Split by Links: [text](url)
                                            const linkParts = italicPart.split(/(\[.*?\]\(.*?\))/g);
                                            if (linkParts.length > 1) {
                                                return linkParts.map((linkPart, k) => {
                                                    const linkMatch = linkPart.match(/\[(.*?)\]\((.*?)\)/);
                                                    if (linkMatch) {
                                                        return (
                                                            <a key={`l-${i}-${j}-${k}`} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">
                                                                {linkMatch[1]}
                                                            </a>
                                                        );
                                                    }
                                                    return linkPart;
                                                });
                                            }
                                            return italicPart;
                                        });
                                    });
                                };

                                const trimmedLine = line.trim();
                                if (!trimmedLine) return <div key={idx} className="h-4"></div>;

                                // Stricter bullet detection: requires space after *, -, or digit.
                                if (trimmedLine.match(/^(\*|-|\d+\.)\s/)) {
                                    return (
                                        <li key={idx} className="ml-4 list-disc text-gray-300 mb-2 pl-2">
                                            {processText(trimmedLine.replace(/^[\*\-\d\.]+\s/, ''))}
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
                            <button
                                onClick={goToPrevLesson}
                                disabled={!prevLesson}
                                className={`text-gray-400 flex items-center ${!prevLesson ? 'opacity-50 cursor-not-allowed' : 'hover:text-white'}`}
                            >
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

                            <button
                                onClick={goToNextLesson}
                                disabled={!nextLesson || !completedLessons.includes(activeLesson.id)}
                                className={`flex items-center ${(!nextLesson || !completedLessons.includes(activeLesson.id)) ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:text-blue-400'}`}
                                title={!completedLessons.includes(activeLesson.id) ? "Complete this lesson first" : ""}
                            >
                                Next Lesson
                                {(!completedLessons.includes(activeLesson.id) && nextLesson) && <Lock size={16} className="ml-2" />}
                                {completedLessons.includes(activeLesson.id) && <ChevronRight size={20} className="ml-2" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseViewer;
