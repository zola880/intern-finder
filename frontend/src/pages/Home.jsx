import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Sparkles, Globe, ShieldCheck, Zap } from "lucide-react";
import { INTERNSHIPS } from "../data/internships";
import InternshipCard from "../components/InternshipCard";

const Home = () => {
  const featuredInternships = INTERNSHIPS.filter(i => i.status === "Open").slice(0, 3);

  return (
    <div className="flex flex-col gap-24 pb-24 bg-white dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-violet-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] -z-10 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.08)_0%,_transparent_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.03)_0%,_transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-emerald-200 dark:border-emerald-800/50 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Career Platform
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-8 leading-[1.1]"
          >
            Find Internship Opportunities <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-violet-600 dark:from-emerald-400 dark:to-violet-400">
              Easily in Ethiopia
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Connecting ambitious Ethiopian students with top-tier companies. Get personalized AI guidance, verified listings, and a seamless application process.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/internships"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 group"
            >
              Explore Internships
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/ai-assistant"
              className="w-full sm:w-auto px-8 py-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-2xl font-bold text-lg transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:border-emerald-300 dark:hover:border-emerald-700 flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Try AI Assistant
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">How EthioIntern AI Works</h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">Your journey to a professional career starts here. Follow these simple steps to land your dream internship.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { title: "Browse", desc: "Explore hundreds of verified internship listings across various fields.", icon: Globe },
            { title: "View Details", desc: "Learn about the company, requirements, and application deadlines.", icon: Zap },
            { title: "Apply", desc: "Submit your application directly through our streamlined form.", icon: ShieldCheck },
            { title: "AI Guidance", desc: "Get personalized recommendations and advice from our AI consultant.", icon: Sparkles },
          ].map((step, i) => (
            <div key={i} className="relative p-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-3xl group hover:border-emerald-500/50 hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-950/50 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <step.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-white mb-3">{i + 1}. {step.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Internships */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">Featured Opportunities</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Hand-picked internships from top Ethiopian companies.</p>
          </div>
          <Link to="/internships" className="hidden sm:flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold hover:gap-3 transition-all">
            View All
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredInternships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      </section>

      {/* Features Section – Vibrant gradient card */}
      <section className="relative mx-4 sm:mx-8 rounded-[3rem] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-violet-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2)_0%,_transparent_60%)]" />
        
        <div className="relative py-20 px-8 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 tracking-tight">Why Choose EthioIntern AI?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {[
                "Verified internship listings from trusted companies",
                "Direct links to official company websites",
                "AI-powered career assistant for personalized advice",
                "Easy and streamlined application process",
                "Bookmark and track your favorite opportunities",
                "Professional student profile management"
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
                  <CheckCircle2 className="w-6 h-6 text-emerald-200 flex-shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;