"use client";

import { askAI } from "@/lib/geminiService";
import React, { useState, useRef, useEffect } from "react";

const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; text: string }[]
  >([
    {
      role: "bot",
      text: "Systems ready. How can I assist you with this portfolio?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    const aiResponse = await askAI(userMessage);

    setIsTyping(false);
    setMessages((prev) => [
      ...prev,
      { role: "bot", text: aiResponse || "Unable to process request." },
    ]);
  };

  return (
    <div className="fixed bottom-10 right-10 z-[60]">
      {isOpen ? (
        <div className="w-80 md:w-[400px] bg-black border border-white/20 shadow-[20px_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
            <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase">
              Core Assistant V.1.0
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:rotate-90 transition-transform"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div
            ref={scrollRef}
            className="h-80 overflow-y-auto p-6 space-y-6 font-mono text-xs"
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  m.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <span className="text-[8px] text-white/30 mb-1 uppercase tracking-widest">
                  {m.role}
                </span>
                <div
                  className={`p-4 ${
                    m.role === "user"
                      ? "bg-white text-black font-bold"
                      : "bg-white/5 text-gray-400 border border-white/10"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 text-white/20 animate-pulse">
                <span>[PROCESS_ANALYZING...]</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-6 border-t border-white/10">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="TYPE_QUERY_HERE..."
                className="flex-1 bg-transparent border-b border-white/20 pb-2 text-xs font-mono focus:outline-none focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="hover:scale-125 transition-transform"
                disabled={isTyping}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-4 bg-white text-black font-black text-xs uppercase tracking-[0.3em] hover:bg-gray-200 transition-all shadow-xl flex items-center gap-3"
        >
          <span className="w-2 h-2 bg-black rounded-full animate-pulse"></span>
          Assistant
        </button>
      )}
    </div>
  );
};

export default AIChatAssistant;
