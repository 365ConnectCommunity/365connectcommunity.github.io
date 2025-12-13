import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Calendar, User } from 'lucide-react';
import SEO from '../components/SEO';

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Fetch from Blogger public JSON feed
                const response = await fetch('https://shaheer365.blogspot.com/feeds/posts/default?alt=json');
                const data = await response.json();

                if (data.feed && data.feed.entry) {
                    setPosts(data.feed.entry.map(entry => {
                        const linkObj = entry.link.find(l => l.rel === 'alternate');
                        const content = entry.content ? entry.content.$t : '';
                        const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
                        const snippet = content.replace(/<[^>]+>/g, '').substring(0, 150) + '...';

                        return {
                            id: entry.id.$t,
                            title: entry.title.$t,
                            published: new Date(entry.published.$t).toLocaleDateString(),
                            author: entry.author ? entry.author[0].name.$t : 'Shaheer Ahmad',
                            url: linkObj ? linkObj.href : '#',
                            snippet: snippet,
                            image: imgMatch ? imgMatch[1] : null
                        };
                    }));
                }
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
                title="Blog"
                description="Insights, Tutorials, and Updates on Microsoft 365 and Power Platform from Shaheer Ahmad."
            />
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-black mb-6 text-white drop-shadow-lg">
                            Latest Insights
                        </h1>
                        <p className="text-xl text-gray-400">
                            Tutorials and updates from <a href="https://shaheer365.blogspot.com/" target="_blank" className="text-blue-400 hover:underline">shaheer365.blogspot.com</a>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all shadow-xl flex flex-col h-full"
                            >
                                {post.image ? (
                                    <div className="h-48 overflow-hidden">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                                    </div>
                                ) : (
                                    <div className="h-48 bg-gradient-to-r from-blue-900 to-gray-800 flex items-center justify-center">
                                        <FileText size={48} className="text-gray-600" />
                                    </div>
                                )}

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center text-xs text-gray-400 mb-3 space-x-3">
                                        <span className="flex items-center"><Calendar size={12} className="mr-1" /> {post.published}</span>
                                        <span className="flex items-center"><User size={12} className="mr-1" /> {post.author}</span>
                                    </div>

                                    <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-blue-400 transition-colors">
                                        <a href={post.url} target="_blank" rel="noopener noreferrer">{post.title}</a>
                                    </h2>

                                    <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3">
                                        {post.snippet}
                                    </p>

                                    <a
                                        href={post.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-400 font-bold hover:text-blue-300 transition-colors mt-auto"
                                    >
                                        Read Article <ExternalLink size={16} className="ml-2" />
                                    </a>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Blog;
