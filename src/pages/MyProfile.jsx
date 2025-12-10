import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/apiService';
import { User, Mail, Phone, Trash2, Save } from 'lucide-react';

const MyProfile = () => {
    const { user, updateUser, logout } = useAuth();
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        email: user?.email || '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            await userAPI.updateProfile(formData);
            updateUser(formData);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setEditing(false);
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to update profile' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return;
        }

        setLoading(true);
        try {
            await userAPI.deleteAccount(user.email);
            logout();
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to delete account' });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                            My Profile
                        </h1>
                        {!editing && (
                            <button
                                onClick={() => setEditing(true)}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>

                    {message.text && (
                        <div className={`mb-6 px-4 py-3 rounded-lg ${message.type === 'success'
                                ? 'bg-green-500/10 border border-green-500 text-green-500'
                                : 'bg-red-500/10 border border-red-500 text-red-500'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    <div className="flex items-center mb-8">
                        <img
                            src={`data:image/png;base64,${user?.image}` || '/assets/images/icons8-account-64.png'}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-orange-500 mr-6"
                        />
                        <div>
                            <h2 className="text-2xl font-bold text-white">{user?.name}</h2>
                            <p className="text-gray-400">{user?.email}</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-300 mb-2">
                                        <User size={16} className="inline mr-2" />
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-orange-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2">
                                        <User size={16} className="inline mr-2" />
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                        disabled={!editing}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">
                                    <Mail size={16} className="inline mr-2" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white opacity-50"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">
                                    <Phone size={16} className="inline mr-2" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={!editing}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-orange-500"
                                />
                            </div>
                        </div>

                        {editing && (
                            <div className="flex space-x-4 mt-8">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 flex items-center justify-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <Save size={20} className="mr-2" />
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditing(false);
                                        setFormData({
                                            firstname: user?.firstname || '',
                                            lastname: user?.lastname || '',
                                            email: user?.email || '',
                                            phone: ''
                                        });
                                    }}
                                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </form>

                    <div className="mt-12 pt-8 border-t border-gray-700">
                        <h3 className="text-xl font-bold text-white mb-4">Danger Zone</h3>
                        <button
                            onClick={handleDeleteAccount}
                            disabled={loading}
                            className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
                        >
                            <Trash2 size={20} className="mr-2" />
                            Delete Account
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MyProfile;
