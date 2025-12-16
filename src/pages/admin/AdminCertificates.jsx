import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, Timestamp, query, orderBy } from 'firebase/firestore';
import { Award, Plus, Trash2, Search, X, Eye } from 'lucide-react';

const AdminCertificates = () => {
    const [certificates, setCertificates] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        recipientname: '',
        email: '',
        eventname: '',
        certificateurl: '', // This would typically be an upload, but text for now
        issueddate: '',
        description: 'Successfully completed the workshop'
    });

    const [filterEvent, setFilterEvent] = useState('All');

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        const q = query(collection(db, 'certificates'), orderBy('issueddate', 'desc'));
        const snapshot = await getDocs(q);
        setCertificates(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    const uniqueEvents = ['All', ...new Set(certificates.map(c => c.eventname))];
    const filteredCertificates = filterEvent === 'All'
        ? certificates
        : certificates.filter(c => c.eventname === filterEvent);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'certificates'), {
                ...formData,
                issueddate: Timestamp.fromDate(new Date(formData.issueddate)),
            });
            setIsModalOpen(false);
            fetchCertificates();
        } catch (error) {
            console.error("Error issuing certificate:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Revoke this certificate?")) {
            await deleteDoc(doc(db, 'certificates', id));
            fetchCertificates();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Certificates</h1>
                <div className="flex gap-4">
                    <select
                        value={filterEvent}
                        onChange={(e) => setFilterEvent(e.target.value)}
                        className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    >
                        {uniqueEvents.map(event => (
                            <option key={event} value={event}>{event}</option>
                        ))}
                    </select>
                    <button onClick={() => setIsModalOpen(true)} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Plus size={20} /> Issue Certificate
                    </button>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-750 text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">Recipient</th>
                            <th className="px-6 py-3">Event</th>
                            <th className="px-6 py-3">Issued Date</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {filteredCertificates.map((cert) => (
                            <tr key={cert.id} className="text-gray-300 hover:bg-gray-750">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-white">{cert.recipientname}</div>
                                    <div className="text-xs text-gray-500">{cert.email}</div>
                                </td>
                                <td className="px-6 py-4">{cert.eventname}</td>
                                <td className="px-6 py-4">{cert.issueddate?.toDate().toLocaleDateString()}</td>
                                <td className="px-6 py-4 flex gap-3">
                                    <a href={`/certificate/${cert.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                                        <Eye size={16} />
                                    </a>
                                    <button onClick={() => handleDelete(cert.id)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-xl max-w-lg w-full p-6 relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
                        <h2 className="text-2xl font-bold text-white mb-6">Issue Certificate</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input placeholder="Recipient Name" required className="w-full bg-gray-700 text-white rounded p-2" value={formData.recipientname} onChange={e => setFormData({ ...formData, recipientname: e.target.value })} />
                            <input placeholder="Recipient Email" type="email" required className="w-full bg-gray-700 text-white rounded p-2" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            <input placeholder="Event Name" required className="w-full bg-gray-700 text-white rounded p-2" value={formData.eventname} onChange={e => setFormData({ ...formData, eventname: e.target.value })} />
                            <input placeholder="Certificate Image/PDF URL" required className="w-full bg-gray-700 text-white rounded p-2" value={formData.certificateurl} onChange={e => setFormData({ ...formData, certificateurl: e.target.value })} />
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Issue Date</label>
                                <input type="date" required className="w-full bg-gray-700 text-white rounded p-2" value={formData.issueddate} onChange={e => setFormData({ ...formData, issueddate: e.target.value })} />
                            </div>
                            <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded hover:bg-orange-600 mt-2">Issue</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCertificates;
