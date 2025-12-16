import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, query, orderBy, where, doc, updateDoc, addDoc, Timestamp } from 'firebase/firestore';
import { Download, Award } from 'lucide-react';

const AdminRegistrations = () => {
    const [registrations, setRegistrations] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'pending', 'present', 'absent'
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        const eventsSnap = await getDocs(query(collection(db, 'events'), orderBy('startdate', 'desc')));
        setEvents(eventsSnap.docs.map(d => ({ id: d.id, name: d.data().name })));
        fetchRegistrations();
    };

    const fetchRegistrations = async (eventId = selectedEventId) => {
        setLoading(true);
        let q;
        if (eventId === 'all') {
            q = query(collection(db, 'registrations'), orderBy('registrationDate', 'desc'));
        } else {
            q = query(collection(db, 'registrations'), where('eventid', '==', eventId), orderBy('registrationDate', 'desc'));
        }

        const snapshot = await getDocs(q);
        setRegistrations(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
    };

    const handleFilterChange = (e) => {
        const val = e.target.value;
        setSelectedEventId(val);
        setSelectedIds(new Set()); // Clear selection on context change
        fetchRegistrations(val);
    };

    const toggleSelection = (id) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const toggleAll = () => {
        if (selectedIds.size === filteredRegistrations.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredRegistrations.map(r => r.id)));
        }
    };

    const updateAttendance = async (status) => {
        if (selectedIds.size === 0) return;
        if (!window.confirm(`Mark ${selectedIds.size} users as ${status}?`)) return;

        setLoading(true);
        try {
            // Firestore transactions or batched writes would be better for distinct docs, 
            // but loop is fine for moderate size.
            const promises = Array.from(selectedIds).map(id =>
                updateDoc(doc(db, 'registrations', id), { status: status })
            );
            await Promise.all(promises);

            // Local update
            setRegistrations(prev => prev.map(r => selectedIds.has(r.id) ? { ...r, status } : r));
            setSelectedIds(new Set()); // Clear selection
            alert(`Drafted ${selectedIds.size} users marked as ${status}`);
        } catch (error) {
            console.error("Error updating attendance:", error);
            alert("Failed to update attendance.");
        } finally {
            setLoading(false);
        }
    };

    const issueCertificates = async () => {
        if (selectedIds.size === 0) return;
        const targets = filteredRegistrations.filter(r => selectedIds.has(r.id));

        // Validation: Can only issue to 'present'
        const invalid = targets.filter(r => r.status !== 'present');
        if (invalid.length > 0) {
            alert(`Cannot issue certificates to ${invalid.length} users who are not marked 'Present'.`);
            return;
        }

        if (!window.confirm(`Issue certificates to ${targets.length} users?`)) return;

        setLoading(true);
        try {
            const promises = targets.map(r => addDoc(collection(db, 'certificates'), {
                recipientname: r.name,
                email: r.email,
                eventname: events.find(e => e.id === r.eventid)?.name || 'Event',
                eventid: r.eventid,
                issueddate: Timestamp.now(),
                uid: r.userid || null, // If linked
                certificateurl: `https://365connectcommunity.github.io/certificate/view` // Placeholder base URL
            }));

            await Promise.all(promises);
            alert(`Successfully issued ${targets.length} certificates!`);
            setSelectedIds(new Set());
        } catch (e) {
            console.error(e);
            alert("Failed to issue certificates");
        } finally {
            setLoading(false);
        }
    };

    const filteredRegistrations = registrations.filter(r => {
        if (filterStatus === 'all') return true;
        // if status is missing, treat as 'pending'
        const status = r.status || 'pending';
        return status === filterStatus;
    });

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-white">Event Registrations</h1>
                <div className="flex gap-2">
                    <select
                        className="bg-gray-800 text-white border border-gray-700 rounded px-4 py-2 focus:outline-none"
                        value={selectedEventId}
                        onChange={handleFilterChange}
                    >
                        <option value="all">All Events</option>
                        {events.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
                </div>
            </div>

            {/* Attendance Tabs */}
            <div className="flex space-x-1 bg-gray-800 w-fit rounded p-1 mb-6 border border-gray-700">
                {['all', 'pending', 'present', 'absent'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded text-sm font-medium capitalize transition-colors ${filterStatus === status
                            ? 'bg-gray-700 text-white shadow'
                            : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Bulk Actions */}
            {selectedIds.size > 0 && (
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-6 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                    <span className="text-orange-200 font-medium">{selectedIds.size} users selected</span>
                    <div className="flex gap-2">
                        <button onClick={() => updateAttendance('present')} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors">
                            Mark Present
                        </button>
                        <button onClick={() => updateAttendance('absent')} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors">
                            Mark Absent
                        </button>
                        <button onClick={issueCertificates} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors flex items-center gap-2">
                            <Award size={16} /> Issue Certificates
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-750 text-gray-400 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-3 w-10">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-600 bg-gray-700 text-orange-500 focus:ring-orange-500"
                                        checked={filteredRegistrations.length > 0 && selectedIds.size === filteredRegistrations.length}
                                        onChange={toggleAll}
                                    />
                                </th>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Event ID</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredRegistrations.map(reg => (
                                <tr key={reg.id} className={`hover:bg-gray-750 text-gray-300 ${selectedIds.has(reg.id) ? 'bg-gray-700/30' : ''}`}>
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-600 bg-gray-700 text-orange-500 focus:ring-orange-500"
                                            checked={selectedIds.has(reg.id)}
                                            onChange={() => toggleSelection(reg.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white">{reg.name}</div>
                                        <div className="text-xs text-gray-500">{reg.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-mono">{reg.eventid}</td>
                                    <td className="px-6 py-4">{reg.registrationDate?.toDate ? reg.registrationDate.toDate().toLocaleString() : reg.registrationDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${(reg.status || 'pending') === 'present' ? 'bg-green-100 text-green-800' :
                                                (reg.status === 'absent' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800')}`}>
                                            {reg.status || 'pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filteredRegistrations.length === 0 && (
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
