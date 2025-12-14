import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventsAPI } from '../services/apiService';
import { useAuth } from '../context/AuthContext';
import { Calendar, MapPin, Users, Clock, Search, X, Link as LinkIcon, Check } from 'lucide-react';

const Events = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [filteredPastEvents, setFilteredPastEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [copiedId, setCopiedId] = useState(null);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        loadEvents();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredPastEvents(pastEvents);
        } else {
            const filtered = pastEvents.filter(event =>
                event.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                event.description?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPastEvents(filtered);
        }
    }, [searchQuery, pastEvents]);

    const loadEvents = async () => {
        try {
            const [upcoming, past] = await Promise.all([
                eventsAPI.getEvents('UpComing'),
                eventsAPI.getEvents('Past')
            ]);
            setUpcomingEvents(upcoming);
            setPastEvents(past);
            setFilteredPastEvents(past);
        } catch (err) {
            console.error('Failed to load events', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'TBA';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const EventCard = ({ event, isPast = false }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all border border-gray-700"
        >
            <div className="flex flex-col md:flex-row gap-4">
                {event.eventimage && (
                    <img
                        src={event.eventimage.startsWith('http') ? event.eventimage : `data:image/png;base64,${event.eventimage}`}
                        alt={event.name}
                        className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                )}
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${isPast ? 'bg-gray-600 text-gray-300' : 'bg-blue-500/20 text-blue-400'
                                }`}>
                                {isPast ? 'Past Event' : 'Upcoming'}
                            </span>
                            <h3 className="text-xl font-bold text-white">{event.name || 'Event'}</h3>
                        </div>
                    </div>

                    {event.description && (
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                        {event.startdate && (
                            <div className="flex items-center">
                                <Calendar size={14} className="mr-2" />
                                <span>{formatDate(event.startdate)}</span>
                            </div>
                        )}
                        {event.location && (
                            <div className="flex items-center">
                                <MapPin size={14} className="mr-2" />
                                <span>{event.location}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedEvent(event)}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                        >
                            View Details
                        </button>
                        {!isPast && isAuthenticated && event.registrationopen && (
                            <button
                                onClick={() => window.location.href = `/register?event=${event.eventid}`}
                                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
                            >
                                Register Now
                            </button>
                        )}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                const link = `${window.location.origin}/register?event=${event.eventid}`;
                                navigator.clipboard.writeText(link);
                                setCopiedId(event.eventid);
                                setTimeout(() => setCopiedId(null), 2000);
                            }}
                            className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            title="Copy Invitation Link"
                        >
                            {copiedId === event.eventid ? <Check size={20} className="text-green-500" /> : <LinkIcon size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );

    const EventModal = ({ event, onClose }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
            >
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-3xl font-black text-white">{event.name}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {event.eventimage && (
                    <img
                        src={event.eventimage.startsWith('http') ? event.eventimage : `data:image/png;base64,${event.eventimage}`}
                        alt={event.name}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                )}

                <div className="space-y-4 mb-6">
                    {event.description && (
                        <p className="text-gray-300">{event.description}</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {event.startdate && (
                            <div className="flex items-center text-gray-400">
                                <Calendar size={20} className="mr-3 text-blue-400" />
                                <div>
                                    <div className="text-xs text-gray-500">Date</div>
                                    <div className="text-white">{formatDate(event.startdate)}</div>
                                </div>
                            </div>
                        )}
                        {event.location && (
                            <div className="flex items-center text-gray-400">
                                <MapPin size={20} className="mr-3 text-blue-400" />
                                <div>
                                    <div className="text-xs text-gray-500">Location</div>
                                    <div className="text-white">{event.location}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {isAuthenticated && event.registrationopen && (
                    <button
                        onClick={() => window.location.href = `/register?event=${event.eventid}`}
                        className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-bold"
                    >
                        Register for This Event
                    </button>
                )}
            </motion.div>
        </motion.div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 flex items-center justify-center">
                <div className="text-white text-xl">Loading events...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
            <div className="container mx-auto px-4">
                {/* Upcoming Events */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl font-black mb-12 text-white drop-shadow-lg text-center">
                        Upcoming Events
                    </h1>

                    {upcomingEvents.length === 0 ? (
                        <div className="text-center text-gray-400 py-12">
                            <Calendar className="mx-auto mb-4 text-gray-600" size={48} />
                            <p className="text-xl">No upcoming events at the moment. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {upcomingEvents.map((event) => (
                                <EventCard key={event.eventid} event={event} />
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Past Events */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-4xl font-black mb-8 text-white drop-shadow-lg text-center">
                        Past Events
                    </h2>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mb-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search past events..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {filteredPastEvents.length === 0 ? (
                        <div className="text-center text-gray-400 py-12">
                            <p className="text-xl">
                                {searchQuery ? 'No events found matching your search' : 'No past events yet'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredPastEvents.map((event) => (
                                <EventCard key={event.eventid} event={event} isPast />
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Event Modal */}
                <AnimatePresence>
                    {selectedEvent && (
                        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Events;
