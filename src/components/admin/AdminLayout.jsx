import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    Users,
    Award,
    Briefcase,
    Settings,
    LogOut,
    Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoNew from '../../assets/images/logo-final.png';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Events', path: '/admin/events', icon: Calendar },
        { name: 'Registrations', path: '/admin/registrations', icon: Users },
        { name: 'Certificates', path: '/admin/certificates', icon: Award },
        { name: 'Users', path: '/admin/users', icon: Users },
        { name: 'Team Members', path: '/admin/team', icon: Briefcase },
    ];

    return (
        <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
                <div className="p-6 flex items-center space-x-3 border-b border-gray-700">
                    <img src={logoNew} alt="Logo" className="h-8 rounded-full" />
                    <span className="font-bold text-lg">Admin Portal</span>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));

                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center px-4 py-3 rounded-lg transition-colors group ${isActive
                                                ? 'bg-orange-600 text-white'
                                                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                            }`}
                                    >
                                        <Icon size={20} className={`mr-3 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                                        <span className="font-medium">{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-700 space-y-2">
                    <Link
                        to="/"
                        className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
                    >
                        <Home size={20} className="mr-3" />
                        <span>Return to Site</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors"
                    >
                        <LogOut size={20} className="mr-3" />
                        <span>Sign Out</span>
                    </button>

                    <div className="mt-4 flex items-center px-2">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-sm font-bold mr-3 object-cover overflow-hidden">
                            {user?.image ? (
                                <img src={user.image.startsWith('http') ? user.image : `data:image/png;base64,${user.image}`} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span>{user?.name?.[0] || 'A'}</span>
                            )}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-gray-900">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
