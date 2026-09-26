import React, { useState, useMemo } from 'react';
import { 
  Ruler, Search, Check, Copy, Sparkles, Scale, 
  ArrowRight, Maximize2, Sliders, Info, BookOpen 
} from 'lucide-react';
import { 
  HOOK_CONVERSION_DATA, 
  HOOK_MATERIALS_GUIDE, 
  HookSizeData 
} from '../data/hookConversionData';

interface HookConversionSectionProps {
  onOpenModal: () => void;
}

export const HookConversionSection: React.FC<HookConversionSectionProps> = ({ onOpenModal }) => {
  const [selectedHookId, setSelectedHookId] = useState<string>('hook-5-00'); // 5.0mm H-8
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'standard' | 'steel' | 'jumbo'>('standard');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Active hook object
  const activeHook: HookSizeData = useMemo(() => {
    return HOOK_CONVERSION_DATA.find(h => h.id === selectedHookId) || HOOK_CONVERSION_DATA[12];
  }, [selectedHookId]);

  // Quick slider index
  const standardHooks = useMemo(() => {
    return HOOK_CONVERSION_DATA.filter(h => h.category === 'standard');
  }, []);

  const filteredList = useMemo(() => {
    return HOOK_CONVERSION_DATA.filter(h => {
      if (activeCategory !== 'all' && h.category !== activeCategory) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        h.metricLabel.toLowerCase().includes(q) ||
        h.usSize.toLowerCase().includes(q) ||
        h.ukSize.toLowerCase().includes(q) ||
        (h.japaneseSize && h.japaneseSize.toLowerCase().includes(q)) ||
        h.yarnStandardName.toLowerCase().includes(q) ||
        h.yarnWeightCategory.toLowerCase().includes(q) ||
        h.bestProjects.some(p => p.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, activeCategory]);

  const handleCopy = (hook: HookSizeData) => {
    const summary = `${hook.metricLabel} (US ${hook.usSize} / UK ${hook.ukSize}) — Yarn: ${hook.yarnStandardName}`;
    navigator.clipboard?.writeText(summary);
    setCopiedId(hook.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Visual diameter pixel size: min 5px, max 48px
  const visualDiameter = Math.min(48, Math.max(6, Math.round(activeHook.metric * 2.4 + 4)));

  return (
    <section id="hook-conversion" className="py-14 sm:py-20 border-b border-stone-200 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-stone-200">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center p-1.5 bg-amber-100 text-amber-900 rounded-lg">
                <Ruler className="w-4 h-4 text-amber-800" />
              </span>
              <span className="text-[11px] font-sans uppercase tracking-widest text-amber-900 font-semibold">
                Maker Studio Interactive Gauge Guide
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight">
              Crochet Hook Conversion & Gauge Tool
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-sans leading-relaxed">
              Effortlessly convert vintage and international patterns between US letter codes, UK imperial gauges, and standard metric millimeters (mm).
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Open Fullscreen Studio Modal</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (7 cols): Active Converter & Visual Diameter */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Filter & Selector Bar */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Quick Select Hook Size:
                </span>
                <span className="text-xs text-stone-500 font-mono">
                  {activeHook.metricLabel} · US {activeHook.usSize}
                </span>
              </div>

              {/* Horizontal Scrollable Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
                {standardHooks.map((h) => {
                  const isSelected = h.id === activeHook.id;
                  return (
                    <button
                      key={h.id}
                      onClick={() => setSelectedHookId(h.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer border flex flex-col items-center min-w-[4.2rem] ${
                        isSelected
                          ? 'bg-amber-900 text-white border-amber-900 shadow-md scale-105'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      <span className="font-mono font-bold text-xs">{h.metricLabel}</span>
                      <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                        {h.usSize}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 3-WAY HERO CONVERSION CARDS */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                
                {/* Metric */}
                <div className="bg-amber-50/70 border border-amber-200/90 rounded-xl p-3.5 text-center transition-all">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-900 block mb-1">
                    Metric (mm)
                  </span>
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-950">
                    {activeHook.metricLabel}
                  </div>
                  <span className="text-[11px] text-amber-800 font-sans block mt-1">
                    Actual shaft diameter
                  </span>
                </div>

                {/* US Size */}
                <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-3.5 text-center transition-all">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block mb-1">
                    US Standard
                  </span>
                  <div className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
                    {activeHook.usSize}
                  </div>
                  <span className="text-[11px] text-stone-500 font-sans block mt-1">
                    Letter & Number
                  </span>
                </div>

                {/* UK / Imperial */}
                <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-3.5 text-center transition-all">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-stone-500 block mb-1">
                    UK / Canadian
                  </span>
                  <div className="font-mono text-2xl sm:text-3xl font-bold text-stone-900">
                    {activeHook.ukSize}
                  </div>
                  <span className="text-[11px] text-stone-500 font-sans block mt-1">
                    Wire Gauge / Imperial
                  </span>
                </div>

              </div>

              {/* Hook Details Card */}
              <div className="bg-stone-50/80 rounded-xl p-4 border border-stone-200/80 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-stone-500 font-semibold uppercase tracking-wider text-[10px] block">
                      Yarn Standard Match:
                    </span>
                    <span className="font-medium text-stone-900 text-sm">
                      {activeHook.yarnWeightCategory}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-500 font-semibold uppercase tracking-wider text-[10px] block">
                      Recommended Gauge:
                    </span>
                    <span className="font-mono text-stone-800 font-semibold text-xs">
                      {activeHook.typicalGauge}
                    </span>
                  </div>
                </div>

                <div className="border-t border-stone-200 pt-3">
                  <span className="text-stone-500 font-semibold uppercase tracking-wider text-[10px] block mb-1">
                    Ideal Projects:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeHook.bestProjects.map((p, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded-full text-[11px] bg-white border border-stone-200 text-stone-700 font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Notes and copy button */}
                <div className="border-t border-stone-200 pt-3 flex items-center justify-between gap-3">
                  <p className="text-xs text-stone-600 italic">
                    "{activeHook.notes}"
                  </p>

                  <button
                    onClick={() => handleCopy(activeHook)}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:bg-stone-100 text-stone-800 font-medium shrink-0 transition-colors cursor-pointer"
                  >
                    {copiedId === activeHook.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Visual Scale Diagram */}
              <div className="p-4 bg-stone-100/60 rounded-xl border border-stone-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="rounded-full bg-stone-900 border-2 border-amber-600 shadow-md transition-all duration-300 shrink-0"
                    style={{ width: `${visualDiameter}px`, height: `${visualDiameter}px` }}
                  />
                  <div>
                    <div className="text-xs font-semibold text-stone-900">
                      Cross-Section Visual Scale ({activeHook.metricLabel})
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Proportional diameter relative to standard yarn hooks
                    </div>
                  </div>
                </div>

                <button
                  onClick={onOpenModal}
                  className="text-xs font-medium text-amber-900 hover:text-amber-950 underline underline-offset-2 shrink-0 cursor-pointer"
                >
                  Adjust Swatch Gauge →
                </button>
              </div>

            </div>

          </div>

          {/* Right Column (5 cols): Master Reference Table & Search */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
              
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-serif text-lg font-medium text-stone-900">
                  Searchable Conversion Chart
                </h3>
                <span className="text-[11px] font-mono text-stone-500">
                  {filteredList.length} sizes
                </span>
              </div>

              {/* Filter tabs */}
              <div className="grid grid-cols-3 gap-1 bg-stone-100 p-1 rounded-lg text-[11px] font-medium text-center">
                <button
                  onClick={() => setActiveCategory('standard')}
                  className={`py-1 rounded-md transition-colors cursor-pointer ${
                    activeCategory === 'standard' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Standard
                </button>
                <button
                  onClick={() => setActiveCategory('steel')}
                  className={`py-1 rounded-md transition-colors cursor-pointer ${
                    activeCategory === 'steel' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Steel Lace
                </button>
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`py-1 rounded-md transition-colors cursor-pointer ${
                    activeCategory === 'all' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  All (Jumbo)
                </button>
              </div>

              {/* Search box */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Filter by metric (4.0mm), US (H-8), or UK size..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-900"
                />
              </div>

              {/* Table */}
              <div className="border border-stone-200 rounded-xl overflow-hidden max-h-[380px] overflow-y-auto scrollbar-thin">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="sticky top-0 bg-[#F5F2ED] text-stone-700 font-semibold uppercase text-[10px] tracking-wider border-b border-stone-200 z-10">
                    <tr>
                      <th className="py-2 px-2.5">Metric</th>
                      <th className="py-2 px-2.5">US</th>
                      <th className="py-2 px-2.5">UK</th>
                      <th className="py-2 px-2 text-right">Select</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredList.map((h) => {
                      const isCurrent = h.id === activeHook.id;
                      return (
                        <tr
                          key={h.id}
                          onClick={() => setSelectedHookId(h.id)}
                          className={`hover:bg-amber-50/60 cursor-pointer transition-colors ${
                            isCurrent ? 'bg-amber-100/50 font-semibold' : ''
                          }`}
                        >
                          <td className="py-2 px-2.5 font-mono text-stone-900">
                            {h.metricLabel}
                          </td>
                          <td className="py-2 px-2.5 font-serif text-stone-800">
                            {h.usSize}
                          </td>
                          <td className="py-2 px-2.5 font-mono text-stone-600">
                            {h.ukSize}
                          </td>
                          <td className="py-2 px-2 text-right">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                              isCurrent ? 'bg-amber-900 text-white' : 'text-stone-400'
                            }`}>
                              {isCurrent ? 'Active' : 'Pick'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
