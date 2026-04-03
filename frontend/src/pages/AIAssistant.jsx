import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Loader2,
  BrainCircuit,
  Lightbulb,
  Target,
  GraduationCap,
  Briefcase,
  Users,
} from "lucide-react";
import { useProfile } from "../hooks/useProfile";
// No API import – Puter.js is loaded globally from index.html

const AIAssistant = () => {
  const { user } = useProfile();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hello! I'm your AI Career Assistant. I can help you with internship advice tailored to Ethiopian students. Based on your profile, I can provide personalized guidance for your career journey.\n\nWhat would you like to know about internships in Ethiopia?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Build conversation history as a single string for context
  const buildConversationContext = () => {
    return messages
      .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n\n");
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    // Add user message to UI immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      },
    ]);
    setInput("");
    setIsLoading(true);

    try {
      // Use Puter.js AI – no API key required
      // Include the conversation history so the AI remembers context
      const fullPrompt = buildConversationContext() + `\n\nUser: ${userMessage}\nAssistant:`;
      
      // Call puter.ai.chat – ensure puter is available (script loaded in index.html)
      const response = await puter.ai.chat(fullPrompt, { 
        model: "gpt-4.1-nano"  // you can change to "gpt-3.5-turbo" or others
      });
      
      // The response structure: response.message.content or response directly
      const aiReply = response.message?.content || response;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiReply,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Puter AI error:", error);
      let errorMessage = "Sorry, the AI service is currently unavailable. Please try again later.";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    { icon: Target, text: "What are my career goals?" },
    { icon: Lightbulb, text: "What skills do I need?" },
    { icon: Briefcase, text: "Which companies hire interns?" },
    { icon: GraduationCap, text: "How to write a good CV?" },
    { icon: Users, text: "How to prepare for interviews?" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-indigo-600" />
            AI Career Assistant
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Get personalized guidance for internships in Ethiopia
          </p>
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
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  Ready to help you grow
                </h3>
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
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                    msg.role === "user"
                      ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                      : "bg-indigo-600/10 border-indigo-500/20"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-5 h-5 text-zinc-500" />
                  ) : (
                    <Bot className="w-5 h-5 text-indigo-600" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] px-5 py-4 rounded-2xl leading-relaxed text-[15px] ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200"
                  }`}
                >
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