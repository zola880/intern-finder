import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Loader2,
  BrainCircuit,
  Lightbulb,
  Target,
  MapPin,
  GraduationCap,
  Briefcase,
  Users,
  TrendingUp
} from "lucide-react";
import { useProfile } from "../hooks/useProfile";
import { INTERNSHIPS } from "../data/internships";

const AIAssistant = () => {
  const { profile } = useProfile();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello! I'm your AI Career Assistant. I can help you with internship advice tailored to Ethiopian students. Based on your profile, I can provide personalized guidance for your career journey.

What would you like to know about internships in Ethiopia?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const aiResponses = {
    "career goals": `Based on your profile as a ${profile.department || "student"}, here are some career goals you should consider:

🎯 **Short-term Goals (3-6 months):**
• Complete your current degree with excellent grades
• Build a strong portfolio of projects
• Network with professionals in your field

🎯 **Medium-term Goals (6-12 months):**
• Secure an internship at a reputable Ethiopian company
• Develop in-demand technical skills
• Gain practical experience in your chosen field

🎯 **Long-term Goals (1-2 years):**
• Transition to a full-time position
• Consider advanced certifications
• Build a professional network in Ethiopia's growing tech ecosystem`,

    "skills": `Here are essential skills for Ethiopian internship seekers in ${profile.field || "tech"}:

🛠️ **Technical Skills:**
• Programming languages (Python, JavaScript, Java)
• Web development (React, Node.js)
• Database management (SQL, MongoDB)
• Version control (Git, GitHub)

💡 **Soft Skills:**
• Communication and teamwork
• Problem-solving abilities
• Time management
• Adaptability and learning agility

📚 **Industry-Specific Skills:**
• Understanding of Ethiopian market
• Basic business acumen
• Project management basics
• Digital literacy`,

    "companies": `Here are top Ethiopian companies offering internships:

🏢 **Technology Companies:**
• ${INTERNSHIPS.slice(0, 3).map(i => i.companyName).join('\n• ')}

🏢 **Financial Services:**
• Dashen Bank, Awash Bank, Commercial Bank of Ethiopia

🏢 **Telecommunications:**
• Ethio Telecom, Safaricom Ethiopia

🏢 **Other Industries:**
• Ethiopian Airlines, Pharmaceuticals (like Julphar)

💡 **Pro Tip:** Focus on companies that align with your interests and offer growth opportunities!`,

    "cv": `Here's how to create a compelling CV for Ethiopian internships:

📄 **Structure Your CV:**
• Contact information at the top
• Professional summary (2-3 sentences)
• Education (most recent first)
• Skills section
• Projects/Experience
• Extracurricular activities

✨ **Ethiopian Context Tips:**
• Include your CGPA if above 3.0
• Mention relevant coursework
• Highlight any Ethiopian language skills
• Include volunteer work or community service

🎯 **Key Advice:**
• Keep it to 1 page
• Use action verbs
• Quantify achievements where possible
• Tailor for each application`,

    "interview": `Interview preparation tips for Ethiopian internships:

🎤 **Common Interview Questions:**
• "Tell me about yourself"
• "Why do you want to intern here?"
• "What are your strengths and weaknesses?"
• "Where do you see yourself in 5 years?"

💬 **Ethiopian-Specific Advice:**
• Research the company's role in Ethiopia's economy
• Prepare examples from your university projects
• Show enthusiasm for Ethiopia's development
• Practice speaking confidently

🕒 **Interview Process:**
• Technical assessment
• HR interview
• Sometimes case studies or group exercises

💡 **Remember:** Be yourself, show passion, and demonstrate that you've researched the company!`
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setMessages(prev => [...prev, {
      role: "user",
      content: userMessage,
      timestamp: new Date()
    }]);
    setInput("");
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const lowerInput = userMessage.toLowerCase();
      let response = "I'd be happy to help you with that! Could you be more specific about what you'd like to know about internships in Ethiopia?";

      // Match user input to predefined responses
      if (lowerInput.includes("career") || lowerInput.includes("goal")) {
        response = aiResponses["career goals"];
      } else if (lowerInput.includes("skill") || lowerInput.includes("learn")) {
        response = aiResponses["skills"];
      } else if (lowerInput.includes("company") || lowerInput.includes("where")) {
        response = aiResponses["companies"];
      } else if (lowerInput.includes("cv") || lowerInput.includes("resume")) {
        response = aiResponses["cv"];
      } else if (lowerInput.includes("interview") || lowerInput.includes("prepare")) {
        response = aiResponses["interview"];
      }

      setMessages(prev => [...prev, {
        role: "assistant",
        content: response,
        timestamp: new Date()
      }]);
      setIsLoading(false);
    }, 1000);
  };

  const quickQuestions = [
    { icon: Target, text: "What are my career goals?", key: "career goals" },
    { icon: Lightbulb, text: "What skills do I need?", key: "skills" },
    { icon: Briefcase, text: "Which companies hire interns?", key: "companies" },
    { icon: GraduationCap, text: "How to write a good CV?", key: "cv" },
    { icon: Users, text: "How to prepare for interviews?", key: "interview" }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-indigo-600" />
            AI Career Assistant
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">Get personalized guidance for internships in Ethiopia</p>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] overflow-hidden flex flex-col shadow-sm relative">
        {/* Chat Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-8">
              <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl flex items-center justify-center border border-indigo-100 dark:border-indigo-800">
                <Bot className="w-10 h-10 text-indigo-600" />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Ready to help you grow</h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Ask me anything about internships and career guidance in Ethiopia!
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 w-full">
                {quickQuestions.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(item.text)}
                    className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-sm text-zinc-600 dark:text-zinc-400 hover:border-indigo-500/30 transition-all text-left"
                  >
                    <item.icon className="w-4 h-4 text-indigo-600" />
                    {item.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                  msg.role === "user"
                    ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                    : "bg-indigo-600/10 border-indigo-500/20"
                }`}>
                  {msg.role === "user" ? <User className="w-5 h-5 text-zinc-500" /> : <Bot className="w-5 h-5 text-indigo-600" />}
                </div>
                <div className={`max-w-[80%] px-5 py-4 rounded-2xl leading-relaxed text-[15px] ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </motion.div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 px-5 py-4 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your career..."
              className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-zinc-900 dark:text-white shadow-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-300 text-white rounded-xl flex items-center justify-center transition-all shadow-lg shadow-indigo-600/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;


