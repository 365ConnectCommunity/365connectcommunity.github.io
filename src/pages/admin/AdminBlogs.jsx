import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { blogsAPI } from '../../services/apiService';
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Eye, Search, AlertCircle } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';

const AdminBlogs = () => {
    const { user, isAdmin } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('All');

    // Editor State
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        tags: ''
    });

    useEffect(() => {
        if (user) loadBlogs();
    }, [user, isAdmin]);

    const loadBlogs = async () => {
        setLoading(true);
        try {
            // Admins see all, Contributors see own
            const data = isAdmin
                ? await blogsAPI.getBlogs()
                : await blogsAPI.getBlogs(user.uid);
            setBlogs(data);
        } catch (error) {
            console.error("Error loading blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const blogData = {
            ...formData,
            tags: formData.tags.split(',').map(t => t.trim()),
            authorId: currentBlog ? currentBlog.authorId : user.uid,
            authorName: currentBlog ? currentBlog.authorName : (user.displayName || user.email.split('@')[0]),
        };

        try {
            if (currentBlog) {
                await blogsAPI.updateBlog(currentBlog.id, blogData);
            } else {
                await blogsAPI.createBlog(blogData);
            }
            setIsEditorOpen(false);
            loadBlogs();
            resetForm();
        } catch (error) {
            console.error("Error saving blog:", error);
            alert("Failed to save blog.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            await blogsAPI.deleteBlog(id);
            loadBlogs();
        }
    };

    const handleStatusUpdate = async (id, status) => {
        if (!isAdmin) return;
        try {
            const updates = { status };
            if (status === 'published') updates.publishedAt = Timestamp.now();

            await blogsAPI.updateBlog(id, updates);
            loadBlogs();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const openEditor = (blog = null) => {
        if (blog) {
            setCurrentBlog(blog);
            setFormData({
                title: blog.title,
                excerpt: blog.excerpt || '',
                content: blog.content,
                image: blog.image || '',
                tags: blog.tags ? blog.tags.join(', ') : ''
            });
        } else {
            resetForm();
        }
        setIsEditorOpen(true);
    };

    const resetForm = () => {
        setCurrentBlog(null);
        setFormData({ title: '', excerpt: '', content: '', image: '', tags: '' });
    };

    const filteredBlogs = filterStatus === 'All'
        ? blogs
        : blogs.filter(b => b.status === filterStatus);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Blog Management</h1>
                    <p className="text-gray-400">
                        {isAdmin ? "Manage and approve community posts" : "Write and track your articles"}
                    </p>
                </div>
                <div className="flex gap-4">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2"
                    >
                        <option value="All">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <button
                        onClick={() => openEditor()}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <Plus size={20} /> Write New Blog
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-400">Loading blogs...</div>
            ) : filteredBlogs.length === 0 ? (
                <div className="text-center py-12 bg-gray-800 rounded-xl border border-gray-700">
                    <p className="text-gray-400">No blogs found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredBlogs.map(blog => (
                        <div key={blog.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`px-2 py-1 rounded text-xs uppercase font-bold ${blog.status === 'published' ? 'bg-green-500/20 text-green-400' :
                                            blog.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                                blog.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                                    'bg-gray-500/20 text-gray-400'
                                        }`}>
                                        {blog.status}
                                    </span>
                                    <span className="text-gray-500 text-sm">
                                        {new Date(blog.createdAt.seconds * 1000).toLocaleDateString()}
                                    </span>
                                    {isAdmin && (
                                        <span className="text-gray-500 text-sm">by {blog.authorName}</span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
                                <p className="text-gray-400 line-clamp-2">{blog.excerpt}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                {isAdmin && blog.status === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => handleStatusUpdate(blog.id, 'published')}
                                            className="p-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30"
                                            title="Approve & Publish"
                                        >
                                            <CheckCircle size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(blog.id, 'rejected')}
                                            className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                                            title="Reject"
                                        >
                                            <XCircle size={20} />
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => openEditor(blog)}
                                    className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"
                                    title="Edit"
                                >
                                    <Edit2 size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    className="p-2 bg-gray-700 text-gray-400 rounded hover:text-red-400"
                                    title="Delete"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Editor Modal */}
            {isEditorOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">{currentBlog ? 'Edit Blog' : 'Write New Blog'}</h2>
                            <button onClick={() => setIsEditorOpen(false)} className="text-gray-400 hover:text-white">
                                <XCircle size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div>
                                <label className="block text-gray-400 mb-2">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2">Cover Image URL</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2">Short Excerpt</label>
                                <textarea
                                    rows="2"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none"
                                    value={formData.excerpt}
                                    onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="A brief summary for the preview card..."
                                />
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2">Content</label>
                                <textarea
                                    rows="12"
                                    required
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none font-mono"
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Write your article here..."
                                />
                                <p className="text-xs text-gray-500 mt-2">Simple text/HTML supported.</p>
                            </div>

                            <div>
                                <label className="block text-gray-400 mb-2">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-orange-500 outline-none"
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="Power Platform, Tutorial, Event..."
                                />
                            </div>

                            <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
                                <button
                                    type="button"
                                    onClick={() => setIsEditorOpen(false)}
                                    className="px-6 py-2 text-gray-400 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold"
                                >
                                    {currentBlog ? 'Update Blog' : 'Submit for Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBlogs;
