import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Landmark, Search, ExternalLink, Bookmark, CheckCircle2, ShieldCheck } from 'lucide-react';

const categories = [
  'All', 'PM-KISAN', 'Crop Insurance', 'Soil Health Card', 
  'Kisan Credit Card', 'Organic Farming', 'Irrigation', 'Farm Mechanization'
];

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const res = await API.get('/schemes/list', {
          params: { category: selectedCategory, query: searchQuery }
        });
        setSchemes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSchemes();
  }, [selectedCategory, searchQuery]);

  const toggleBookmark = (id) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(b => b !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20">
          <Landmark className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Government Schemes & Subsidies</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Discover eligible central & state agricultural support with direct official portal redirect</p>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scheme title or benefit..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schemes.map((scheme) => (
          <div key={scheme.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between hover:border-amber-400 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  {scheme.category}
                </span>
                <button
                  onClick={() => toggleBookmark(scheme.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    bookmarks.includes(scheme.id) ? 'text-amber-500 fill-amber-500' : 'text-slate-400 hover:text-amber-500'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                {scheme.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400">
                {scheme.short_description}
              </p>

              <div className="pt-2 space-y-1.5 text-xs">
                <p className="text-slate-700 dark:text-slate-300"><b>Eligibility:</b> {scheme.eligibility}</p>
                <p className="text-slate-700 dark:text-slate-300"><b>Benefits:</b> {scheme.benefits}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Updated: {scheme.last_updated}</span>
              
              {/* Secure Redirect Button to Official Govt Website */}
              <a
                href={scheme.official_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all"
              >
                Apply on Official Site <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Schemes;
