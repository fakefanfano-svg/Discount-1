import React from 'react';
import { BookOpen, Camera, Sparkles, Ruler, ArrowRight, Layers, Sliders, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onExploreArticles: () => void;
  onExploreGallery: () => void;
  onOpenHookConverter?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onExploreArticles, 
  onExploreGallery,
  onOpenHookConverter 
}) => {
  return (
    <section className="relative pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-stone-200/90 bg-[#FAF8F5] overflow-hidden">
      
      {/* Subtle organic background warmth */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* TOP LEVEL PUBLICATION MASTHEAD LINE */}
        <div className="flex items-center justify-between pb-4 mb-8 sm:mb-12 border-b border-stone-200 text-xs text-stone-500 font-sans">
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-widest text-stone-800">
              Volume VIII
            </span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="hidden sm:inline">CrochetSimply Independent Journal</span>
          </div>

          <div className="flex items-center gap-3 text-stone-500 font-mono text-[11px]">
            <span>100% Tested Patterns</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-amber-900 font-medium">Free Access</span>
          </div>
        </div>

        {/* ASYMMETRIC EDITORIAL SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-12 sm:mb-16">
          
          {/* Left Column (7 cols): Editorial Narrative & Core Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-amber-900/90 font-sans font-semibold block">
                The Art of Modern Handcraft
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal text-stone-900 tracking-tight leading-[1.12] text-balance">
                Tactile crochet patterns, made simple, organic & enduring.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed text-balance max-w-2xl">
              Welcome to <strong className="text-stone-900 font-medium">CrochetSimply</strong>. An editorial publication and interactive workshop celebrating pure botanical cotton, ethically sourced wools, and honest handmade heirlooms. Discover complete step-by-step masterclasses, an animated stitch demonstrator, and precision tools for makers.
            </p>

            {/* Clear, Focused Action Hub (Zero pill-slop, clean visual hierarchy) */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreArticles}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded-xl shadow-sm transition-all duration-200 cursor-pointer group"
              >
                <BookOpen className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                <span>Explore Patterns & Guides</span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#stitch-library"
                className="inline-flex items-center gap-2 px-4 py-3 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300/90 text-sm font-medium rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Stitch Library</span>
              </a>

              <button
                onClick={onOpenHookConverter}
                className="inline-flex items-center gap-2 px-4 py-3 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 text-sm font-medium rounded-xl transition-colors cursor-pointer"
              >
                <Ruler className="w-4 h-4 text-amber-800" />
                <span>Hook Converter</span>
              </button>
            </div>

            {/* Unboxed Metadata Highlights (Zero-Pill Rule Compliant) */}
            <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-500 font-sans">
              <div className="flex items-center gap-1.5 text-stone-800 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                <span>26+ Editorial Guides & Patterns</span>
              </div>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>All Skill Levels</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Swatches Stress-Tested</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-900 font-semibold">Author: CrochetSimply</span>
            </div>

          </div>

          {/* Right Column (5 cols): Framed Visual Artistry with Interactive Callout */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-md group">
              <div className="aspect-[4/3] sm:aspect-[5/4] w-full overflow-hidden">
                <img
                  src="/src/assets/images/hero_crochet_artisan_1790433576727.jpg"
                  alt="Flat-lay of artisan wooden crochet hooks, unbleached cotton yarn skeins, and blocked stitch swatches"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter saturate-[0.98]"
                />
              </div>

              {/* Museum caption plaque underneath photo */}
              <div className="p-4 bg-white/95 backdrop-blur-xs border-t border-stone-200 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-900 font-bold block">
                    Inside the Workshop
                  </span>
                  <span className="text-stone-700 font-serif italic text-xs">
                    Combed botanical cotton swatches & birchwood hooks
                  </span>
                </div>

                <button
                  onClick={onExploreGallery}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-800 hover:text-amber-900 transition-colors cursor-pointer shrink-0"
                >
                  <Camera className="w-3.5 h-3.5 text-stone-500" />
                  <span>Gallery</span>
                </button>
              </div>
            </div>

            {/* Subtle decorative offset card */}
            <div className="hidden sm:block absolute -bottom-4 -left-4 bg-[#FAF8F5] border border-stone-300/90 rounded-xl p-3 shadow-lg max-w-[210px]">
              <span className="text-[9px] uppercase tracking-widest text-stone-400 font-bold block mb-0.5">
                Current Studio Gauge
              </span>
              <p className="text-[11px] font-medium text-stone-800 leading-snug">
                14 sts × 16 rows = 4 in with 5.0 mm (US H-8)
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
