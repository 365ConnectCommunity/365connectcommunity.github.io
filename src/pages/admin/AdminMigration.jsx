import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Users, Calendar, Award, Share2, CheckCircle, AlertCircle, Loader, FileText } from 'lucide-react';
import { migrateTeam, migrateEvents, migrateUsersAndUserData, migrateSocials, migrateCertificates, migrateRegistrations } from '../../services/migrationService';



import { db } from '../../services/firebase';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminMigration = () => {
    const { user } = useAuth();

    // Strict Security Check: Only Super Admin allowed
    if (user?.email !== 'mianshaheerahmed@gmail.com') {
        return <Navigate to="/admin" replace />;
    }
    const [status, setStatus] = useState({
        users: 'idle',
        events: 'idle',
        team: 'idle',
        socials: 'idle',
        certs: 'idle',
        regs: 'idle'
    });

    const [progress, setProgress] = useState({
        users: '',
        events: '',
        team: '',
        socials: '',
        certs: '',
        regs: ''
    });

    const handleMigration = async (type, migrateFn) => {
        setStatus(prev => ({ ...prev, [type]: 'loading' }));
        setProgress(prev => ({ ...prev, [type]: 'Starting...' }));

        try {
            const result = await migrateFn((msg) => {
                setProgress(prev => ({ ...prev, [type]: msg }));
            });

            setStatus(prev => ({ ...prev, [type]: 'completed' }));
            setProgress(prev => ({ ...prev, [type]: `Done! ${result.count || ''} records migrated.` }));
        } catch (error) {
            console.error(error);
            setStatus(prev => ({ ...prev, [type]: 'error' }));
            setProgress(prev => ({ ...prev, [type]: `Error: ${error.message}` }));
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Data Migration</h1>
                    <p className="text-gray-400">Import data from legacy Azure Logic Apps to Firestore</p>
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-700/50 border-b border-gray-700">
                            <th className="px-6 py-4 font-bold text-gray-300 uppercase text-xs tracking-wider">Migration Task</th>
                            <th className="px-6 py-4 font-bold text-gray-300 uppercase text-xs tracking-wider">Status</th>
                            <th className="px-6 py-4 font-bold text-gray-300 uppercase text-xs tracking-wider">Progress</th>
                            <th className="px-6 py-4 font-bold text-gray-300 uppercase text-xs tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {[
                            { id: 'users', title: 'Users & Profiles', icon: Users, fn: migrateUsersAndUserData },
                            { id: 'events', title: 'Events', icon: Calendar, fn: migrateEvents },
                            { id: 'team', title: 'Team Members', icon: Users, fn: migrateTeam },
                            { id: 'socials', title: 'Social Links', icon: Share2, fn: migrateSocials },
                            { id: 'certs', title: 'Certificates', icon: Award, fn: migrateCertificates },
                            { id: 'regs', title: 'Registrations', icon: FileText, fn: migrateRegistrations }
                        ].map((item) => (
                            <tr key={item.id} className="hover:bg-gray-750 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                            <item.icon className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <span className="font-semibold text-white">{item.title}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        {status[item.id] === 'completed' && <><CheckCircle className="w-4 h-4 text-green-500" /> <span className="text-green-500 text-sm">Completed</span></>}
                                        {status[item.id] === 'error' && <><AlertCircle className="w-4 h-4 text-red-500" /> <span className="text-red-500 text-sm">Failed</span></>}
                                        {status[item.id] === 'loading' && <><Loader className="w-4 h-4 text-blue-500 animate-spin" /> <span className="text-blue-500 text-sm">Running...</span></>}
                                        {status[item.id] === 'idle' && <span className="text-gray-500 text-sm">Idle</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-400 text-sm font-mono">{progress[item.id] || '-'}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleMigration(item.id, item.fn)}
                                        disabled={status[item.id] === 'loading'}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${status[item.id] === 'loading'
                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'
                                            }`}
                                    >
                                        {status[item.id] === 'loading' ? 'Processing...' : status[item.id] === 'completed' ? 'Re-Run' : 'Run'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mt-8">
                <h4 className="text-yellow-500 font-bold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Important Note
                </h4>
                <p className="text-gray-400 text-sm">
                    Migrations are idempotent where possible (using deterministic IDs), but running them multiple times may overwrite newer data if not careful.
                    The "Users" migration currently attempts to fetch the public directory. Private data migration (Certificates/Registrations) depends on the availability of email addresses in the source data.
                </p>
            </div>
        </div>
    );
};

export default AdminMigration;
