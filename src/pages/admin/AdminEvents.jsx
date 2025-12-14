import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp, orderBy, query } from 'firebase/firestore';
import { Plus, Edit, Trash2, Calendar, X } from 'lucide-react';

const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startdate: '',
        enddate: '',
        location: '',
        eventimage: '',
        registrationopen: true,
        statuscode: 1,
        eventtype: 'Webinar'
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const q = query(collection(db, 'events'), orderBy('startdate', 'desc'));
        const snapshot = await getDocs(q);
        setEvents(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    const handleOpenModal = (event = null) => {
        if (event) {
            setEditingEvent(event);
            setFormData({
                name: event.name,
                description: event.description,
                startdate: event.startdate ? event.startdate.toDate().toISOString().slice(0, 16) : '',
                enddate: event.enddate ? event.enddate.toDate().toISOString().slice(0, 16) : '',
                location: event.location,
                eventimage: event.eventimage,
                registrationopen: event.registrationopen,
                statuscode: event.statuscode,
                eventtype: event.eventtype
            });
        } else {
            setEditingEvent(null);
            setFormData({
                name: '',
                description: '',
                startdate: '',
                enddate: '',
                location: '',
                eventimage: '',
                registrationopen: true,
                statuscode: 1,
                eventtype: 'Webinar'
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            startdate: Timestamp.fromDate(new Date(formData.startdate)),
            enddate: Timestamp.fromDate(new Date(formData.enddate)),
            createdon: editingEvent ? editingEvent.createdon : Timestamp.now()
        };

        try {
            if (editingEvent) {
                await updateDoc(doc(db, 'events', editingEvent.id), payload);
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
        if (window.confirm("Are you sure you want to delete this event?")) {
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
                    <Plus size={20} /> Add Event
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-lg flex flex-col">
                        <div className="h-40 bg-gray-700 relative">
                            {event.eventimage && (
                                <img src={event.eventimage} alt={event.name} className="w-full h-full object-cover" />
                            )}
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button onClick={() => handleOpenModal(event)} className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700">
                                    <Edit size={16} />
                                </button>
                                <button onClick={() => handleDelete(event.id)} className="p-2 bg-red-600 rounded-full text-white hover:bg-red-700">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{event.name}</h3>
                            <div className="flex items-center text-gray-400 text-sm mb-4">
                                <Calendar size={16} className="mr-2" />
                                {event.startdate?.toDate().toLocaleDateString()}
                            </div>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{event.description}</p>
                            <div className="mt-auto flex justify-between items-center">
                                <span className={`px-2 py-1 rounded text-xs ${event.registrationopen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {event.registrationopen ? 'Registration Open' : 'Closed'}
                                </span>
                                <span className="text-xs text-gray-500">{event.eventtype}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-gray-800 rounded-xl max-w-2xl w-full p-6 relative my-8">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold text-white mb-6">
                            {editingEvent ? 'Edit Event' : 'Create New Event'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-1">Event Name</label>
                                <input required className="w-full bg-gray-700 text-white rounded p-2" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-1">Description</label>
                                <textarea required className="w-full bg-gray-700 text-white rounded p-2 h-24" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 mb-1">Start Date</label>
                                    <input type="datetime-local" required className="w-full bg-gray-700 text-white rounded p-2" value={formData.startdate} onChange={e => setFormData({ ...formData, startdate: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-1">End Date</label>
                                    <input type="datetime-local" required className="w-full bg-gray-700 text-white rounded p-2" value={formData.enddate} onChange={e => setFormData({ ...formData, enddate: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-1">Image URL</label>
                                <input className="w-full bg-gray-700 text-white rounded p-2" value={formData.eventimage} onChange={e => setFormData({ ...formData, eventimage: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-1">Location</label>
                                <input className="w-full bg-gray-700 text-white rounded p-2" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                            </div>
                            <div className="flex gap-6">
                                <label className="flex items-center text-gray-300">
                                    <input type="checkbox" className="mr-2" checked={formData.registrationopen} onChange={e => setFormData({ ...formData, registrationopen: e.target.checked })} />
                                    Registration Open
                                </label>
                                <label className="flex items-center text-gray-300">
                                    <input type="checkbox" className="mr-2" checked={formData.statuscode === 1} onChange={e => setFormData({ ...formData, statuscode: e.target.checked ? 1 : 0 })} />
                                    Active
                                </label>
                            </div>
                            <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded hover:bg-orange-600 mt-4">
                                Save Event
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminEvents;
