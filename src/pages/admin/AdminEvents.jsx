import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp, query, orderBy } from 'firebase/firestore';
import { Plus, Edit, Trash2, Calendar, MapPin, X, Upload, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminEvents = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startdate: '',
        enddate: '',
        location: '',
        eventimage: '',
        registrationopen: true,
        eventtype: 'Webinar',
        duration: '',
        host: user?.email || ''
    });

    const isSuperAdmin = user?.email === 'mianshaheerahmed@gmail.com' || user?.role === 'admin';

    useEffect(() => {
        if (user) fetchEvents();
    }, [user]);

    const fetchEvents = async () => {
        try {
            const q = query(collection(db, 'events'), orderBy('startdate', 'desc'));
            const snapshot = await getDocs(q);
            let allEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // RBAC Filter: If not super admin, only show events created by this user
            // We check if 'creatorUid' matches, or 'host' matches email as fallback
            if (!isSuperAdmin) {
                allEvents = allEvents.filter(ev =>
                    (ev.creatorUid && ev.creatorUid === user.uid) ||
                    (ev.host && ev.host === user.email)
                );
            }

            setEvents(allEvents);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleOpenModal = (event = null) => {
        if (event) {
            setCurrentEvent(event);
            setFormData({
                name: event.name,
                description: event.description,
                startdate: event.startdate ? event.startdate.toDate().toISOString().slice(0, 16) : '',
                enddate: event.enddate ? event.enddate.toDate().toISOString().slice(0, 16) : '',
                location: event.location,
                eventimage: event.eventimage,
                registrationopen: event.registrationopen,
                eventtype: event.eventtype || 'Webinar',
                duration: event.duration || '',
                host: event.host || user?.email
            });
        } else {
            setCurrentEvent(null);
            setFormData({
                name: '',
                description: '',
                startdate: '',
                enddate: '',
                location: '',
                eventimage: '',
                registrationopen: true,
                eventtype: 'Webinar',
                duration: '',
                host: user?.email || ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                startdate: Timestamp.fromDate(new Date(formData.startdate)),
                enddate: Timestamp.fromDate(new Date(formData.enddate)),
                creatorUid: currentEvent?.creatorUid || user.uid, // Persist creator or set new
                statuscode: 1
            };

            if (currentEvent) {
                await updateDoc(doc(db, 'events', currentEvent.id), payload);
            } else {
                await addDoc(collection(db, 'events'), payload);
            }
            setIsModalOpen(false);
            fetchEvents();
        } catch (error) {
            console.error(error);
            alert("Error saving event");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this event?")) {
            await deleteDoc(doc(db, 'events', id));
            fetchEvents();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Events Management</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus size={20} /> Create Event
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden group">
                        <div className="h-48 overflow-hidden relative">
                            {event.eventimage && (
                                <img
                                    src={event.eventimage.startsWith('http') ? event.eventimage : `data:image/png;base64,${event.eventimage}`}
                                    alt={event.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            )}
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => {
                                    const link = `${window.location.origin}/register?event=${event.id}`;
                                    navigator.clipboard.writeText(link);
                                    alert('Invitation link copied!');
                                }} className="p-2 bg-green-600 rounded-full text-white shadow-lg" title="Copy Link"><LinkIcon size={16} /></button>
                                <button onClick={() => handleOpenModal(event)} className="p-2 bg-blue-600 rounded-full text-white shadow-lg"><Edit size={16} /></button>
                                <button onClick={() => handleDelete(event.id)} className="p-2 bg-red-600 rounded-full text-white shadow-lg"><Trash2 size={16} /></button>
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
                            <div className="flex items-center text-gray-400 text-sm mb-2">
                                <Calendar size={14} className="mr-2" />
                                <span>{event.startdate?.toDate().toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center text-gray-400 text-sm mb-4">
                                <MapPin size={14} className="mr-2" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${event.registrationopen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {event.registrationopen ? 'Open' : 'Closed'}
                                </span>
                                <span className="text-xs text-gray-500">Host: {event.host}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
                        <h2 className="text-2xl font-bold text-white mb-6">{currentEvent ? 'Edit Event' : 'Create Event'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input placeholder="Event Name" required className="w-full bg-gray-700 text-white rounded p-3 border border-gray-600 focus:border-orange-500 outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            <textarea placeholder="Description" rows={4} className="w-full bg-gray-700 text-white rounded p-3 border border-gray-600 focus:border-orange-500 outline-none" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-400 mb-1 block">Start Date</label>
                                    <input type="datetime-local" required className="w-full bg-gray-700 text-white rounded p-3 border border-gray-600" value={formData.startdate} onChange={e => setFormData({ ...formData, startdate: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 mb-1 block">End Date</label>
                                    <input type="datetime-local" className="w-full bg-gray-700 text-white rounded p-3 border border-gray-600" value={formData.enddate} onChange={e => setFormData({ ...formData, enddate: e.target.value })} />
                                </div>
                            </div>

                            <input placeholder="Location (e.g. Remote, Lahore, etc.)" className="w-full bg-gray-700 text-white rounded p-3 border border-gray-600" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                            <input placeholder="Image URL (http...)" className="w-full bg-gray-700 text-white rounded p-3 border border-gray-600" value={formData.eventimage} onChange={e => setFormData({ ...formData, eventimage: e.target.value })} />

                            <div className="flex gap-4 items-center">
                                <label className="flex items-center space-x-2 text-white cursor-pointer">
                                    <input type="checkbox" checked={formData.registrationopen} onChange={e => setFormData({ ...formData, registrationopen: e.target.checked })} className="form-checkbox text-orange-500 rounded bg-gray-700 border-gray-600" />
                                    <span>Registration Open</span>
                                </label>
                            </div>

                            <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all mt-4">
                                {currentEvent ? 'Update Event' : 'Create Event'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminEvents;
