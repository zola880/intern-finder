import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Briefcase, Sun, Moon, Menu, X, LogOut, User, PlusCircle, Shield } from "lucide-react";
import { useProfile } from "../hooks/useProfile";

const Navbar = () => {
  const { user, isDarkMode, toggleDarkMode, logout } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Center navigation links (Profile removed from here)
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Internships", path: "/internships" },
    { name: "AI Assistant", path: "/ai-assistant" },
  ];

  // Role‑specific links (still in center)
  if (user) {
    navLinks.push({ name: "Post Internship", path: "/post-internship" });
    if (user.role === "ADMIN") {
      navLinks.push({ name: "Admin Panel", path: "/admin" });
    }
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Briefcase className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-zinc-900 dark:text-white">
              EthioIntern<span className="text-indigo-600">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation (center) */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "text-indigo-600"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-indigo-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side: theme toggle + user area (profile + logout) */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                {/* Profile link with icon and name */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>{user.fullName?.split(" ")[0] || "Profile"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-base text-zinc-600 dark:text-zinc-400 hover:text-indigo-600"
            >
              {link.name}
            </Link>
          ))}
          {/* Also show profile in mobile menu for convenience */}
          {user && (
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-base text-zinc-600 dark:text-zinc-400 hover:text-indigo-600"
            >
              Profile
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;