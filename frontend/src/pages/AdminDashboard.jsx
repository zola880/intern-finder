import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useProfile } from '../hooks/useProfile';

const AdminDashboard = () => {
  const { user } = useProfile();
  const [pendingInternships, setPendingInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchPending();
    }
  }, [user]);

  const fetchPending = async () => {
    try {
      const { data } = await api.get('/internships?approvalStatus=PENDING');
      setPendingInternships(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    await api.put(`/internships/${id}/approve`);
    fetchPending();
  };

  const handleReject = async (id) => {
    const reason = prompt('Reason for rejection:');
    if (reason) {
      await api.put(`/internships/${id}/reject`, { reason });
      fetchPending();
    }
  };

  if (user?.role !== 'ADMIN') return <div className="p-8 text-center">Admin access only</div>;
  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Pending Internships</h1>
      {pendingInternships.length === 0 ? (
        <p>No pending internships.</p>
      ) : (
        <div className="space-y-6">
          {pendingInternships.map(intern => (
            <div key={intern._id} className="border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold">{intern.companyName}</h2>
              <p className="text-gray-600">{intern.shortDescription}</p>
              <div className="mt-4 flex gap-4">
                <button onClick={() => handleApprove(intern._id)} className="bg-green-600 text-white px-4 py-2 rounded">Approve</button>
                <button onClick={() => handleReject(intern._id)} className="bg-red-600 text-white px-4 py-2 rounded">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;