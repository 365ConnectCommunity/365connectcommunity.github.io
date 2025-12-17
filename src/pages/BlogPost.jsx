import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogsAPI } from '../services/apiService';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const BlogPost = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBlog();
    }, [id]);

    const loadBlog = async () => {
        try {
            const data = await blogsAPI.getBlogById(id);
            setBlog(data);
            if (data && data.id) {
                blogsAPI.incrementView(data.id);
            }
        } catch (error) {
            console.error("Error loading blog:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 flex items-center justify-center">
                <div className="text-white">Loading post...</div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 flex items-center justify-center">
                <div className="text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">Post not found</h2>
                    <Link to="/blog" className="text-orange-500 hover:text-orange-400">Return to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
            <SEO
                title={blog.title}
                description={blog.excerpt}
                image={blog.image}
                url={window.location.href}
                keywords={blog.tags}
            />
            {/* Header Image */}
            {blog.image && (
                <div className="w-full h-[400px] relative mb-12">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
                        <Link to="/blog" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors">
                            <ArrowLeft size={20} className="mr-2" /> Back to Blog
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight max-w-4xl">
                            {blog.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-gray-300">
                            <div className="flex items-center">
                                <User size={18} className="mr-2 text-orange-500" />
                                <span>{blog.authorName}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar size={18} className="mr-2 text-orange-500" />
                                <span>{blog.publishedAt ? new Date(blog.publishedAt.seconds * 1000).toLocaleDateString() : 'Draft'}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-400 text-sm">{blog.views || 0} views</span>
                            </div>
                            {blog.tags && blog.tags.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <Tag size={18} className="text-orange-500" />
                                    {blog.tags.map((tag, index) => (
                                        <span key={index} className="bg-gray-800 text-xs px-2 py-1 rounded-full border border-gray-700">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {!blog.image && (
                <div className="container mx-auto px-4 mb-12">
                    <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                        <ArrowLeft size={20} className="mr-2" /> Back to Blog
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {blog.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-gray-400 border-b border-gray-800 pb-8">
                        <div className="flex items-center">
                            <User size={18} className="mr-2 text-orange-500" />
                            <span>{blog.authorName}</span>
                        </div>
                        <div className="flex items-center">
                            <Calendar size={18} className="mr-2 text-orange-500" />
                            <span>{blog.publishedAt ? new Date(blog.publishedAt.seconds * 1000).toLocaleDateString() : 'Draft'}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="prose prose-invert prose-lg max-w-none"
                    >
                        {/* We are using dangerouslySetInnerHTML, assuming content is trusted or we'd need a sanitizer */}
                        <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
