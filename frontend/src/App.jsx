import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "./hooks/useProfile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import InternshipList from "./pages/InternshipList";// List of internships with search and filters  
import InternshipDetail from "./pages/InternshipDetail";
import AnnouncementForm from "./pages/AnnouncementForm";
import AIAssistant from "./pages/AIAssistant";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PostInternship from "./pages/PostInternship";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <ProfileProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 transition-colors duration-300">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/internships" element={<InternshipList />} />
              <Route path="/internships/:id" element={<InternshipDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/announce/:id" 
                element={<ProtectedRoute><AnnouncementForm /></ProtectedRoute>} 
              />
              <Route 
                path="/ai-assistant" 
                element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} 
              />
              <Route 
                path="/profile" 
                element={<ProtectedRoute><Profile /></ProtectedRoute>} 
              />
              <Route 
                path="/post-internship" 
                element={<ProtectedRoute><PostInternship /></ProtectedRoute>} 
              />
              <Route 
                path="/admin" 
                element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ProfileProvider>
  );
}