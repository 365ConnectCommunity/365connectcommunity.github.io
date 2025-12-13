import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/apiService';
import { getTempUserData, promoteTempUserData } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const LoginVerify = () => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sendingCode, setSendingCode] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const tempUser = getTempUserData();

    useEffect(() => {
        // If no temp user data, redirect to login
        if (!tempUser || !tempUser.email || tempUser.email === 'null') {
            navigate('/login');
            return;
        }

        // Automatically send verification code on mount
        sendVerificationCode();
    }, []);

    const sendVerificationCode = async () => {
        if (!tempUser || !tempUser.email) return;

        setSendingCode(true);
        setError(''); // Clear any previous errors
        setCodeSent(false); // Reset code sent state
        try {
            await authAPI.sendVerificationCode(tempUser.email);
            setCodeSent(true);
            setError(''); // Ensure error is cleared on success
        } catch (err) {
            setError('Failed to send verification code. Please try again.');
            setCodeSent(false);
        } finally {
            setSendingCode(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!code) {
            setError('Please enter the verification code');
            return;
        }

        setLoading(true);

        try {
            await authAPI.verifyCode(tempUser.email, code);

            // Verification successful - promote temp user data to permanent
            promoteTempUserData();

            // Update auth context
            login(tempUser);

            // Redirect to profile
            navigate('/my-profile');
        } catch (err) {
            setError('Invalid verification code. Please check your email and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = () => {
        setCode('');
        setError('');
        sendVerificationCode();
    };

    if (!tempUser || !tempUser.email || tempUser.email === 'null') {
        return null; // Will redirect via useEffect
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
                        <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
                        <p className="text-gray-400 mb-8">
                            We've sent a verification code to <strong className="text-orange-500">{tempUser.email}</strong>.
                            Please enter it below to complete your sign-in.
                        </p>

                        {codeSent && !error && (
                            <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded mb-4">
                                Verification code sent! Check your email.
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}

                        {sendingCode && (
                            <div className="bg-blue-500/10 border border-blue-500 text-blue-500 px-4 py-3 rounded mb-4">
                                Sending verification code...
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="code" className="block text-gray-300 mb-2">
                                    Verification Code
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-center text-2xl tracking-widest focus:outline-none focus:border-orange-500"
                                    placeholder="000000"
                                    maxLength="6"
                                    disabled={loading || sendingCode}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || sendingCode}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                            >
                                {loading ? 'Verifying...' : 'Verify & Sign In'}
                            </button>

                            <button
                                type="button"
                                onClick={handleResendCode}
                                disabled={sendingCode || loading}
                                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {sendingCode ? 'Sending...' : 'Resend Code'}
                            </button>
                        </form>

                        <p className="text-gray-400 mt-6 text-center">
                            Wrong email?{' '}
                            <a href="/login" className="text-orange-500 hover:text-orange-400">
                                Go Back
                            </a>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginVerify;
