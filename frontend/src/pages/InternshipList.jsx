import React, { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Search, Loader2, AlertCircle } from "lucide-react";
import InternshipCard from "../components/InternshipCard";
import api from "../services/api";
import { useProfile } from "../hooks/useProfile";

const InternshipList = () => {
  const { user } = useProfile();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedField, setSelectedField] = useState("All");
  const [pagination, setPagination] = useState({ page: 1, limit: 9, total: 0 });

  const fields = ["All", "IT", "Business", "Engineering", "Health", "Other"];

  const fetchInternships = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        search: searchTerm || undefined,
        field: selectedField === "All" ? undefined : selectedField,
        page: pagination.page,
        limit: pagination.limit,
      };
      // The backend already filters based on user role (student sees only approved)
      const { data } = await api.get("/internships", { params });
      setInternships(data.data);
      setPagination((prev) => ({ ...prev, total: data.pagination.total }));
    } catch (err) {
      console.error("Failed to fetch internships:", err);
      setError(err.response?.data?.message || "Failed to load internships. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedField, pagination.page, pagination.limit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInternships();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchInternships]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedField("All");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="max-w-xl">
          <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">
            Browse Internships
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Discover your next professional milestone. Filter through verified opportunities across Ethiopia's leading industries.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
          <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">
            {pagination.total} Results Found
          </span>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" />
          <input
            type="text"
            placeholder="Search by company or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-zinc-900 dark:text-white shadow-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {fields.map((field) => (
            <button
              key={field}
              onClick={() => {
                setSelectedField(field);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              className={`px-6 py-4 rounded-2xl font-bold text-sm whitespace-nowrap transition-all border ${
                selectedField === field
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50"
              }`}
            >
              {field}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        </div>
      ) : error ? (
        <div className="py-24 text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Error loading internships</h3>
          <p className="text-zinc-500 dark:text-zinc-400">{error}</p>
          <button
            onClick={fetchInternships}
            className="mt-6 text-indigo-600 font-bold hover:underline"
          >
            Try again
          </button>
        </div>
      ) : internships.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internships.map((internship) => (
              <InternshipCard key={internship._id} internship={internship} />
            ))}
          </div>
          {/* Pagination */}
          {pagination.total > pagination.limit && (
            <div className="flex justify-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-zinc-600 dark:text-zinc-400">
                Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
              </span>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page * pagination.limit >= pagination.total}
                className="px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="py-24 text-center">
          <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-zinc-400" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No internships found</h3>
          <p className="text-zinc-500 dark:text-zinc-400">Try adjusting your search or filters to find more opportunities.</p>
          <button
            onClick={clearFilters}
            className="mt-6 text-indigo-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default InternshipList;