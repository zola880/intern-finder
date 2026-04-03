import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Briefcase, Sparkles, User, Sun, Moon, Menu, X, LogOut, PlusCircle, Shield } from "lucide-react";
import { useProfile } from "../hooks/useProfile";

const Navbar = () => {
  const { user, isDarkMode, toggleDarkMode, logout } = useProfile();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Base nav links for all users
  const baseNavLinks = [
    { name: "Home", path: "/" },
    { name: "Internships", path: "/internships" },
    { name: "AI Assistant", path: "/ai-assistant" },
    { name: "Profile", path: "/profile" },
  ];

  // Add role‑specific links
  const getNavLinks = () => {
    const links = [...baseNavLinks];
    if (user) {
      // Any authenticated user can post an internship
      links.push({ name: "Post Internship", path: "/post-internship", icon: PlusCircle });
      // Only admin sees the admin panel
      if (user.role === "ADMIN") {
        links.push({ name: "Admin Panel", path: "/admin", icon: Shield });
      }
    }
    return links;
  };

  const navLinks = getNavLinks();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Briefcase className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-zinc-900 dark:text-white">
              EthioIntern<span className="text-indigo-600">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                  location.pathname === link.path 
                    ? "text-indigo-600" 
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center gap-4 pl-4 border-l border-zinc-200 dark:border-zinc-800">
              <button
                onClick={toggleDarkMode}
                className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {user.fullName?.split(" ")[0]}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleDarkMode} className="p-2 text-zinc-600 dark:text-zinc-400">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-zinc-600 dark:text-zinc-400">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 py-6 space-y-4"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-zinc-600 dark:text-zinc-400"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            {user ? (
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="w-full text-left text-lg font-medium text-red-600"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block text-lg font-medium text-indigo-600"
              >
                Login
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;