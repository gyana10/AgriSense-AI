import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { TrendingUp, Search, RefreshCw } from 'lucide-react';

const Market = () => {
  const [prices, setPrices] = useState([]);
  const [cropFilter, setCropFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    setLoading(true);
    try {
      const res = await API.get('/market/prices', { params: { crop: cropFilter } });
      setPrices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, [cropFilter]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-600/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Agricultural Market Intelligence</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Live commodity prices, modal rates, and market arrivals</p>
          </div>
        </div>

        <button
          onClick={fetchPrices}
          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
          title="Refresh Prices"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Filter */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={cropFilter}
          onChange={(e) => setCropFilter(e.target.value)}
          placeholder="Filter by crop name (e.g. Rice, Wheat, Potato)..."
          className="w-full bg-transparent text-xs font-semibold text-slate-900 dark:text-white focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <th className="p-4">Crop Commodity</th>
              <th className="p-4">Market Yard</th>
              <th className="p-4">District & State</th>
              <th className="p-4">Arrival Qty</th>
              <th className="p-4">Min / Max Price</th>
              <th className="p-4 text-right">Modal Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {prices.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-bold text-slate-900 dark:text-white">{item.crop}</td>
                <td className="p-4 text-slate-600 dark:text-slate-300">{item.market}</td>
                <td className="p-4 text-slate-500">{item.district}, {item.state}</td>
                <td className="p-4 text-slate-600 dark:text-slate-300">{item.arrival_quantity_quintals} qtl</td>
                <td className="p-4 text-slate-500">₹{item.min_price_inr} - ₹{item.max_price_inr}</td>
                <td className="p-4 text-right font-black text-emerald-600 dark:text-emerald-400 text-sm">
                  ₹{item.modal_price_inr} / qtl
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Market;
