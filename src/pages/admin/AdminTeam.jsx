import React, { useEffect, useState } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { Plus, Edit, Trash2, X, Upload } from 'lucide-react';

const AdminTeam = () => {
    const [members, setMembers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        designation: '',
        imageurl: '',
        linkedin: '',
        order: 0
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const q = query(collection(db, 'team_members'), orderBy('order', 'asc'));
            const snapshot = await getDocs(q);
            setMembers(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        } catch (error) {
            console.error("Error fetching team:", error);
        }
    };

    const handleOpenModal = (member = null) => {
        if (member) {
            setEditingMember(member);
            setFormData({
                firstname: member.firstname,
                lastname: member.lastname,
                designation: member.designation,
                imageurl: member.imageurl,
                linkedin: member.linkedin || '',
                order: member.order || 0
            });
        } else {
            setEditingMember(null);
            setFormData({
                firstname: '',
                lastname: '',
                designation: '',
                imageurl: '',
                linkedin: '',
                order: users.length + 1
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingMember) {
                await updateDoc(doc(db, 'team_members', editingMember.id), formData);
            } else {
                await addDoc(collection(db, 'team_members'), formData);
            }
            setIsModalOpen(false);
            fetchMembers();
        } catch (error) {
            console.error(error);
            alert("Error saving member");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Delete this team member?")) {
            await deleteDoc(doc(db, 'team_members', id));
            fetchMembers();
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Team Management</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    <Plus size={20} /> Add Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex flex-col items-center text-center relative group">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button onClick={() => handleOpenModal(member)} className="p-1.5 bg-blue-600 rounded-full text-white"><Edit size={14} /></button>
                            <button onClick={() => handleDelete(member.id)} className="p-1.5 bg-red-600 rounded-full text-white"><Trash2 size={14} /></button>
                        </div>
                        <img
                            src={member.imageurl}
                            alt={member.firstname}
                            className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-orange-500"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                        />
                        <h3 className="text-lg font-bold text-white">{member.firstname} {member.lastname}</h3>
                        <p className="text-orange-400 text-sm mb-2">{member.designation}</p>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
                        <h2 className="text-2xl font-bold text-white mb-6">{editingMember ? 'Edit Member' : 'Add Member'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input placeholder="First Name" required className="bg-gray-700 text-white rounded p-2" value={formData.firstname} onChange={e => setFormData({ ...formData, firstname: e.target.value })} />
                                <input placeholder="Last Name" required className="bg-gray-700 text-white rounded p-2" value={formData.lastname} onChange={e => setFormData({ ...formData, lastname: e.target.value })} />
                            </div>
                            <input placeholder="Designation" required className="w-full bg-gray-700 text-white rounded p-2" value={formData.designation} onChange={e => setFormData({ ...formData, designation: e.target.value })} />
                            <input placeholder="Image URL" required className="w-full bg-gray-700 text-white rounded p-2" value={formData.imageurl} onChange={e => setFormData({ ...formData, imageurl: e.target.value })} />
                            <input placeholder="LinkedIn URL" className="w-full bg-gray-700 text-white rounded p-2" value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} />
                            <input type="number" placeholder="Order" className="w-full bg-gray-700 text-white rounded p-2" value={formData.order} onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })} />
                            <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded hover:bg-orange-600 mt-2">Save</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTeam;
