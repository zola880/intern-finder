import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  ExternalLink,
  FileText,
  Send,
  UserCheck,
} from "lucide-react";
import { INTERNSHIPS } from "../data/internships";
import { useProfile } from "../hooks/useProfile";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const HEALTHCHECK_URL =
  import.meta.env.VITE_HEALTHCHECK_URL ||
  (API_BASE_URL === "/api" ? "/health" : API_BASE_URL.replace(/\/api$/, "/health"));

const CompanyApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const internship = INTERNSHIPS.find((item) => item.id === id);
  const { profile, updateProfile, uploadedCvFile, setUploadedCvFile } = useProfile();
  const companyPageUrl = internship?.website || internship?.applicationUrl || "#";

  const [formData, setFormData] = useState({
    fullName: profile.fullName || "",
    university: profile.university || "",
    department: profile.department || "",
    year: profile.year || "1",
    experienceLevel: profile.experienceLevel || "Beginner",
    goal: profile.goal || "",
    location: profile.location || "",
    bankAccount: profile.bankAccount || "",
  });
  const [cvFile, setCvFile] = useState(uploadedCvFile);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submission, setSubmission] = useState(null);
  const [backendStatus, setBackendStatus] = useState("checking");

  useEffect(() => {
    let isActive = true;

    const checkBackend = async () => {
      try {
        const response = await fetch(HEALTHCHECK_URL, { method: "GET" });
        if (!response.ok) {
          throw new Error("Health check failed");
        }

        if (isActive) {
          setBackendStatus("online");
        }
      } catch (error) {
        if (isActive) {
          setBackendStatus("offline");
        }
      }
    };

    checkBackend();
    const intervalId = window.setInterval(checkBackend, 15000);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, []);

  if (!internship) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Internship not found</h2>
        <Link to="/internships" className="text-indigo-600 font-bold">
          Return to listings
        </Link>
      </div>
    );
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCvUpload = (event) => {
    const nextFile = event.target.files?.[0] || null;
    setCvFile(nextFile);
    setUploadedCvFile(nextFile);

    if (nextFile) {
      updateProfile({
        cvFileName: nextFile.name,
        cvFileSize: nextFile.size,
        cvFileType: nextFile.type,
        cvUploadedAt: new Date().toISOString(),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    if (!cvFile) {
      setSubmitError("Upload the applicant CV so the company receives the full profile package.");
      return;
    }

    setIsSubmitting(true);

    const mergedProfile = {
      ...profile,
      ...formData,
      experienceLevel: profile.skillAssessment?.level || formData.experienceLevel,
    };

    updateProfile(mergedProfile);

    const formPayload = new FormData();
    formPayload.append("internshipId", internship.id);
    formPayload.append("companyName", internship.companyName);
    formPayload.append("companyWebsite", internship.website || "");
    formPayload.append("applicationUrl", internship.applicationUrl || "");
    formPayload.append("internshipStatus", internship.status);
    formPayload.append("applicationStatus", "SUBMITTED");
    formPayload.append("profileSnapshot", JSON.stringify(mergedProfile));
    formPayload.append("cvAnalysis", JSON.stringify(profile.cvAnalysis || null));
    formPayload.append("skillAssessment", JSON.stringify(profile.skillAssessment || null));
    formPayload.append("cv", cvFile);

    try {
      const response = await fetch(`${API_BASE_URL}/company-applications`, {
        method: "POST",
        body: formPayload,
      });

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : { message: await response.text() };

      if (!response.ok) {
        throw new Error(data.message || "Unable to send the application to the company.");
      }

      setBackendStatus("online");
      setSubmission(data.application);
    } catch (error) {
      const isNetworkError =
        error instanceof TypeError ||
        /failed to fetch/i.test(error.message || "");

      if (isNetworkError) {
        setBackendStatus("offline");
      }

      setSubmitError(
        isNetworkError
          ? "Cannot reach the backend server. Start the backend and try again. Expected API: http://localhost:5000/api/company-applications"
          : error.message || "Unable to send the application to the company."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submission) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-zinc-900 dark:text-white mb-4 tracking-tight">
          Application Sent
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-3">
          Your full applicant profile, CV, level, and current application status were sent for
          <span className="font-bold text-indigo-600"> {internship.companyName}</span>.
        </p>
        <p className="text-sm text-zinc-500 mb-12">
          Current status: <span className="font-bold text-emerald-600">{submission.applicationStatus}</span>
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/internships"
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-600/20"
          >
            Browse More Internships
          </Link>
          <a
            href={companyPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            Open Company Website
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 font-medium mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden"
        >
          <div className="p-8 bg-indigo-600 text-white flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Company Application</h1>
              <p className="text-indigo-100 text-sm mt-1">
                Send the applicant profile directly to {internship.companyName}
              </p>
            </div>
            <Building2 className="w-10 h-10 text-indigo-200 opacity-60" />
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Full Name</label>
                <input
                  required
                  type="text"
                  value={formData.fullName}
                  onChange={(event) => handleChange("fullName", event.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">University</label>
                <input
                  required
                  type="text"
                  value={formData.university}
                  onChange={(event) => handleChange("university", event.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Department</label>
                <input
                  required
                  type="text"
                  value={formData.department}
                  onChange={(event) => handleChange("department", event.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 text-zinc-900 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Year</label>
                <select
                  required
                  value={formData.year}
                  onChange={(event) => handleChange("year", event.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 text-zinc-900 dark:text-white"
                >
                  {["1", "2", "3", "4", "5"].map((year) => (
                    <option key={year} value={year}>
                      Year {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Experience Level</label>
                <select
                  value={formData.experienceLevel}
                  onChange={(event) => handleChange("experienceLevel", event.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 text-zinc-900 dark:text-white"
                >
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(event) => handleChange("location", event.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 text-zinc-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Career Goal</label>
              <textarea
                rows={4}
                value={formData.goal}
                onChange={(event) => handleChange("goal", event.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 text-zinc-900 dark:text-white"
                placeholder="Describe the internship goal you want the company to see"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Bank Account</label>
              <input
                type="text"
                value={formData.bankAccount}
                onChange={(event) => handleChange("bankAccount", event.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 px-4 text-zinc-900 dark:text-white"
                placeholder="Optional unless the company requests it"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">Applicant CV</label>
              <div className="relative border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center hover:border-indigo-500/50 transition-all">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleCvUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-2">
                  <FileText className="w-8 h-8 text-indigo-600" />
                  <p className="font-bold text-zinc-900 dark:text-white">
                    {cvFile?.name || profile.cvFileName || "Upload the CV that should be sent to the company"}
                  </p>
                  <p className="text-xs text-zinc-500">
                    PDF, DOC, DOCX, PNG or JPG up to 5MB
                  </p>
                </div>
              </div>
              {!cvFile && profile.cvFileName ? (
                <p className="text-xs text-amber-600">
                  A previous CV name is saved in the profile, but upload the file again so the company receives the actual document.
                </p>
              ) : null}
            </div>

            {submitError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {submitError}
              </div>
            ) : null}

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-400 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Sending Application..." : "Send to Company"}
              </button>
            </div>
          </div>
        </form>

        <aside className="space-y-6">
          <div className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Backend Status</h2>
                <p className="text-sm text-zinc-500">
                  Live check for the company application API
                </p>
              </div>
              <div
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold ${
                  backendStatus === "online"
                    ? "bg-emerald-50 text-emerald-700"
                    : backendStatus === "offline"
                      ? "bg-red-50 text-red-700"
                      : "bg-amber-50 text-amber-700"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    backendStatus === "online"
                      ? "bg-emerald-500"
                      : backendStatus === "offline"
                        ? "bg-red-500"
                        : "bg-amber-500"
                  }`}
                />
                {backendStatus === "online"
                  ? "Online"
                  : backendStatus === "offline"
                    ? "Offline"
                    : "Checking"}
              </div>
            </div>
            {backendStatus === "offline" ? (
              <p className="mt-4 text-sm text-red-600">
                Start the app from the root with <span className="font-mono">npm run dev</span> so both frontend and backend run together.
              </p>
            ) : null}
          </div>

          <div className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-6">Submission Summary</h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-zinc-500">Company</p>
                <p className="font-bold text-zinc-900 dark:text-white">{internship.companyName}</p>
              </div>
              <div>
                <p className="text-zinc-500">Internship Status</p>
                <p className="font-bold text-zinc-900 dark:text-white">{internship.status}</p>
              </div>
              <div>
                <p className="text-zinc-500">Applicant Level</p>
                <p className="font-bold text-zinc-900 dark:text-white">
                  {profile.skillAssessment?.level || formData.experienceLevel}
                </p>
              </div>
              <div>
                <p className="text-zinc-500">Application Status</p>
                <p className="font-bold text-emerald-600">SUBMITTED on send</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-zinc-900 dark:text-white">What the company receives</h3>
            </div>
            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <p>Full applicant profile snapshot from the profile form.</p>
              <p>The uploaded CV file and its metadata.</p>
              <p>CV analysis status and score when available.</p>
              <p>Skill level assessment and score when available.</p>
            </div>
          </div>

          {(profile.cvAnalysis || profile.skillAssessment) ? (
            <div className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm space-y-4">
              <h3 className="font-bold text-zinc-900 dark:text-white">Applicant Signals</h3>
              {profile.cvAnalysis ? (
                <div>
                  <p className="text-sm text-zinc-500">CV Status</p>
                  <p className="font-bold text-zinc-900 dark:text-white">
                    {profile.cvAnalysis.isNormal ? "Good" : "Needs Improvement"} ({profile.cvAnalysis.score}%)
                  </p>
                </div>
              ) : null}
              {profile.skillAssessment ? (
                <div>
                  <p className="text-sm text-zinc-500">Skill Level</p>
                  <p className="font-bold text-zinc-900 dark:text-white">
                    {profile.skillAssessment.level} ({profile.skillAssessment.score}%)
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
};

export default CompanyApplicationForm;
