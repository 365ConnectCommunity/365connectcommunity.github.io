import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Calendar, User, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogsAPI } from '../services/apiService';
import SEO from '../components/SEO';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await blogsAPI.getPublishedBlogs();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch blog posts", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-white">Loading posts...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
            <SEO
                title="Community Blog"
                description="Insights, Tutorials, and Updates from 365Connect Community."
            />
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-black mb-6 text-white drop-shadow-lg">
                            Community Insights
                        </h1>
                        <p className="text-xl text-gray-400">
                            Tutorials and updates shared by our community members.
                        </p>
                    </div>

                    {posts.length === 0 ? (
                        <div className="text-center text-gray-500 py-12">
                            <p>No posts available yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-orange-500/50 transition-all shadow-xl flex flex-col h-full"
                                >
                                    {post.image ? (
                                        <div className="h-48 overflow-hidden relative">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                            />
                                            {post.tags && post.tags.length > 0 && (
                                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                                                    {post.tags[0]}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-gradient-to-r from-orange-900 to-gray-800 flex items-center justify-center relative">
                                            <FileText size={48} className="text-gray-600" />
                                            {post.tags && post.tags.length > 0 && (
                                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                                                    {post.tags[0]}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center text-xs text-gray-400 mb-3 space-x-3">
                                            <span className="flex items-center">
                                                <Calendar size={12} className="mr-1" />
                                                {post.publishedAt ? new Date(post.publishedAt.seconds * 1000).toLocaleDateString() : 'Draft'}
                                            </span>
                                            <span className="flex items-center">
                                                <User size={12} className="mr-1" />
                                                {post.authorName}
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-orange-400 transition-colors">
                                            <Link to={`/blog/${post.id}`}>{post.title}</Link>
                                        </h2>

                                        <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <Link
                                            to={`/blog/${post.id}`}
                                            className="inline-flex items-center text-orange-400 font-bold hover:text-orange-300 transition-colors mt-auto"
                                        >
                                            Read Article <ArrowRight size={16} className="ml-2" />
                                        </Link>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Blog;
