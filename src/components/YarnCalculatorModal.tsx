import React, { useState } from 'react';
import { Calculator, X } from 'lucide-react';

interface YarnCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProjectPreset {
  name: string;
  baseMeters: number;
  skeinGramDefault: number;
  hookRecommended: string;
  notes: string;
}

const PRESETS: Record<string, ProjectPreset> = {
  sofa_throw: {
    name: 'Sofa Throw Blanket (48 × 60 in / 120 × 150 cm)',
    baseMeters: 1800,
    skeinGramDefault: 100,
    hookRecommended: '5.5 - 6.5 mm (US I-9 to K-10.5)',
    notes: 'Open lace stitch patterns consume approximately 20% less yarn than dense single crochet or post relief.'
  },
  tote_bag: {
    name: 'Artisan Tote / Market Carryall',
    baseMeters: 450,
    skeinGramDefault: 100,
    hookRecommended: '3.5 - 4.0 mm (US E-4 to G-6)',
    notes: 'Use a hook one size smaller than the ball band to achieve firm fabric that does not sag when holding weight.'
  },
  cardigan_adult: {
    name: 'Adult Cardigan / Sweater (Size Medium)',
    baseMeters: 1650,
    skeinGramDefault: 100,
    hookRecommended: '4.5 - 5.5 mm (US 7 to I-9)',
    notes: 'If adding deep patch pockets, balloon cuffs, or a shawl collar, add an extra 15% yardage buffer.'
  },
  baby_blanket: {
    name: 'Heirloom Baby Blanket (32 × 36 in / 80 × 90 cm)',
    baseMeters: 950,
    skeinGramDefault: 100,
    hookRecommended: '4.0 - 4.5 mm (US G-6 to 7)',
    notes: 'Reserve at least 20% of total yardage for wide multi-round decorative borders.'
  },
  infinity_scarf: {
    name: 'Classic Scarf or Double Infinity Cowl',
    baseMeters: 380,
    skeinGramDefault: 100,
    hookRecommended: '5.0 - 6.0 mm (US H-8 to J-10)',
    notes: 'Select soft, low-prickle fibers like Merino, Cashmere, or Microfiber for next-to-skin neck comfort.'
  },
  amigurumi_medium: {
    name: 'Medium Sculpted Amigurumi (8-10 in / 20-25 cm)',
    baseMeters: 230,
    skeinGramDefault: 50,
    hookRecommended: '2.25 - 2.75 mm (US B-1 to C-2)',
    notes: 'Tension must remain compact so white polyfill stuffing remains 100% invisible between stitches.'
  },
  lace_shawl: {
    name: 'Triangular Openwork Lace Shawl',
    baseMeters: 800,
    skeinGramDefault: 100,
    hookRecommended: '4.0 - 5.0 mm (US G-6 to H-8)',
    notes: 'Aggressive wet blocking will expand the wingspan and surface area by 25 to 30 percent.'
  }
};

export const YarnCalculatorModal: React.FC<YarnCalculatorModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [projectKey, setProjectKey] = useState<string>('tote_bag');
  const [yarnWeight, setYarnWeight] = useState<number>(1); // multiplier
  const [stitchDensity, setStitchDensity] = useState<number>(1); // multiplier
  const [skeinLength, setSkeinLength] = useState<number>(200); // meters per skein

  const activePreset = PRESETS[projectKey];

  const estimatedMeters = Math.round(activePreset.baseMeters * yarnWeight * stitchDensity);
  const estimatedYards = Math.round(estimatedMeters * 1.09361);
  const skeinsNeeded = Math.ceil(estimatedMeters / skeinLength);
  const safeMarginSkeins = skeinsNeeded + 1; // standard craft safety margin

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FAF8F5] border border-stone-300 rounded-2xl max-w-xl w-full p-6 sm:p-8 overflow-y-auto max-h-[92vh] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Calculator className="w-5 h-5 text-amber-800" />
          <span className="text-[11px] font-sans uppercase tracking-widest text-amber-900 font-semibold">
            Maker Studio Utility
          </span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 leading-tight">
          Yarn Yardage & Skein Estimator
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1 font-sans">
          Estimate exact yardage and skein counts before casting on so you never run short mid-project.
        </p>

        <div className="mt-6 space-y-4 font-sans text-xs">
          
          {/* Select Project Preset */}
          <div>
            <label className="block font-semibold text-stone-800 mb-1">
              Project Type
            </label>
            <select
              value={projectKey}
              onChange={(e) => setProjectKey(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-700 cursor-pointer"
            >
              {Object.entries(PRESETS).map(([key, data]) => (
                <option key={key} value={key}>{data.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Yarn thickness */}
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Yarn Weight / Gauge Class
              </label>
              <select
                value={yarnWeight}
                onChange={(e) => setYarnWeight(parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-700 cursor-pointer"
              >
                <option value={0.75}>Lace / Fingering / 4-ply (Fine)</option>
                <option value={1.0}>DK / Light Worsted / 8-ply (Standard)</option>
                <option value={1.3}>Worsted / Aran / 10-ply (Medium)</option>
                <option value={1.65}>Chunky / Bulky / Chenille (Heavy)</option>
              </select>
            </div>

            {/* Density / Stitch type */}
            <div>
              <label className="block font-semibold text-stone-800 mb-1">
                Stitch Fabric Density
              </label>
              <select
                value={stitchDensity}
                onChange={(e) => setStitchDensity(parseFloat(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:border-amber-700 cursor-pointer"
              >
                <option value={0.85}>Openwork Lace / Airy Mesh</option>
                <option value={1.0}>Standard Stitches (dc, grannys, hdc)</option>
                <option value={1.25}>Dense / Post Relief / Bobbles / Popcorn</option>
              </select>
            </div>
          </div>

          {/* Meters per skein input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-stone-800">
                Meters per Skein (from ball band):
              </label>
              <span className="font-mono text-amber-900 font-bold">{skeinLength} m (~{Math.round(skeinLength * 1.09361)} yds)</span>
            </div>
            <input
              type="range"
              min={80}
              max={450}
              step={10}
              value={skeinLength}
              onChange={(e) => setSkeinLength(parseInt(e.target.value))}
              className="w-full accent-amber-800 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-0.5">
              <span>80 m (chunky hanks)</span>
              <span>200 m (standard 100g skein)</span>
              <span>450 m (lace cones)</span>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="mt-6 p-5 bg-amber-50/70 border border-amber-200/90 rounded-xl">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-900 block mb-2">
              Recommended Project Requirement
            </span>

            <div className="grid grid-cols-2 gap-4 text-center py-2 border-b border-amber-200/70">
              <div>
                <span className="text-stone-500 text-[11px] block">Estimated Metrage / Yardage</span>
                <span className="font-mono text-2xl font-bold text-stone-900 tabular-nums">
                  ~{estimatedMeters} m
                </span>
                <span className="text-[11px] text-stone-500 block font-mono">
                  (~{estimatedYards} yards)
                </span>
              </div>
              <div>
                <span className="text-stone-500 text-[11px] block">Recommended Skein Purchase</span>
                <span className="font-mono text-2xl font-bold text-amber-950 tabular-nums">
                  {skeinsNeeded} - {safeMarginSkeins} <span className="text-xs font-normal">skeins</span>
                </span>
                <span className="text-[10px] text-amber-900/80 block">
                  (Includes safety margin)
                </span>
              </div>
            </div>

            <div className="mt-3 text-[11px] text-stone-600 space-y-1">
              <div className="flex justify-between">
                <span>Recommended hook range:</span>
                <strong className="text-stone-900 font-mono">{activePreset.hookRecommended}</strong>
              </div>
              <p className="pt-2 text-stone-500 italic">
                * {activePreset.notes}
              </p>
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              Done, Save Reference
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
