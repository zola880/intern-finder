import React, { useState, useEffect } from "react";
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
  ChevronRight,
<<<<<<< HEAD
  Loader2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import api from "../services/api";
import InternshipCard from "../components/InternshipCard";

const Profile = () => {
  const { user, updateProfile, logout, loading: authLoading } = useProfile();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    department: user?.department || "",
    university: user?.university || "",
    year: user?.year || "1",
    experienceLevel: user?.experienceLevel || "Beginner",
    goal: user?.goal || "",
    location: user?.location || "Addis Ababa",
    interests: user?.interests || [],
  });
  const [savedInternships, setSavedInternships] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(true);
=======
  Upload,
  FileText,
  Brain,
  CheckCircle,
  XCircle,
  Play,
  Award
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { INTERNSHIPS } from "../data/internships";
import { ETHIOPIAN_UNIVERSITIES } from "../data/universities";
import InternshipCard from "../components/InternshipCard";

const Profile = () => {
  const { profile, updateProfile, uploadedCvFile, setUploadedCvFile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);
  const navigate = useNavigate();

  // CV Analysis states
  const [cvFile, setCvFile] = useState(uploadedCvFile);
  const [cvAnalysis, setCvAnalysis] = useState(profile.cvAnalysis);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(profile.skillAssessment);
  const [isTakingQuiz, setIsTakingQuiz] = useState(false);

  const handleSignOut = () => {
    setUploadedCvFile(null);
    updateProfile({
      fullName: "",
      department: "",
      university: "",
      year: "1",
      savedInternships: [],
      goal: "",
      location: "",
      bankAccount: "",
      cvFileName: "",
      cvFileSize: 0,
      cvFileType: "",
      cvUploadedAt: "",
      cvAnalysis: null,
      skillAssessment: null,
    });
    navigate("/");
  };
>>>>>>> 0d725fb (Add company application flow and dev startup improvements)

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        department: user.department || "",
        university: user.university || "",
        year: user.year || "1",
        experienceLevel: user.experienceLevel || "Beginner",
        goal: user.goal || "",
        location: user.location || "Addis Ababa",
        interests: user.interests || [],
      });
      // Fetch saved internships from API
      const fetchSaved = async () => {
        try {
          const { data } = await api.get("/saved");
          setSavedInternships(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingSaved(false);
        }
      };
      fetchSaved();
    }
  }, [user]);

  const handleSave = async () => {
    await updateProfile(formData);
    setIsEditing(false);
  };

<<<<<<< HEAD
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (authLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mx-auto" />
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }
=======
  // CV Analysis Functions
  const analyzeCV = async (file) => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const analysis = {
        isNormal: Math.random() > 0.3, // 70% chance of being "normal"
        score: Math.floor(Math.random() * 40) + 60, // 60-100 score
        issues: [
          "Missing professional summary",
          "No quantifiable achievements",
          "Skills section could be more detailed"
        ],
        strengths: [
          "Good education background",
          "Relevant experience mentioned",
          "Clear contact information"
        ]
      };
      setCvAnalysis(analysis);
      updateProfile({ cvAnalysis: analysis });
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateQuiz = () => {
    // Base questions for all levels
    const allQuestions = [
      // Beginner Level
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlink Text Management Language"
        ],
        correct: 0,
        level: "beginner"
      },
      {
        id: 2,
        question: "Which HTTP method is used to retrieve data from a server?",
        options: ["POST", "PUT", "GET", "DELETE"],
        correct: 2,
        level: "beginner"
      },
      {
        id: 3,
        question: "What does SQL stand for?",
        options: [
          "Simple Query Language",
          "Structured Query Language",
          "System Query Logic",
          "Sequential Query Language"
        ],
        correct: 1,
        level: "beginner"
      },
      {
        id: 4,
        question: "What is the purpose of version control systems?",
        options: [
          "To compile code faster",
          "To track changes and collaborate",
          "To optimize database queries",
          "To debug runtime errors"
        ],
        correct: 1,
        level: "beginner"
      },

      // Intermediate Level
      {
        id: 5,
        question: "What is the primary purpose of a linked list data structure?",
        options: [
          "To store data in a sequential manner",
          "To allow dynamic memory allocation",
          "To provide fast random access",
          "To sort data automatically"
        ],
        correct: 1,
        level: "intermediate"
      },
      {
        id: 6,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correct: 1,
        level: "intermediate"
      },
      {
        id: 7,
        question: "Which of the following is NOT a programming paradigm?",
        options: ["Object-oriented", "Functional", "Procedural", "Algorithmic"],
        correct: 3,
        level: "intermediate"
      },
      {
        id: 8,
        question: "Which of these is a NoSQL database?",
        options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
        correct: 2,
        level: "intermediate"
      },

      // Advanced Level
      {
        id: 9,
        question: "Which design pattern is used to ensure only one instance of a class exists?",
        options: ["Factory", "Observer", "Singleton", "Decorator"],
        correct: 2,
        level: "advanced"
      },
      {
        id: 10,
        question: "What is the purpose of the 'volatile' keyword in Java?",
        options: [
          "To make variables thread-safe",
          "To optimize memory usage",
          "To prevent method overriding",
          "To enable garbage collection"
        ],
        correct: 0,
        level: "advanced"
      },
      {
        id: 11,
        question: "Which algorithm is used for finding the shortest path in a weighted graph?",
        options: ["Breadth-First Search", "Depth-First Search", "Dijkstra's Algorithm", "Binary Search"],
        correct: 2,
        level: "advanced"
      },
      {
        id: 12,
        question: "What does ACID stand for in database transactions?",
        options: [
          "Atomicity, Consistency, Isolation, Durability",
          "Access, Control, Integrity, Data",
          "Automated, Concurrent, Independent, Distributed",
          "Advanced, Complex, Integrated, Dynamic"
        ],
        correct: 0,
        level: "advanced"
      }
    ];

    // Select questions based on CV analysis or default to mixed
    let selectedQuestions = [];
    const cvScore = cvAnalysis?.score || 70;

    if (cvScore < 60) {
      // Beginner focused
      selectedQuestions = allQuestions.filter(q => q.level === "beginner").slice(0, 6);
    } else if (cvScore < 80) {
      // Intermediate focused
      selectedQuestions = allQuestions.filter(q => ["beginner", "intermediate"].includes(q.level)).slice(0, 8);
    } else {
      // Advanced focused
      selectedQuestions = allQuestions.filter(q => ["intermediate", "advanced"].includes(q.level)).slice(0, 8);
    }

    // Shuffle and select 8 questions
    const shuffled = selectedQuestions.sort(() => Math.random() - 0.5);
    const quizQuestions = shuffled.slice(0, 8).map((q, index) => ({ ...q, id: index + 1 }));

    setQuiz(quizQuestions);
    setQuizAnswers({});
    setQuizResults(null);
    setIsTakingQuiz(true);
  };

  const submitQuiz = () => {
    if (!quiz) return;

    let correct = 0;
    const total = quiz.length;
    const levelCounts = { beginner: 0, intermediate: 0, advanced: 0 };

    quiz.forEach(question => {
      if (quizAnswers[question.id] === question.correct) {
        correct++;
        levelCounts[question.level]++;
      }
    });

    const percentage = Math.round((correct / total) * 100);

    let level = "Beginner";
    if (percentage >= 80) level = "Advanced";
    else if (percentage >= 60) level = "Intermediate";

    const results = {
      score: percentage,
      level,
      correct,
      total,
      breakdown: levelCounts
    };

    setQuizResults(results);
    updateProfile({
      skillAssessment: results,
      experienceLevel: results.level,
    });
    setFormData((prev) => ({ ...prev, experienceLevel: results.level }));
    setIsTakingQuiz(false);
  };

  const handleCvUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedCvFile(file);
      setCvFile(file);
      setCvAnalysis(null);
      updateProfile({
        cvFileName: file.name,
        cvFileSize: file.size,
        cvFileType: file.type,
        cvUploadedAt: new Date().toISOString(),
        cvAnalysis: null,
      });
      analyzeCV(file);
    }
  };
>>>>>>> 0d725fb (Add company application flow and dev startup improvements)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl text-center shadow-sm">
            <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-600/20">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{user.fullName || "Student Name"}</h2>
            <p className="text-sm text-zinc-500 mb-6">{user.department || "Field of Study"}</p>
            
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-xl text-sm font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4" />
              {isEditing ? "Cancel Editing" : "Edit Profile"}
            </button>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-1">
<<<<<<< HEAD
            <button 
              onClick={() => navigate("/profile")}
              className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium hover:bg-white dark:hover:bg-zinc-800 transition-all text-zinc-600 dark:text-zinc-400"
            >
              My Applications
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => navigate("/profile")}
              className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium hover:bg-white dark:hover:bg-zinc-800 transition-all text-zinc-600 dark:text-zinc-400"
            >
              Saved Internships
              <Bookmark className="w-4 h-4" />
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium hover:bg-white dark:hover:bg-zinc-800 transition-all text-red-500"
            >
              Sign Out
              <LogOut className="w-4 h-4" />
            </button>
=======
            {[
              { label: "My Applications", icon: ChevronRight, onClick: () => alert("Application tracking is under development.") },
              { label: "CV Analysis", icon: Brain, onClick: () => document.getElementById('cv-analysis')?.scrollIntoView({ behavior: 'smooth' }) },
              { label: "Saved Internships", icon: Bookmark, onClick: () => navigate("/internships") },
              { label: "Account Settings", icon: Settings, onClick: () => setIsEditing(true) },
              { label: "Sign Out", icon: LogOut, color: "text-red-500", onClick: handleSignOut }
            ].map((item, i) => (
              <button
                key={i}
                onClick={item.onClick}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-medium hover:bg-white dark:hover:bg-zinc-800 transition-all ${item.color || "text-zinc-600 dark:text-zinc-400"}`}
              >
                {item.label}
                <item.icon className="w-4 h-4" />
              </button>
            ))}
>>>>>>> 0d725fb (Add company application flow and dev startup improvements)
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
                  <select
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-zinc-900 dark:text-white"
                  >
                    <option value="">Select your university</option>
                    {ETHIOPIAN_UNIVERSITIES.map((uni) => (
                      <option key={uni.id} value={uni.name}>
                        {uni.name} ({uni.location})
                      </option>
                    ))}
                  </select>
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
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Year of Study</label>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-zinc-900 dark:text-white"
                  >
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                    <option value="5">Year 5</option>
                  </select>
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
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Career Goal</label>
                  <input
                    type="text"
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-zinc-900 dark:text-white"
                    placeholder="e.g. Become a software engineer"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-zinc-400" />
                  CV/Resume Upload
                </label>
                <div className="relative border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 text-center hover:border-indigo-500/50 transition-all group cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCvUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 text-indigo-600" />
                    </div>
                    {cvFile || profile.cvFileName ? (
                      <div className="flex items-center gap-2 text-indigo-600 font-bold">
                        <FileText className="w-4 h-4" />
                        {cvFile?.name || profile.cvFileName}
                      </div>
                    ) : (
                      <>
                        <p className="font-bold text-zinc-900 dark:text-white">Click to upload your CV</p>
                        <p className="text-xs text-zinc-500">PDF, DOC, DOCX (max 5MB)</p>
                      </>
                    )}
                  </div>
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
                  { label: "Education", value: user.university || "Not set", icon: GraduationCap },
                  { label: "Career Goal", value: user.goal || "Not set", icon: Target },
                  { label: "Location", value: user.location || "Not set", icon: MapPin }
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

              {/* CV Analysis Section */}
              <section id="cv-analysis" className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 flex items-center gap-3">
                  <Brain className="w-6 h-6 text-indigo-600" />
                  CV Analysis & Skill Assessment
                </h3>

                {!cvFile && !profile.cvFileName ? (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
                    <p className="text-zinc-500 dark:text-zinc-400 mb-4">Upload your CV to get AI-powered analysis and skill assessment</p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
                    >
                      Upload CV
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 p-4">
                      <p className="text-sm font-bold text-zinc-900 dark:text-white">Uploaded CV</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {cvFile?.name || profile.cvFileName}
                      </p>
                    </div>
                    {/* CV Analysis Results */}
                    {cvAnalysis && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
                          <div className="flex items-center gap-3 mb-4">
                            {cvAnalysis.isNormal ? (
                              <CheckCircle className="w-6 h-6 text-emerald-600" />
                            ) : (
                              <XCircle className="w-6 h-6 text-red-600" />
                            )}
                            <h4 className="font-bold text-zinc-900 dark:text-white">
                              CV Quality: {cvAnalysis.isNormal ? "Good" : "Needs Improvement"}
                            </h4>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-zinc-600 dark:text-zinc-400">Overall Score</span>
                              <span className="font-bold text-indigo-600">{cvAnalysis.score}%</span>
                            </div>
                            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                              <div
                                className="bg-indigo-600 h-2 rounded-full transition-all"
                                style={{ width: `${cvAnalysis.score}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h5 className="font-bold text-zinc-900 dark:text-white mb-2">Strengths</h5>
                            <ul className="space-y-1">
                              {cvAnalysis.strengths.map((strength, i) => (
                                <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-bold text-zinc-900 dark:text-white mb-2">Areas for Improvement</h5>
                            <ul className="space-y-1">
                              {cvAnalysis.issues.map((issue, i) => (
                                <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                                  <XCircle className="w-4 h-4 text-red-600" />
                                  {issue}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Quiz Section */}
                    {!quiz && !quizResults && (
                      <div className="text-center py-8 border-t border-zinc-100 dark:border-zinc-800">
                        <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Take Skill Assessment Quiz</h4>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                          Test your technical knowledge and get a detailed skill level assessment
                        </p>
                        <button
                          onClick={generateQuiz}
                          className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all flex items-center gap-2 mx-auto"
                        >
                          <Play className="w-5 h-5" />
                          Start Quiz
                        </button>
                      </div>
                    )}

                    {/* Quiz Questions */}
                    {quiz && isTakingQuiz && (
                      <div className="space-y-6">
                        <h4 className="text-xl font-bold text-zinc-900 dark:text-white">Skill Assessment Quiz</h4>
                        {quiz.map((question, index) => (
                          <div key={question.id} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
                            <h5 className="font-bold text-zinc-900 dark:text-white mb-4">
                              {index + 1}. {question.question}
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {question.options.map((option, optionIndex) => (
                                <label key={optionIndex} className="flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 rounded-xl cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all">
                                  <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value={optionIndex}
                                    checked={quizAnswers[question.id] === optionIndex}
                                    onChange={(e) => setQuizAnswers({
                                      ...quizAnswers,
                                      [question.id]: parseInt(e.target.value)
                                    })}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <span className="text-sm text-zinc-700 dark:text-zinc-300">{option}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-end">
                          <button
                            onClick={submitQuiz}
                            disabled={Object.keys(quizAnswers).length !== quiz.length}
                            className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all disabled:bg-zinc-400 disabled:cursor-not-allowed"
                          >
                            Submit Quiz
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Quiz Results */}
                    {quizResults && (
                      <div className="p-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-3xl border border-indigo-100 dark:border-indigo-800">
                        <div className="text-center mb-8">
                          <Award className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                          <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Quiz Results</h4>
                          <div className="text-6xl font-extrabold text-indigo-600 mb-2">{quizResults.score}%</div>
                          <p className="text-xl text-zinc-600 dark:text-zinc-400">
                            Skill Level: <span className="font-bold text-indigo-600">{quizResults.level}</span>
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          <div className="text-center p-4 bg-white dark:bg-zinc-900 rounded-2xl">
                            <div className="text-2xl font-bold text-emerald-600">{quizResults.correct}</div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">Correct Answers</div>
                          </div>
                          <div className="text-center p-4 bg-white dark:bg-zinc-900 rounded-2xl">
                            <div className="text-2xl font-bold text-red-600">{quizResults.total - quizResults.correct}</div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">Incorrect Answers</div>
                          </div>
                          <div className="text-center p-4 bg-white dark:bg-zinc-900 rounded-2xl">
                            <div className="text-2xl font-bold text-indigo-600">{quizResults.total}</div>
                            <div className="text-sm text-zinc-600 dark:text-zinc-400">Total Questions</div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h5 className="font-bold text-zinc-900 dark:text-white mb-4">Question Level Breakdown</h5>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                              <div className="text-lg font-bold text-emerald-600">{quizResults.breakdown.beginner}</div>
                              <div className="text-xs text-zinc-600 dark:text-zinc-400">Beginner</div>
                            </div>
                            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                              <div className="text-lg font-bold text-yellow-600">{quizResults.breakdown.intermediate}</div>
                              <div className="text-xs text-zinc-600 dark:text-zinc-400">Intermediate</div>
                            </div>
                            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                              <div className="text-lg font-bold text-red-600">{quizResults.breakdown.advanced}</div>
                              <div className="text-xs text-zinc-600 dark:text-zinc-400">Advanced</div>
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <button
                            onClick={() => {
                              setQuiz(null);
                              setQuizResults(null);
                              generateQuiz();
                            }}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
                          >
                            Retake Quiz
                          </button>
                        </div>
                      </div>
                    )}

                    {isAnalyzing && (
                      <div className="text-center py-8">
                        <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-zinc-600 dark:text-zinc-400">Analyzing your CV...</p>
                      </div>
                    )}
                  </div>
                )}
              </section>

              <section>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
                    <Bookmark className="w-6 h-6 text-indigo-600" />
                    Saved Internships
                  </h3>
                  <span className="text-sm font-bold text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                    {savedInternships.length} Items
                  </span>
                </div>
                
                {loadingSaved ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                  </div>
                ) : savedInternships.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedInternships.map((internship) => (
                      <InternshipCard key={internship._id} internship={internship} />
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