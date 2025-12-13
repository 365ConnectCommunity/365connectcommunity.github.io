import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/apiService';
import { Calendar, MapPin, Clock } from 'lucide-react';

const MyEvents = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        if (!user?.email) {
            setError('Please log in to view your events');
            setLoading(false);
            return;
        }

        try {
            const data = await userAPI.getMyEvents(user.email);
            setEvents(data);
        } catch (err) {
            setError('Failed to load events');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 flex items-center justify-center">
                <div className="text-white text-xl">Loading events...</div>
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
                        My Events
                    </h1>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-8 text-center">
                            {error}
                        </div>
                    )}

                    {events.length === 0 && !error ? (
                        <div className="text-center py-20">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Calendar className="text-white" size={48} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-300 mb-4">No Events Yet</h2>
                            <p className="text-gray-400">
                                Register for upcoming events to see them here!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event, index) => (
                                <motion.div
                                    key={event.eventid || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all border border-gray-700 flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/30 uppercase tracking-wider">
                                                {event.statuscode || 'Registered'}
                                            </div>
                                            {event.eventtype && (
                                                <div className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-bold border border-purple-500/30">
                                                    {event.eventtype}
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                                            {event.name}
                                        </h3>

                                        <div className="space-y-2 mb-6">
                                            {event.startdate && (
                                                <div className="flex items-center text-gray-400 text-sm">
                                                    <Calendar size={16} className="mr-2 text-blue-500" />
                                                    <span>{new Date(event.startdate).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                            {/* Add time if available or parsed from date */}
                                        </div>
                                    </div>

                                    {/* Placeholder for future actions like 'Join Link' if available */}
                                    <div className="mt-4 pt-4 border-t border-gray-700">
                                        <p className="text-xs text-gray-500 text-center">
                                            Check your email for join details
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default MyEvents;
