import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/apiService';
import { motion } from 'framer-motion';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.firstname) {
            setError('First Name is required');
            return;
        }
        if (!formData.lastname) {
            setError('Last Name is required');
            return;
        }
        if (!formData.email) {
            setError('Email is required');
            return;
        }
        if (!formData.password || formData.password.length < 6) {
            setError('Password is required (min 6 characters)');
            return;
        }

        setLoading(true);

        try {
            await authAPI.signup(
                formData.firstname,
                formData.lastname,
                formData.email,
                formData.password,
                formData.phone
            );

            setSuccess(true);
            setError('');
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError('Email is already registered.');
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-2xl p-8"
                    >
                        <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded mb-4">
                            You have been registered successfully! You can now login.
                        </div>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                        >
                            Go to Sign In
                        </button>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md mx-auto"
                >
                    <div className="bg-gray-800 rounded-lg shadow-2xl p-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Sign Up</h1>
                        <p className="text-gray-400 mb-8">
                            Register your free account and get immediate access.
                        </p>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="firstname" className="block text-gray-300 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="John"
                                    disabled={loading}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="lastname" className="block text-gray-300 mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="Doe"
                                    disabled={loading}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="your@email.com"
                                    disabled={loading}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-300 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="Minimum 6 characters"
                                    disabled={loading}
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="phone" className="block text-gray-300 mb-2">
                                    Phone Number (Optional)
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="+1 234 567 8900"
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating account...' : 'Register'}
                            </button>
                        </form>

                        <p className="text-gray-400 mt-6 text-center">
                            Already have an account?{' '}
                            <a href="/login" className="text-orange-500 hover:text-orange-400">
                                Sign In Here
                            </a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
