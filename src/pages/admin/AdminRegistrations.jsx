import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { Download } from 'lucide-react';

const AdminRegistrations = () => {
    const [registrations, setRegistrations] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState('all');

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        const eventsSnap = await getDocs(query(collection(db, 'events'), orderBy('startdate', 'desc')));
        setEvents(eventsSnap.docs.map(d => ({ id: d.id, name: d.data().name })));

        // Fetch all registrations initially
        fetchRegistrations();
    };

    const fetchRegistrations = async (eventId = 'all') => {
        let q;
        if (eventId === 'all') {
            q = query(collection(db, 'registrations'), orderBy('registrationDate', 'desc'));
        } else {
            q = query(collection(db, 'registrations'), where('eventid', '==', eventId), orderBy('registrationDate', 'desc'));
        }

        const snapshot = await getDocs(q);
        setRegistrations(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    const handleFilterChange = (e) => {
        const val = e.target.value;
        setSelectedEventId(val);
        fetchRegistrations(val);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Event Registrations</h1>
                {/* Export button could go here */}
            </div>

            <div className="mb-6">
                <select
                    className="bg-gray-800 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none"
                    value={selectedEventId}
                    onChange={handleFilterChange}
                >
                    <option value="all">All Events</option>
                    {events.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-700">
                    <span className="text-gray-400">Total Count: {registrations.length}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-750 text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Event ID</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {registrations.map(reg => (
                                <tr key={reg.id} className="hover:bg-gray-750 text-gray-300">
                                    <td className="px-6 py-4">{reg.name}</td>
                                    <td className="px-6 py-4">{reg.email}</td>
                                    <td className="px-6 py-4 text-xs font-mono">{reg.eventid}</td>
                                    <td className="px-6 py-4">{reg.registrationDate?.toDate ? reg.registrationDate.toDate().toLocaleString() : reg.registrationDate}</td>
                                    <td className="px-6 py-4">{reg.status || 'Registered'}</td>
                                </tr>
                            ))}
                            {registrations.length === 0 && (
                                <tr><td colSpan="5" className="p-8 text-center text-gray-500">No registrations found</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminRegistrations;
