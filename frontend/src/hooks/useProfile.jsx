import React, { createContext, useContext, useState, useEffect } from "react";

const DEFAULT_PROFILE = {
  fullName: "",
  department: "",
  university: "",
  year: "1",
  experienceLevel: "Beginner",
  goal: "First internship",
  interests: [],
  location: "Addis Ababa",
  savedInternships: [],
};

const ProfileContext = createContext(undefined);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("ethiointern_profile");
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("ethiointern_theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("ethiointern_profile", JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem("ethiointern_theme", isDarkMode ? "dark" : "light");
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const updateProfile = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, isDarkMode, toggleDarkMode }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileProvider");
  return context;
};
