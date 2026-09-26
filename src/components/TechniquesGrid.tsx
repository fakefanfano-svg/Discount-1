import React, { useState } from 'react';
import { POPULAR_TECHNIQUES } from '../data/crochetData';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const TechniquesGrid: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const detailedTips = [
    'For the double-wrap magic ring, wind the yarn twice fully around your index and middle fingers before drawing up the loop. Working your stitches over two concentric strands creates an anchor that never stretches open even under machine laundering.',
    'When assembling granny squares, place motifs right sides facing together. Pass a blunt tapestry needle through only the inner back loops of both opposing edges in a gentle zigzag motion. This yields an entirely flat seam with zero ridge.',
    'To eliminate jagged edges, replace the starting 3 chains with a stacked chainless single crochet: draw up a relaxed loop, work a single crochet directly in the first stitch, then insert your hook through the left vertical leg of that single crochet and draw up another loop to complete a double crochet.',
    'Pin your blocked item onto dense EVA foam mats. Set your steam iron to wool/silk mode with continuous steam bursts. Hold the iron plate 1.5 inches away from the fiber without ever touching. Allow the fiber to cool and set for 4 hours.'
  ];

  return (
    <section id="techniques" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-stone-200">
      
      <div className="pb-4 mb-8 border-b border-stone-200">
        <span className="text-xs uppercase tracking-widest text-stone-500 font-sans block mb-1">
          04. Workshop Fundamentals
        </span>
        <h2 className="text-3xl font-serif font-medium text-stone-900 tracking-tight">
          Core Workshop Techniques for Tailored Finishes
        </h2>
        <p className="text-stone-600 text-sm mt-1 max-w-2xl font-sans">
          Subtle technical details that distinguish an amateur craft from bespoke heirloom fiber art.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {POPULAR_TECHNIQUES.map((tech, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-stone-200/90 rounded-xl p-5 shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 font-sans mb-2">
                  <span className="font-semibold text-amber-900 uppercase tracking-wide">
                    {tech.tag}
                  </span>
                  <span className="font-mono text-stone-400">0{idx + 1}</span>
                </div>

                <h3 className="font-serif text-xl font-medium text-stone-900">
                  {tech.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2 leading-relaxed">
                  {tech.description}
                </p>

                {isExpanded && (
                  <div className="mt-4 p-3.5 bg-amber-50/70 border-l-2 border-amber-700 rounded-r-lg text-xs text-stone-700 font-sans leading-relaxed animate-in fade-in duration-150">
                    <strong className="text-amber-950 font-semibold block mb-1">Detailed Studio Secret:</strong>
                    {detailedTips[idx]}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => toggleExpand(idx)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-amber-900 hover:text-stone-950 transition-colors cursor-pointer"
                >
                  <span>{isExpanded ? 'Hide explanation' : 'View studio secret'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
