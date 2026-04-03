import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  User, 
  GraduationCap, 
  Target, 
  MapPin, 
  Save, 
  Bookmark, 
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { INTERNSHIPS } from "../data/internships";
import InternshipCard from "../components/InternshipCard";

const Profile = () => {
  const { profile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const savedList = INTERNSHIPS.filter(i => profile.savedInternships.includes(i.id));

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl text-center shadow-sm">
            <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/20">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{profile.fullName || "Student Name"}</h2>
            <p className="text-sm text-zinc-500 mb-6">{profile.department || "Field of Study"}</p>
            
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl text-sm font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4" />
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-1">
            {[
              { label: "My Applications", icon: ChevronRight },
              { label: "Saved Internships", icon: Bookmark },
              { label: "Account Settings", icon: Settings },
              { label: "Sign Out", icon: LogOut, color: "text-red-500" }
            ].map((item, i) => (
              <button key={i} className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium hover:bg-white dark:hover:bg-zinc-800 transition-all ${item.color || "text-zinc-600 dark:text-zinc-400"}`}>
                {item.label}
                <item.icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
          {isEditing ? (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm"
            >
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-8 flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-600" />
                Profile Settings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-zinc-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">University</label>
                  <input
                    type="text"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-zinc-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-zinc-900 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Experience Level</label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-zinc-900 dark:text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-4">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 text-zinc-600 dark:text-zinc-400 font-bold"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </motion.section>
          ) : (
            <div className="space-y-12">
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Education", value: profile.university || "Not set", icon: GraduationCap },
                  { label: "Career Goal", value: profile.goal || "Not set", icon: Target },
                  { label: "Location", value: profile.location || "Not set", icon: MapPin }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
                    <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">{item.label}</p>
                    <p className="font-bold text-zinc-900 dark:text-white">{item.value}</p>
                  </div>
                ))}
              </section>

              <section>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                    <Bookmark className="w-6 h-6 text-indigo-600" />
                    Saved Internships
                  </h3>
                  <span className="text-sm font-bold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                    {savedList.length} Items
                  </span>
                </div>
                
                {savedList.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedList.map((internship) => (
                      <InternshipCard key={internship.id} internship={internship} />
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-zinc-50 dark:bg-zinc-900/50 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2rem]">
                    <Bookmark className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                    <p className="text-zinc-500 dark:text-zinc-400">You haven't saved any internships yet.</p>
                    <Link to="/internships" className="text-indigo-600 font-bold mt-2 inline-block hover:underline">
                      Browse opportunities
                    </Link>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
