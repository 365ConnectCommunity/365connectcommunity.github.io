import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Printer, Share2, CheckCircle, Loader2, Download, Award } from 'lucide-react';

import logoNew from '../assets/images/logo-final.png';

const CertificateView = () => {
    const { id } = useParams();
    const [certificate, setCertificate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCert = async () => {
            try {
                const docRef = doc(db, 'certificates', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCertificate({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError('Certificate not found.');
                }
            } catch (err) {
                console.error(err);
                setError('Error fetching certificate.');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCert();
    }, [id]);

    const handlePrint = () => {
        window.print();
    };

    const handleShare = async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            alert('Certificate link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy class', err);
        }
    };

    if (loading) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white"><Loader2 className="animate-spin mr-2" /> Verifying Certificate...</div>;
    if (error) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-400">{error}</div>;

    return (
        <div className="min-h-screen bg-neutral-900 flex flex-col items-center py-16 px-4 print:p-0 print:bg-white">
            {/* Action Bar */}
            <div className="max-w-[1100px] w-full flex justify-between items-center mb-8 print:hidden">
                <div className="flex items-center gap-3 text-emerald-400 bg-emerald-400/10 px-4 py-2 rounded-full border border-emerald-400/20">
                    <CheckCircle size={18} />
                    <span className="font-semibold text-sm tracking-wide">Verified 365Connect Certificate</span>
                </div>
                <div className="flex gap-3">
                    <button onClick={handleShare} className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 text-gray-200 hover:text-white rounded-lg hover:bg-gray-700 transition-all font-medium border border-gray-700">
                        <Share2 size={18} /> Share Link
                    </button>
                    <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/20 transition-all transform hover:-translate-y-0.5">
                        <Printer size={18} /> Print / Download PDF
                    </button>
                </div>
            </div>

            {/* Certificate Canvas */}
            <div className="w-full max-w-[1123px] aspect-[1.414/1] bg-white text-slate-900 relative shadow-2xl print:shadow-none print:w-full print:h-full print:fixed print:inset-0 print:m-0 overflow-hidden mx-auto border border-gray-200">

                {/* Clean Modern Border */}
                <div className="absolute inset-8 border border-slate-900/10 pointer-events-none"></div>

                {/* Main Content Area */}
                <div className="h-full flex flex-col justify-between py-12 px-20 relative z-10">

                    {/* Header */}
                    <div className="flex flex-col items-center pt-6">
                        <img src={logoNew} alt="365Connect" className="h-16 mb-6" />
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight uppercase mb-2">Certificate</h1>
                        <p className="text-lg text-orange-600 font-bold tracking-[0.3em] uppercase text-sm">Of Completion</p>
                    </div>

                    {/* Recipient Section */}
                    <div className="flex-1 flex flex-col justify-center items-center w-full text-center -mt-4">
                        <p className="text-base text-slate-500 font-medium mb-6 tracking-wide">PROUDLY PRESENTED TO</p>

                        <div className="relative inline-block mx-auto mb-8">
                            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 px-8 pb-3">
                                {certificate?.recipientname || 'Recipient Name'}
                            </h2>
                            <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
                        </div>

                        <p className="text-base text-slate-500 font-medium mb-4">For successfully completing</p>

                        <h3 className="text-2xl font-bold text-slate-900 mb-6 max-w-4xl leading-tight">
                            {certificate?.eventname || 'Event Name'}
                        </h3>

                        <p className="text-slate-600 max-w-xl mx-auto leading-relaxed text-base">
                            {certificate?.description || 'In recognition of your dedication, active participation, and commitment to learning with the 365 Connect Community.'}
                        </p>
                    </div>

                    {/* Footer / Signatures */}
                    <div className="w-full grid grid-cols-3 items-end pt-8 border-t border-slate-100 mt-4">
                        {/* Signature */}
                        <div className="text-center">
                            <div className="flex flex-col items-center">
                                <div className="font-dancing-script text-2xl text-slate-800 mb-1 transform -rotate-3">Shaheer Ahmad</div>
                                <div className="h-px w-40 bg-slate-300 mb-2"></div>
                                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Shaheer Ahmad</p>
                                <p className="text-[9px] text-orange-500 uppercase tracking-widest font-bold mt-0.5">Community Lead</p>
                            </div>
                        </div>

                        {/* ID Center */}
                        <div className="text-center opacity-60">
                            <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-full inline-block">
                                <p className="text-[9px] text-slate-500 font-mono tracking-widest uppercase">
                                    ID: {certificate?.id}
                                </p>
                            </div>
                        </div>

                        {/* Date */}
                        <div className="text-center">
                            <div className="flex flex-col items-center">
                                <p className="text-lg font-bold text-slate-900 mb-1">
                                    {certificate?.issueddate?.toDate
                                        ? certificate.issueddate.toDate().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                        : new Date().toLocaleDateString()}
                                </p>
                                <div className="h-px w-40 bg-slate-300 mb-2"></div>
                                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">Date Issued</p>
                                <p className="text-[9px] text-green-500 uppercase tracking-widest font-bold mt-0.5 flex items-center justify-center gap-1">
                                    <CheckCircle size={10} /> Verified
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style type="text/css">
                {`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
                .font-dancing-script { font-family: 'Dancing Script', cursive; }
                
                @media print {
                    @page { size: landscape; margin: 0; }
                    body { margin: 0; padding: 0; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                    #root { display: none; } /* Hide everything else */
                }
                `}
            </style>
        </div>
    );
};

export default CertificateView;
