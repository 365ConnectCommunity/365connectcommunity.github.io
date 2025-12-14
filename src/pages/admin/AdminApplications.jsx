import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, updateDoc, doc, getDoc, setDoc, deleteDoc, query, where } from 'firebase/firestore';
import { Check, X, ExternalLink, UserCheck } from 'lucide-react';

const AdminApplications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        const q = query(collection(db, 'contributor_applications'), where('status', '==', 'pending'));
        const snapshot = await getDocs(q);
        setApplications(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    const handleApprove = async (app) => {
        if (!window.confirm(`Approve ${app.name} as a contributor?`)) return;

        try {
            // 1. Update Application Status
            await updateDoc(doc(db, 'contributor_applications', app.id), { status: 'approved' });

            // 2. Update User Role (if UID exists)
            if (app.uid) {
                const userRef = doc(db, 'users', app.uid);
                await updateDoc(userRef, { role: 'contributor' });
            } else {
                // If application was submitted without login (unlikely given current flow, but safe to handle), 
                // we might need to invite them. For now, assume UID is present.
                console.warn("No UID found for application", app.id);
            }

            // 3. Add to Team Members collection (Optional, but requested "manually approve team members")
            // We can add them as a team member entry
            await setDoc(doc(collection(db, 'team_members')), {
                firstname: app.name.split(' ')[0],
                lastname: app.name.split(' ').slice(1).join(' '),
                designation: 'Contributor',
                imageurl: '',
                linkedin: app.portfolio,
                email: app.email,
                order: 99
            });

            fetchApplications();
        } catch (error) {
            console.error("Error approving application:", error);
            alert("Error approving application");
        }
    };

    const handleReject = async (appId) => {
        if (!window.confirm("Reject this application?")) return;
        try {
            await updateDoc(doc(db, 'contributor_applications', appId), { status: 'rejected' });
            fetchApplications();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Contributor Applications</h1>

            <div className="grid gap-6">
                {applications.map(app => (
                    <div key={app.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">{app.name}</h3>
                            <a href={`mailto:${app.email}`} className="text-blue-400 hover:text-blue-300 text-sm block mb-2">{app.email}</a>
                            <p className="text-gray-300 text-sm mb-2"><span className="font-bold text-gray-500">Reason:</span> {app.reason}</p>
                            {app.portfolio && (
                                <a href={app.portfolio} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-orange-400 text-sm hover:underline">
                                    <ExternalLink size={14} className="mr-1" /> View Portfolio
                                </a>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleApprove(app)}
                                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg flex items-center font-medium"
                            >
                                <Check size={18} className="mr-2" /> Approve
                            </button>
                            <button
                                onClick={() => handleReject(app.id)}
                                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg flex items-center font-medium"
                            >
                                <X size={18} className="mr-2" /> Reject
                            </button>
                        </div>
                    </div>
                ))}

                {applications.length === 0 && (
                    <div className="text-center py-12 text-gray-500 bg-gray-800/50 rounded-xl border border-dashed border-gray-700">
                        <UserCheck size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No pending applications</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminApplications;
