import React, { useState } from 'react';
import API from '../../services/api';
import { useFarm } from '../../context/FarmContext';
import { MessageSquare, Send, Bot, User, X, Mic, Sparkles, Loader2 } from 'lucide-react';

const FloatingAssistant = () => {
  const { farmState } = useFarm();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: `Hi! I'm your AgriSense AI Farming Assistant. How can I help optimize your ${farmState.crop || 'crop'} today?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedPrompts = [
    `How to grow ${farmState.crop || 'rice'} fast?`,
    'NPK fertilizer calculation',
    'Fungal blight remedies',
    'Irrigation timing advice'
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setLoading(true);

    try {
      const res = await API.post('/assistant/chat', {
        question: query,
        context: farmState
      });
      setMessages(prev => [...prev, { sender: 'bot', text: res.data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error connecting to agronomic engine.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="p-4 rounded-full bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-2xl shadow-emerald-600/50 hover:scale-110 transition-transform flex items-center gap-2 font-bold text-xs group"
        >
          <Bot className="w-6 h-6 animate-bounce" />
          <span className="hidden sm:inline font-black">AI Agronomist</span>
        </button>
      )}

      {/* Floating Glass Chat Box */}
      {open && (
        <div className="w-[360px] sm:w-[420px] h-[520px] rounded-3xl glass-panel shadow-2xl border border-emerald-500/30 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/30 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black">AgriSense AI Assistant</h4>
                <p className="text-[10px] text-emerald-200">Active Crop: {farmState.crop || 'Rice'}</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 text-slate-300 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-line ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none font-medium'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-500" />
                <span>Thinking...</span>
              </div>
            )}
          </div>

          {/* Suggested Prompts Pills */}
          <div className="px-3 py-2 bg-slate-50/50 dark:bg-slate-900/50 flex gap-1.5 overflow-x-auto text-[10px]">
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 shrink-0 font-bold"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
            <button type="button" className="p-2 text-slate-400 hover:text-emerald-500">
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 bg-emerald-600 text-white rounded-xl disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};

export default FloatingAssistant;
