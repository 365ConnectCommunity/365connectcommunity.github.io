import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, getCountFromServer } from 'firebase/firestore';
import { Users, Calendar, Award, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        events: 0,
        registrations: 0,
        certificates: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const usersSnap = await getCountFromServer(collection(db, 'users'));
                const eventsSnap = await getCountFromServer(collection(db, 'events'));
                const regSnap = await getCountFromServer(collection(db, 'registrations'));
                const certSnap = await getCountFromServer(collection(db, 'certificates'));

                setStats({
                    users: usersSnap.data().count,
                    events: eventsSnap.data().count,
                    registrations: regSnap.data().count,
                    certificates: certSnap.data().count
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { title: 'Total Users', value: stats.users, icon: Users, color: 'bg-blue-500' },
        { title: 'Total Events', value: stats.events, icon: Calendar, color: 'bg-green-500' },
        { title: 'Total Registrations', value: stats.registrations, icon: UserCheck, color: 'bg-purple-500' },
        { title: 'Issued Certificates', value: stats.certificates, icon: Award, color: 'bg-orange-500' },
    ];

    if (loading) {
        return <div className="text-white">Loading dashboard...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.color} bg-opacity-20`}>
                                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                        </div>
                        <h3 className="text-gray-400 text-sm font-medium">{stat.title}</h3>
                        <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 bg-gray-800 rounded-xl p-8 border border-gray-700 text-center">
                <h2 className="text-xl font-semibold text-white mb-2">Welcome to the Admin Portal</h2>
                <p className="text-gray-400">Select a module from the sidebar to manage content.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
