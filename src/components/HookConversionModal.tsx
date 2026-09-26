import React, { useState, useMemo } from 'react';
import { 
  Ruler, X, Search, Check, Copy, Sliders, 
  HelpCircle, ArrowRight, Sparkles, Scale,
  Info, ExternalLink
} from 'lucide-react';
import { 
  HOOK_CONVERSION_DATA, 
  HOOK_MATERIALS_GUIDE, 
  HOOK_ANATOMY_PARTS,
  HookSizeData 
} from '../data/hookConversionData';

interface HookConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialHookId?: string;
}

export const HookConversionModal: React.FC<HookConversionModalProps> = ({
  isOpen,
  onClose,
  initialHookId = 'hook-5-00'
}) => {
  if (!isOpen) return null;

  const [selectedHookId, setSelectedHookId] = useState<string>(initialHookId);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'standard' | 'steel' | 'jumbo'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Interactive Gauge Tension Adjuster state
  const [targetGaugeStitches, setTargetGaugeStitches] = useState<number>(14);
  const [actualGaugeStitches, setActualGaugeStitches] = useState<number>(14);

  // Active selected hook
  const activeHook: HookSizeData = useMemo(() => {
    return HOOK_CONVERSION_DATA.find(h => h.id === selectedHookId) || HOOK_CONVERSION_DATA[12]; // default 5.0mm H-8
  }, [selectedHookId]);

  // Filtered hooks list for the search table
  const filteredHooks = useMemo(() => {
    return HOOK_CONVERSION_DATA.filter(h => {
      // Category filter
      if (activeCategoryFilter !== 'all' && h.category !== activeCategoryFilter) {
        return false;
      }
      // Text query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        h.metricLabel.toLowerCase().includes(q) ||
        h.usSize.toLowerCase().includes(q) ||
        h.ukSize.toLowerCase().includes(q) ||
        (h.japaneseSize && h.japaneseSize.toLowerCase().includes(q)) ||
        h.yarnStandardName.toLowerCase().includes(q) ||
        h.yarnWeightCategory.toLowerCase().includes(q) ||
        h.bestProjects.some(p => p.toLowerCase().includes(q)) ||
        h.notes.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, activeCategoryFilter]);

  const handleCopySummary = (hook: HookSizeData) => {
    const text = `Crochet Hook: ${hook.metricLabel} | US: ${hook.usSize} | UK: ${hook.ukSize} | Yarn: ${hook.yarnStandardName}`;
    navigator.clipboard?.writeText(text);
    setCopiedId(hook.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Calculate tension advice
  const gaugeDifference = actualGaugeStitches - targetGaugeStitches;
  const gaugeAdvice = useMemo(() => {
    if (gaugeDifference === 0) {
      return {
        status: 'perfect',
        title: 'Spot-on Gauge Match!',
        message: 'Your stitch tension matches the pattern recommendation perfectly. Continue with your current hook size.'
      };
    } else if (gaugeDifference > 0) {
      // Too many stitches in 4 inches = stitches are too tight / small!
      const step = gaugeDifference >= 3 ? '1.0 mm (two sizes)' : '0.5 mm (one size)';
      return {
        status: 'tight',
        title: 'Your Swatch Is Too Tight (Stitches too small)',
        message: `You have ${gaugeDifference} extra stitch${gaugeDifference > 1 ? 'es' : ''} per 4 inches. Switch to a hook ${step} LARGER to relax your tension and meet gauge.`
      };
    } else {
      // Too few stitches in 4 inches = stitches are too loose / big!
      const absDiff = Math.abs(gaugeDifference);
      const step = absDiff >= 3 ? '1.0 mm (two sizes)' : '0.5 mm (one size)';
      return {
        status: 'loose',
        title: 'Your Swatch Is Too Loose (Stitches too large)',
        message: `You have ${absDiff} fewer stitch${absDiff > 1 ? 'es' : ''} than required per 4 inches. Switch to a hook ${step} SMALLER to tighten your fabric.`
      };
    }
  }, [gaugeDifference, targetGaugeStitches, actualGaugeStitches]);

  // Scaled diameter visual representation
  // Scale mapping: 0.6mm -> 4px, 25mm -> 64px
  const visualHookDiameter = Math.min(64, Math.max(5, Math.round(activeHook.metric * 2.5 + 4)));

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-[#FAF8F5] border border-stone-300 rounded-2xl max-w-4xl w-full p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[92vh] shadow-2xl flex flex-col gap-6 text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center p-1.5 bg-amber-100 text-amber-900 rounded-lg">
                <Ruler className="w-4 h-4 text-amber-800" />
              </span>
              <span className="text-[11px] font-sans uppercase tracking-widest text-amber-900 font-semibold">
                Maker Studio Precision Utility
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900">
              Universal Crochet Hook Conversion Tool
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-2xl leading-relaxed">
              Instant conversions across Metric (mm), US letters & numbers, UK/Canadian imperial gauges, and Japanese notation, paired with recommended yarn weights and gauge behavior.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer shrink-0"
            aria-label="Close hook conversion modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SECTION 1: INSTANT REACTIVE CONVERTER CARDS */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">
              Select or Tap Any Hook Size:
            </label>
            <span className="text-xs text-stone-500 font-mono">
              Currently Active: <strong className="text-stone-900">{activeHook.metricLabel}</strong> ({activeHook.usSize} / UK {activeHook.ukSize})
            </span>
          </div>

          {/* Quick Pill Selector Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {HOOK_CONVERSION_DATA.map((hook) => {
              const isSelected = hook.id === activeHook.id;
              return (
                <button
                  key={hook.id}
                  onClick={() => setSelectedHookId(hook.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                    isSelected 
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm scale-105' 
                      : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  <span className="font-mono font-semibold">{hook.metricLabel}</span>
                  <span className="ml-1 opacity-70 text-[10px]">({hook.usSize})</span>
                </button>
              );
            })}
          </div>

          {/* Main 4-Way Conversion Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-stone-200/90 shadow-sm">
            {/* Metric Card */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-3 text-center">
              <span className="text-[10px] uppercase tracking-wider text-amber-900/80 font-bold block mb-1">
                Metric (Universal mm)
              </span>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-amber-950">
                {activeHook.metricLabel}
              </div>
              <span className="text-[11px] text-amber-800 font-sans mt-0.5 block">
                True shaft diameter
              </span>
            </div>

            {/* US Size Card */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-center">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block mb-1">
                United States (US)
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
                {activeHook.usSize}
              </div>
              <span className="text-[11px] text-stone-500 font-sans mt-0.5 block">
                Standard US mark
              </span>
            </div>

            {/* UK / Canadian Card */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-center">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block mb-1">
                UK / Canadian (Imperial)
              </span>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-stone-900">
                {activeHook.ukSize}
              </div>
              <span className="text-[11px] text-stone-500 font-sans mt-0.5 block">
                {activeHook.category === 'steel' ? 'Steel wire gauge' : 'Old imperial size'}
              </span>
            </div>

            {/* Japanese / International */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 text-center">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-bold block mb-1">
                Japanese Standard
              </span>
              <div className="font-mono text-2xl sm:text-3xl font-bold text-stone-900">
                {activeHook.japaneseSize || '—'}
              </div>
              <span className="text-[11px] text-stone-500 font-sans mt-0.5 block">
                Clover / Tulip sizing
              </span>
            </div>
          </div>

          {/* Deep Details on Active Hook */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Column 1: Yarn Match & Gauge */}
            <div className="space-y-2 border-b md:border-b-0 md:border-r border-stone-200 pb-3 md:pb-0 md:pr-4">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                Recommended Yarn Weight
              </div>
              <div className="font-sans font-medium text-stone-900 text-sm">
                {activeHook.yarnWeightCategory}
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-stone-100 rounded-md text-xs font-mono text-stone-700">
                <span>Standard Gauge:</span>
                <span className="font-semibold text-stone-900">{activeHook.typicalGauge}</span>
              </div>
            </div>

            {/* Column 2: Best Projects & Applications */}
            <div className="space-y-2 border-b md:border-b-0 md:border-r border-stone-200 pb-3 md:pb-0 md:pr-4">
              <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
                Signature Project Matches
              </div>
              <ul className="text-xs text-stone-700 space-y-1">
                {activeHook.bestProjects.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Visual Diameter Cross-Section & Notes */}
            <div className="space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 mb-1">
                  Studio Tension Advice
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {activeHook.notes}
                </p>
              </div>

              {/* Visual Hook Scale Simulation */}
              <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <div 
                    className="rounded-full bg-stone-900 border-2 border-amber-600 shadow-inner transition-all duration-300"
                    style={{ width: `${visualHookDiameter}px`, height: `${visualHookDiameter}px` }}
                    title={`Shaft diameter: ${activeHook.metricLabel}`}
                  />
                  <div className="text-[11px] text-stone-500 font-sans">
                    <span className="font-medium text-stone-900">{activeHook.metricLabel}</span> shaft scale
                  </div>
                </div>

                <button
                  onClick={() => handleCopySummary(activeHook)}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                  title="Copy size specs to clipboard"
                >
                  {copiedId === activeHook.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-500" />
                      <span>Copy Specs</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: INTERACTIVE GAUGE CHECK & HOOK ADJUSTER TOOL */}
        <div className="bg-amber-50/50 border border-amber-200/80 rounded-xl p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="w-4 h-4 text-amber-800" />
            <h3 className="font-serif text-lg font-medium text-stone-900">
              Interactive Gauge Swatch Adjuster
            </h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed mb-4">
            Having trouble getting gauge? Enter the pattern’s target stitch count and what your swatch actually measured to find out the exact hook adjustment needed.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Pattern Target (Stitches per 4″ / 10cm):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={4}
                  max={30}
                  value={targetGaugeStitches}
                  onChange={(e) => setTargetGaugeStitches(Number(e.target.value))}
                  className="flex-1 accent-amber-800"
                />
                <span className="font-mono font-bold text-sm bg-white px-2.5 py-1 border border-stone-200 rounded-md min-w-[3rem] text-center">
                  {targetGaugeStitches} sts
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Actual Swatch (Stitches in 4″ / 10cm):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={4}
                  max={30}
                  value={actualGaugeStitches}
                  onChange={(e) => setActualGaugeStitches(Number(e.target.value))}
                  className="flex-1 accent-amber-800"
                />
                <span className="font-mono font-bold text-sm bg-white px-2.5 py-1 border border-stone-200 rounded-md min-w-[3rem] text-center">
                  {actualGaugeStitches} sts
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Advice Card */}
          <div className={`p-3 rounded-lg border text-xs sm:text-sm flex items-start gap-2.5 ${
            gaugeAdvice.status === 'perfect' 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : gaugeAdvice.status === 'tight'
              ? 'bg-blue-50 border-blue-300 text-blue-950'
              : 'bg-amber-100/70 border-amber-300 text-amber-950'
          }`}>
            <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-800" />
            <div>
              <strong className="font-medium block">{gaugeAdvice.title}</strong>
              <span className="opacity-90">{gaugeAdvice.message}</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: SEARCHABLE & FILTERABLE COMPLETE HOOK CHART */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-medium text-stone-900">
                Complete Master Conversion Table
              </h3>
              <p className="text-xs text-stone-500">
                Showing {filteredHooks.length} standard sizes. Click any row to load into the converter.
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg text-xs">
              <button
                onClick={() => setActiveCategoryFilter('all')}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  activeCategoryFilter === 'all' ? 'bg-white shadow-xs font-semibold text-stone-900' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveCategoryFilter('standard')}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  activeCategoryFilter === 'standard' ? 'bg-white shadow-xs font-semibold text-stone-900' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Standard (2-10mm)
              </button>
              <button
                onClick={() => setActiveCategoryFilter('steel')}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  activeCategoryFilter === 'steel' ? 'bg-white shadow-xs font-semibold text-stone-900' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Steel Lace
              </button>
              <button
                onClick={() => setActiveCategoryFilter('jumbo')}
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  activeCategoryFilter === 'jumbo' ? 'bg-white shadow-xs font-semibold text-stone-900' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Jumbo (12-25mm)
              </button>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search by metric (e.g. 5mm), US size (e.g. H-8), UK size, yarn weight, or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-lg text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Scrollable Table */}
          <div className="overflow-x-auto border border-stone-200 rounded-xl bg-white max-h-64 overflow-y-auto scrollbar-thin">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 bg-[#F5F2ED] text-stone-700 font-semibold uppercase text-[10px] tracking-wider border-b border-stone-200 z-10">
                <tr>
                  <th className="py-2.5 px-3">Metric (mm)</th>
                  <th className="py-2.5 px-3">US Size</th>
                  <th className="py-2.5 px-3">UK / Imperial</th>
                  <th className="py-2.5 px-3">Japanese</th>
                  <th className="py-2.5 px-3">Yarn Classification</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredHooks.map((hook) => {
                  const isCurrent = hook.id === activeHook.id;
                  return (
                    <tr 
                      key={hook.id}
                      onClick={() => setSelectedHookId(hook.id)}
                      className={`hover:bg-amber-50/50 cursor-pointer transition-colors ${
                        isCurrent ? 'bg-amber-100/40 font-medium' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-stone-900">
                        {hook.metricLabel}
                      </td>
                      <td className="py-2.5 px-3 font-serif text-stone-800">
                        {hook.usSize}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-stone-700">
                        {hook.ukSize}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-stone-500">
                        {hook.japaneseSize || '—'}
                      </td>
                      <td className="py-2.5 px-3 text-stone-600">
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] bg-stone-100 text-stone-700 font-sans">
                          {hook.yarnStandardName}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedHookId(hook.id);
                          }}
                          className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                            isCurrent 
                              ? 'bg-stone-900 text-white' 
                              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                          }`}
                        >
                          {isCurrent ? 'Selected' : 'Select'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 4: HOOK MATERIAL & ANATOMY FIELD NOTES */}
        <div className="border-t border-stone-200 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Hook Materials */}
          <div className="bg-stone-100/70 p-4 rounded-xl border border-stone-200">
            <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-800" />
              Hook Materials & Friction Guide
            </h4>
            <div className="space-y-2 text-stone-600 leading-relaxed">
              <p>
                <strong>Aluminum:</strong> Glides fast on wool and acrylic. Best for speedy stitches and loose tensioners.
              </p>
              <p>
                <strong>Bamboo & Hardwood:</strong> Natural tactile grip. Keeps slippery silk and viscose from slipping off.
              </p>
              <p>
                <strong>Ergonomic Handles:</strong> Wider silicone cushion redistributes pressure, preventing carpal tunnel and finger cramping.
              </p>
            </div>
          </div>

          {/* Inline vs Tapered */}
          <div className="bg-stone-100/70 p-4 rounded-xl border border-stone-200">
            <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-800" />
              Inline vs. Tapered Hook Heads
            </h4>
            <div className="space-y-2 text-stone-600 leading-relaxed">
              <p>
                <strong>Inline (Bates style):</strong> The hook lip aligns flush with the shaft. Ensures 100% uniform loop height; favored for Tunisian crochet.
              </p>
              <p>
                <strong>Tapered (Boye style):</strong> The throat gently narrows before reaching the hook. Enters tight stitches faster with minimal yarn splitting.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-200">
          <div className="text-[11px] text-stone-400 font-mono">
            CrochetSimply · Verified Craft Standards CYC 2026
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            Close Converter
          </button>
        </div>

      </div>
    </div>
  );
};
