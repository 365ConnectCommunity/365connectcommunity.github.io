import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Award, UserPlus, FileText, ArrowLeft, Menu, X, Briefcase, Database } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = React.useState(window.innerWidth >= 768);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // DEBUG: Check user object
    console.log("AdminLayout User:", user);

    const safeEmail = user?.email?.toLowerCase()?.trim();
    const isSuperAdmin = safeEmail === 'mianshaheerahmed@gmail.com' || user?.role === 'admin';
    const isContributor = user?.role === 'contributor';

    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, allowContributor: true },
        { name: 'Users', path: '/admin/users', icon: Users, allowContributor: false }, // Restricted
        { name: 'Migration', path: '/admin/migration', icon: Database, allowContributor: false, allowSuperAdmin: true }, // Super Admin Only
        { name: 'Events', path: '/admin/events', icon: Calendar, allowContributor: true },
        { name: 'Blogs', path: '/admin/blogs', icon: FileText, allowContributor: true },
        { name: 'Registrations', path: '/admin/registrations', icon: UserPlus, allowContributor: true },
        { name: 'Certificates', path: '/admin/certificates', icon: Award, allowContributor: true },
        { name: 'Team', path: '/admin/team', icon: Briefcase, allowContributor: false }, // Restricted
        { name: 'Applications', path: '/admin/applications', icon: FileText, allowContributor: false }, // Restricted
    ];

    return (
        <div className="h-screen overflow-hidden bg-gray-900 flex text-white font-sans">
            {/* Mobile Backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <AnimatePresence mode='wait'>
                {sidebarOpen && (
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 280, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="bg-gray-800 border-r border-gray-700 flex-shrink-0 flex flex-col fixed inset-y-0 left-0 z-50 md:relative min-h-screen"
                    >
                        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">Admin Portal</span>
                            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <nav className="flex-1 overflow-y-auto py-4">
                            {menuItems.map((item) => {
                                // RBAC check: if item not for contributor and user is contributor (and not super admin), hide it
                                if (!isSuperAdmin && isContributor && !item.allowContributor) return null;
                                // Super Admin check: if item requires super admin and user is not super admin, hide it
                                if (item.allowSuperAdmin && !isSuperAdmin) return null;

                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center px-6 py-3.5 mb-1 transition-all relative ${isActive ? 'text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                        onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-r"
                                            />
                                        )}
                                        <item.icon size={20} className={`mr-3 ${isActive ? 'text-orange-400' : ''}`} />
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                )
                            })}
                        </nav>

                        <div className="p-4 border-t border-gray-700">
                            <div className="flex items-center gap-3 bg-gray-900/50 p-3 rounded-lg mb-3">
                                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-lg">
                                    {user?.name?.[0] || 'A'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold truncate">{user?.name}</p>
                                    <p className="text-xs text-gray-400 truncate capitalize">{isSuperAdmin ? 'Super Admin' : (user?.role || 'User')}</p>
                                </div>
                            </div>
                            <Link to="/" className="flex items-center justify-center w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm font-medium">
                                <ArrowLeft size={16} className="mr-2" /> Return to Site
                            </Link>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Mobile Header */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-gray-800 border-b border-gray-700 h-16 flex items-center justify-between px-4 md:hidden">
                    <span className="font-bold text-lg">Admin Portal</span>
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
                        {sidebarOpen ? <X /> : <Menu />}
                    </button>
                </header>

                {/* Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
