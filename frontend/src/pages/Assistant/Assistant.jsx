import React, { useState } from 'react';
import API from '../../services/api';
import { useFarm } from '../../context/FarmContext';
import { MessageSquare, Send, Bot, User, BookOpen, Loader2, Sparkles } from 'lucide-react';

const Assistant = () => {
  const { farmState } = useFarm();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello! I am your AgriSense AI Farming Assistant. I am connected to your active farm context (Active Crop: ${farmState.crop || 'Rice'}). Ask me anything about crop fertigation, fast growth methods, disease treatment, or soil management!`,
      sources: ['AgriSense Precision Engine']
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await API.post('/assistant/chat', {
        question: userMsg,
        context: farmState
      });
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: res.data.answer,
        sources: res.data.sources
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: 'Apologies, I encountered a connection issue. Please check your network and try again.',
        sources: []
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">AI Farming Assistant</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Context-aware RAG pipeline powered by LangChain & Gemini API</p>
          </div>
        </div>

        {farmState.crop && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Active Crop: {farmState.crop}</span>
          </div>
        )}
      </div>

      {/* Chat Conversation Box */}
      <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 overflow-y-auto space-y-4 shadow-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div className={`max-w-xl p-3.5 rounded-2xl text-xs space-y-1.5 ${
              msg.sender === 'user'
                ? 'bg-emerald-600 text-white rounded-br-none'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
            }`}>
              <p className="whitespace-pre-line">{msg.text}</p>
              {msg.sources && msg.sources.length > 0 && (
                <div className="pt-1 border-t border-slate-200/40 dark:border-slate-700/50 text-[10px] text-slate-400 flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-emerald-400" />
                  <span>Sources: {msg.sources.join(', ')}</span>
                </div>
              )}
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 justify-start items-center text-xs text-slate-400">
            <Bot className="w-4 h-4 animate-spin text-emerald-500" />
            <span>Analyzing agronomic knowledge base...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about ${farmState.crop || 'your crop'} (e.g. 'What should I do to grow ${farmState.crop || 'rice'} fast?')...`}
          className="flex-1 p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default Assistant;
