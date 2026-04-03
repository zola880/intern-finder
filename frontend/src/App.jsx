import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfileProvider } from "./hooks/useProfile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import InternshipList from "./pages/InternshipList";
import InternshipDetail from "./pages/InternshipDetail";
import AnnouncementForm from "./pages/ApplicationForm";
import AIAssistant from "./pages/AIAssistant";
import Profile from "./pages/Profile";

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
              <Route path="/announce/:id" element={<AnnouncementForm />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ProfileProvider>
  );
}
