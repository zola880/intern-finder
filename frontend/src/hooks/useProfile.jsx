import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const DEFAULT_LOCAL_PROFILE = {
  savedInternships: [],
  bankAccount: "",
  cvFileName: "",
  cvFileSize: 0,
  cvFileType: "",
  cvUploadedAt: "",
  cvAnalysis: null,
  skillAssessment: null,
};

const SERVER_PROFILE_FIELDS = [
  "fullName",
  "department",
  "university",
  "year",
  "experienceLevel",
  "goal",
  "interests",
  "location",
  "bankAccount",
];

const ProfileContext = createContext(undefined);

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [localProfile, setLocalProfile] = useState(() => {
    const saved = localStorage.getItem("ethiointern_profile");
    return saved ? { ...DEFAULT_LOCAL_PROFILE, ...JSON.parse(saved) } : DEFAULT_LOCAL_PROFILE;
  });
  const [uploadedCvFile, setUploadedCvFile] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api.get("/profile")
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ethiointern_profile", JSON.stringify(localProfile));
  }, [localProfile]);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    if (isDarkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  const updateProfile = async (updates) => {
    const serverUpdates = {};
    const localUpdates = {};

    Object.entries(updates).forEach(([key, value]) => {
      if (SERVER_PROFILE_FIELDS.includes(key)) {
        serverUpdates[key] = value;
      } else {
        localUpdates[key] = value;
      }
    });

    let nextUser = user;
    if (Object.keys(serverUpdates).length > 0) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const { data } = await api.put("/profile", serverUpdates);
        setUser(data);
        nextUser = data;
      } else {
        nextUser = { ...(user || {}), ...serverUpdates };
        setUser(nextUser);
      }
    }

    if (Object.keys(localUpdates).length > 0) {
      setLocalProfile((prev) => ({ ...prev, ...localUpdates }));
    }

    return { ...DEFAULT_LOCAL_PROFILE, ...(nextUser || {}), ...localProfile, ...localUpdates };
  };

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const setAuth = (userData) => setUser(userData);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setUploadedCvFile(null);
    setLocalProfile(DEFAULT_LOCAL_PROFILE);
  };

  const profile = { ...DEFAULT_LOCAL_PROFILE, ...(user || {}), ...localProfile };

  return (
    <ProfileContext.Provider
      value={{
        user,
        profile,
        updateProfile,
        uploadedCvFile,
        setUploadedCvFile,
        isDarkMode,
        toggleDarkMode,
        setAuth,
        logout,
        loading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileProvider");
  return context;
};
