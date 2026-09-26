import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles, BookOpen, Layers } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  tag: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Can an automated machine crochet like modern knitting looms?",
    answer: "No. In the entire history of textile engineering, no commercial machine has ever been capable of crocheting. Knitting produces interconnected parallel loops that can be motorized on flatbeds, but crochet requires manual 360-degree needle rotation, continuous loop grabbing, and unique stitch anchoring. Every single crocheted sweater, blanket, or toy on earth is 100% handmade by human hands.",
    tag: "Industry Fact"
  },
  {
    question: "What is the key difference between US and UK crochet terminology?",
    answer: "US and UK systems share the exact same names but represent different stitch heights. For instance: a US Single Crochet (sc) equals a UK Double Crochet (dc); a US Double Crochet (dc) equals a UK Treble Crochet (tr); a US Treble (tr) equals a UK Double Treble (dtr). CrochetSimply specifies both terminologies in every pattern chart to ensure zero confusion.",
    tag: "Stitch Terminology"
  },
  {
    question: "Which crochet hook size and yarn weight should a complete beginner start with?",
    answer: "We strongly recommend beginning with a 5.0 mm (US H-8) or 4.5 mm (US 7) ergonomic silicone hook paired with a smooth worsted weight (medium #4) acrylic or cotton blend yarn in a light color like cream, butter yellow, or oatmeal. Light colors make the individual 'V' anatomy of each stitch clearly visible.",
    tag: "Beginner Advice"
  },
  {
    question: "Why do my edges slant or shrink into triangles?",
    answer: "The classic 'shrinking triangle' occurs because beginners either skip the very last stitch of the row (forgetting to work into the top of the turning chain) or misplace the very first stitch. Placing a locking plastic stitch marker into the first stitch the moment you make it completely eliminates this mistake.",
    tag: "Troubleshooting"
  },
  {
    question: "How does wet blocking vs steam blocking affect natural fibers?",
    answer: "Animal fibers (merino wool, cashmere, alpaca) thrive with a 20-minute lukewarm water bath and flat pin blocking. Synthetic acrylic, by contrast, should never be submerged in hot water or touched with an iron; instead, hover a continuous steam burst 1.5 inches above acrylic to relax the plastic memory without 'killing' the spring.",
    tag: "Fiber Care"
  }
];

export const SeoFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-14 sm:py-18 bg-[#F5F2EB]/50 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200/80 text-[11px] font-medium text-amber-900 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>CrochetSimply Knowledge Base & SEO Reference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-stone-900 tracking-tight">
            Frequently Asked Questions & Fiber Science
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-600 font-sans">
            Clear, authoritative answers to the most frequently searched crochet queries on Google.
          </p>
        </div>

        <div className="space-y-3 font-sans">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-stone-200/90 rounded-xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-amber-900 font-semibold px-2 py-0.5 bg-amber-50 border border-amber-200 rounded">
                      {faq.tag}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-medium text-stone-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="text-stone-400 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-stone-700" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
