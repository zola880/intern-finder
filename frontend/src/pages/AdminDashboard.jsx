import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Clock, RefreshCw, Loader2, AlertCircle, Building2, Eye } from 'lucide-react';
import api from '../services/api';
import { useProfile } from '../hooks/useProfile';

const AdminDashboard = () => {
  const { user } = useProfile();
  const [pendingInternships, setPendingInternships] = useState([]);
  const [approvedInternships, setApprovedInternships] = useState([]);
  const [rejectedInternships, setRejectedInternships] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [notification, setNotification] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null, action: null });

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchAllInternships();
    }
  }, [user]);

  const fetchAllInternships = async () => {
    setLoading(true);
    try {
      const [pendingRes, approvedRes, rejectedRes] = await Promise.all([
        api.get('/internships?approvalStatus=PENDING'),
        api.get('/internships?approvalStatus=APPROVED'),
        api.get('/internships?approvalStatus=REJECTED'),
      ]);
      setPendingInternships(pendingRes.data.data);
      setApprovedInternships(approvedRes.data.data);
      setRejectedInternships(rejectedRes.data.data);
    } catch (err) {
      console.error(err);
      showNotification('Failed to load internships', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      await api.put(`/internships/${id}/approve`);
      showNotification('Internship approved successfully!', 'success');
      fetchAllInternships();
    } catch (err) {
      showNotification('Failed to approve internship', 'error');
    } finally {
      setActionLoading(null);
      setConfirmDialog({ show: false, id: null, action: null });
    }
  };

  const handleReject = async (id, reason) => {
    setActionLoading(id);
    try {
      await api.put(`/internships/${id}/reject`, { reason });
      showNotification('Internship rejected', 'success');
      fetchAllInternships();
    } catch (err) {
      showNotification('Failed to reject internship', 'error');
    } finally {
      setActionLoading(null);
      setConfirmDialog({ show: false, id: null, action: null });
    }
  };

  const openConfirmDialog = (id, action) => {
    if (action === 'reject') {
      const reason = prompt('Please provide a reason for rejection:');
      if (reason) handleReject(id, reason);
    } else {
      setConfirmDialog({ show: true, id, action });
    }
  };

  const getCurrentList = () => {
    switch (activeTab) {
      case 'pending': return pendingInternships;
      case 'approved': return approvedInternships;
      case 'rejected': return rejectedInternships;
      default: return [];
    }
  };

  const getTabCount = (tab) => {
    if (tab === 'pending') return pendingInternships.length;
    if (tab === 'approved') return approvedInternships.length;
    return rejectedInternships.length;
  };

  if (user?.role !== 'ADMIN') {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Access Denied</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">You don't have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-20 right-4 z-50 px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 ${
              notification.type === 'success' 
                ? 'bg-emerald-600 text-white' 
                : 'bg-red-600 text-white'
            }`}
          >
            {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Dialog */}
      {confirmDialog.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-md mx-4 shadow-xl"
          >
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Confirm Approval</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">Are you sure you want to approve this internship? It will become visible to all students.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDialog({ show: false, id: null, action: null })}
                className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApprove(confirmDialog.id)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold"
              >
                Approve
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
            <Building2 className="w-8 h-8 text-indigo-600" />
            Admin Dashboard
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">Manage internship submissions and approvals</p>
        </div>
        <button
          onClick={fetchAllInternships}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-md disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-200 dark:border-zinc-800 mb-8">
        {[
          { id: 'pending', label: 'Pending', icon: Clock, color: 'orange' },
          { id: 'approved', label: 'Approved', icon: CheckCircle2, color: 'green' },
          { id: 'rejected', label: 'Rejected', icon: XCircle, color: 'red' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all border-b-2 -mb-[2px] ${
              activeTab === tab.id
                ? `border-indigo-600 text-indigo-600`
                : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            <span className="ml-1 px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs">
              {getTabCount(tab.id)}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        </div>
      ) : (
        <>
          {getCurrentList().length === 0 ? (
            <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800">
              <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-zinc-400" />
              </div>
              <p className="text-zinc-500 dark:text-zinc-400">No {activeTab} internships found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {getCurrentList().map((internship) => (
                <motion.div
                  key={internship._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center text-indigo-600 font-bold text-lg">
                            {internship.companyName.charAt(0)}
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                              {internship.companyName}
                            </h2>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                              Submitted by: {internship.submittedBy?.fullName || 'Unknown'} • {new Date(internship.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-zinc-600 dark:text-zinc-400 mt-2">{internship.shortDescription}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs rounded-full">{internship.field}</span>
                          <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs rounded-full">{internship.location}</span>
                          <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs rounded-full">{internship.duration}</span>
                        </div>
                        {internship.adminNotes && activeTab === 'rejected' && (
                          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-xl text-sm text-red-700 dark:text-red-300">
                            <strong>Rejection reason:</strong> {internship.adminNotes}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.open(`/internships/${internship._id}`, '_blank')}
                          className="p-2 text-zinc-500 hover:text-indigo-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {activeTab === 'pending' && (
                          <>
                            <button
                              onClick={() => openConfirmDialog(internship._id, 'approve')}
                              disabled={actionLoading === internship._id}
                              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all disabled:opacity-50"
                            >
                              {actionLoading === internship._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                              Approve
                            </button>
                            <button
                              onClick={() => openConfirmDialog(internship._id, 'reject')}
                              disabled={actionLoading === internship._id}
                              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all disabled:opacity-50"
                            >
                              {actionLoading === internship._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;