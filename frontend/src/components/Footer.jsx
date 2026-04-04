import React from "react";// Footer component with company info, quick links, and social media icons
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="font-bold text-2xl tracking-tight text-zinc-900 dark:text-white">
                EthioIntern<span className="text-indigo-600">AI</span>
              </span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
              Empowering the next generation of Ethiopian professionals by connecting students with top-tier internship opportunities and AI-driven career guidance.
            </p>
            <div className="flex gap-4 mt-8">
              {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="p-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-6">Platform</h4>
            <ul className="space-y-4 text-zinc-600 dark:text-zinc-400 text-sm">
              <li><Link to="/internships" className="hover:text-indigo-600 transition-colors">Browse Internships</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-indigo-600 transition-colors">AI Career Guide</Link></li>
              <li><Link to="/profile" className="hover:text-indigo-600 transition-colors">Student Profile</Link></li>
              <li><Link to="#" className="hover:text-indigo-600 transition-colors">For Employers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-zinc-600 dark:text-zinc-400 text-sm">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@ethiointern.ai</li>
              <li>Addis Ababa, Ethiopia</li>
              <li>Bole Road, Mega Building</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500 dark:text-zinc-500">
          <p>© 2026 EthioIntern AI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
