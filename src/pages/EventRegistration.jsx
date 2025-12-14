import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { eventsAPI } from '../services/apiService';
import { Calendar, MapPin, User, Mail, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';

const EventRegistration = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const eventId = queryParams.get('event');

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!eventId) {
            setError('No event specified');
            setLoading(false);
            return;
        }
        loadEvent();
    }, [eventId]);

    const loadEvent = async () => {
        try {
            const data = await eventsAPI.getEventDetails(eventId);
            if (!data) {
                setError('Event not found');
            } else {
                setEvent(data);
            }
        } catch (err) {
            setError('Failed to load event details');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            // Register using API
            const result = await eventsAPI.registerForEvent(eventId, user.email, user.name);
            if (result.success) {
                setSuccess(true);
            }
        } catch (err) {
            console.error(err);
            setError('Registration failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white">Loading event details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="bg-gray-800 p-8 rounded-2xl max-w-md w-full text-center border border-red-500/30">
                    <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
                    <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
                    <p className="text-gray-400 mb-6">{error}</p>
                    <button onClick={() => navigate('/events')} className="px-6 py-2 bg-gray-700 text-white rounded-lg">
                        Back to Events
                    </button>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="bg-gray-800 p-8 rounded-2xl max-w-md w-full text-center border border-green-500/30">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="text-green-500" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Registration Confirmed!</h2>
                    <p className="text-gray-300 mb-6">
                        You have successfully registered for <strong>{event?.name}</strong>.
                        We've sent a confirmation email to {user.email}.
                    </p>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => navigate('/my-events')} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                            View My Events
                        </button>
                        <button onClick={() => navigate('/events')} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors">
                            Browse More Events
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 pt-20 pb-12 px-4">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/events')}
                    className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back to Events
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Event Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {event?.eventimage && (
                            <img
                                src={event.eventimage.startsWith('http') ? event.eventimage : `data:image/png;base64,${event.eventimage}`}
                                alt={event.name}
                                className="w-full h-48 object-cover rounded-xl shadow-lg"
                            />
                        )}

                        <div>
                            <h1 className="text-3xl font-black text-white mb-4">{event?.name}</h1>
                            <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
                                {event?.startdate && (
                                    <div className="flex items-center bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700">
                                        <Calendar size={16} className="mr-2 text-blue-400" />
                                        <span className="text-sm">
                                            {new Date(event.startdate).toLocaleDateString(undefined, {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                )}
                                {event?.location && (
                                    <div className="flex items-center bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700">
                                        <MapPin size={16} className="mr-2 text-red-400" />
                                        <span className="text-sm">{event.location}</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                {event?.description}
                            </p>
                        </div>
                    </motion.div>

                    {/* Registration Form */}
                    {/* Registration Form or Closed Message */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gray-800 p-8 rounded-2xl border border-gray-700 h-fit sticky top-24"
                    >
                        {!event?.registrationopen ? (
                            <div className="text-center">
                                <AlertCircle className="mx-auto text-orange-500 mb-4" size={48} />
                                <h2 className="text-2xl font-bold text-white mb-2">Registration Closed</h2>
                                <p className="text-gray-400 mb-6">
                                    Registration for this event is currently closed or has ended.
                                </p>
                                <button
                                    onClick={() => navigate('/events')}
                                    className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                                >
                                    Browse Other Events
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold text-white mb-6">Confirm Registration</h2>

                                <form onSubmit={handleRegister} className="space-y-6">
                                    <div>
                                        <label className="block text-gray-400 text-sm font-medium mb-1">Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 text-gray-500" size={18} />
                                            <input
                                                type="text"
                                                value={user?.name}
                                                disabled
                                                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-gray-300 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-400 text-sm font-medium mb-1">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                                            <input
                                                type="email"
                                                value={user?.email}
                                                disabled
                                                className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-gray-300 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            {submitting ? 'Registering...' : 'Register For Event'}
                                        </button>
                                        <p className="text-center text-xs text-gray-500 mt-4">
                                            By registering, you agree to receive event updates via email.
                                        </p>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default EventRegistration;
