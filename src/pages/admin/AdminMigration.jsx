import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Users, Calendar, Award, Share2, CheckCircle, AlertCircle, Loader, FileText } from 'lucide-react';
import { migrateTeam, migrateEvents, migrateUsersAndUserData, migrateSocials, migrateCertificates, migrateRegistrations } from '../../services/migrationService';

const MigrationCard = ({ title, icon: Icon, onMigrate, status, progress }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg"
    >
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            {status === 'completed' && <CheckCircle className="w-6 h-6 text-green-500" />}
            {status === 'error' && <AlertCircle className="w-6 h-6 text-red-500" />}
            {status === 'loading' && <Loader className="w-6 h-6 text-blue-500 animate-spin" />}
        </div>

        <div className="mb-4 h-16 overflow-y-auto">
            <p className="text-gray-400 text-sm">{progress || 'Ready to migrate'}</p>
        </div>

        <button
            onClick={onMigrate}
            disabled={status === 'loading' || status === 'completed'}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${status === 'completed'
                ? 'bg-green-500/20 text-green-400 cursor-default'
                : status === 'loading'
                    ? 'bg-gray-700 text-gray-400 cursor-wait'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
                }`}
        >
            {status === 'completed' ? 'Migration Complete' : status === 'loading' ? 'Migrating...' : 'Start Migration'}
        </button>
    </motion.div>
);

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MigrationCard
                    title="Users & Profiles"
                    icon={Users}
                    status={status.users}
                    progress={progress.users}
                    onMigrate={() => handleMigration('users', migrateUsersAndUserData)}
                />

                <MigrationCard
                    title="Events"
                    icon={Calendar}
                    status={status.events}
                    progress={progress.events}
                    onMigrate={() => handleMigration('events', migrateEvents)}
                />

                <MigrationCard
                    title="Team Members"
                    icon={Users}
                    status={status.team}
                    progress={progress.team}
                    onMigrate={() => handleMigration('team', migrateTeam)}
                />

                <MigrationCard
                    title="Social Links"
                    icon={Share2}
                    status={status.socials}
                    progress={progress.socials}
                    onMigrate={() => handleMigration('socials', migrateSocials)}
                />

                <MigrationCard
                    title="Certificates"
                    icon={Award}
                    status={status.certs}
                    progress={progress.certs}
                    onMigrate={() => handleMigration('certs', migrateCertificates)}
                />

                <MigrationCard
                    title="Registrations"
                    icon={FileText}
                    status={status.regs}
                    progress={progress.regs}
                    onMigrate={() => handleMigration('regs', migrateRegistrations)}
                />
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
