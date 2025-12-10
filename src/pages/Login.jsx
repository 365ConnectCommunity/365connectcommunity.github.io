import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/apiService';
import { saveTempUserData } from '../services/authService';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Email is required');
            return;
        }

        setLoading(true);

        try {
            const userData = await authAPI.login(email);

            // Save temporary user data for verification flow
            saveTempUserData(userData);

            // Redirect to verification page
            navigate('/login-verify');
        } catch (err) {
            setError('Account not found. Please check your email or sign up.');
        } finally {
            setLoading(false);
        }
    };

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
                        <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
                        <p className="text-gray-400 mb-8">
                            Sign in to your free account and get immediate access to your registrations and certifications.
                        </p>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="your@email.com"
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Please wait...' : 'Continue with Email'}
                            </button>
                        </form>

                        <p className="text-gray-400 mt-6 text-center">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-orange-500 hover:text-orange-400">
                                Sign Up Here
                            </a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
