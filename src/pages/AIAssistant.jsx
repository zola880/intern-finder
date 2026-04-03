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
  GraduationCap
} from "lucide-react";
import { ai, MODELS } from "../lib/gemini";
import { useProfile } from "../hooks/useProfile";
import { INTERNSHIPS } from "../data/internships";

const AIAssistant = () => {
  const { profile } = useProfile();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const generateAdvice = async () => {
    if (isLoading) return;
    
    const userPrompt = `
      I am a student looking for an internship in Ethiopia.
      Name: ${profile.fullName || "Student"}
      Department: ${profile.department || "Not specified"}
      University: ${profile.university || "Not specified"}
      Year: ${profile.year}
      Experience Level: ${profile.experienceLevel}
      Goal: ${profile.goal}
      Location: ${profile.location}
      
      Based on this profile and the following available internships:
      ${INTERNSHIPS.map(i => `- ${i.companyName} in ${i.location} (${i.field})`).join("\n")}
      
      Please provide:
      1. Suggested internship types for me.
      2. Recommended companies from the list above.
      3. Advice on skills I should improve.
      4. Guidance for a first-time applicant like me.
      
      Keep the tone professional, encouraging, and specific to the Ethiopian context.
    `;

    setMessages(prev => [...prev, { role: "user", content: "Can you give me career guidance based on my profile?" }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: MODELS.FLASH,
        contents: userPrompt,
      });

      setMessages(prev => [...prev, { role: "model", content: response.text || "I'm sorry, I couldn't generate advice right now." }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: "model", content: "I encountered an error while analyzing your profile. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: MODELS.FLASH,
        contents: `Context: I am an internship consultant for Ethiopian students. User profile: ${JSON.stringify(profile)}. User question: ${userMessage}`,
      });

      setMessages(prev => [...prev, { role: "model", content: response.text || "I'm not sure how to answer that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "model", content: "Error connecting to AI service." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-indigo-600" />
            AI Career Consultant
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">Get personalized guidance powered by Gemini AI.</p>
        </div>
        
        {messages.length === 0 && (
          <button
            onClick={generateAdvice}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Analyze My Profile
          </button>
        )}
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
                  Click the button above to get a full career analysis based on your profile, or ask me anything about internships in Ethiopia.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 w-full">
                {[
                  { icon: Target, text: "What skills do I need for IT internships?" },
                  { icon: Lightbulb, text: "How to write a good CV for Safaricom?" },
                  { icon: MapPin, text: "Best locations for engineering roles?" }
                ].map((item, i) => (
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
