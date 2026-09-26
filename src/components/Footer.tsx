import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF8F5] border-t border-stone-200 py-12 text-stone-600 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-200">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <span className="font-serif text-2xl font-medium text-stone-900 block">
              CrochetSimply
            </span>
            <p className="text-stone-500 max-w-sm leading-relaxed">
              The premier independent digital journal dedicated to modern fiber crafts, natural yarn preservation, step-by-step masterclasses, and tactile textile photography.
            </p>
            <div className="text-[11px] text-stone-400 font-mono">
              crochetsimply.online · Digital Edition 2026
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] mb-3">
              Explore Library
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#articles" className="hover:text-stone-900 transition-colors">
                  Articles & Patterns (26+ Guides)
                </a>
              </li>
              <li>
                <a href="#stitch-library" className="hover:text-stone-900 transition-colors">
                  Interactive Stitch Library
                </a>
              </li>
              <li>
                <a href="#hook-conversion" className="hover:text-stone-900 transition-colors">
                  Hook Conversion Tool (US / UK / mm)
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-stone-900 transition-colors">
                  Visual Project Gallery
                </a>
              </li>
              <li>
                <a href="#techniques" className="hover:text-stone-900 transition-colors">
                  Workshop Fundamentals
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-stone-900 transition-colors">
                  Google SEO & FAQ Hub
                </a>
              </li>
            </ul>
          </div>

          {/* Curatorial Notice */}
          <div>
            <h4 className="font-semibold text-stone-900 uppercase tracking-wider text-[11px] mb-3">
              Artisanal Guarantee & Standards
            </h4>
            <p className="text-stone-500 leading-relaxed text-[11px]">
              Every pattern published in our journal is physically swatched, stress-tested, and verified by experienced makers with genuine gauge samples and zero synthetic AI shortcuts.
            </p>
            <div className="mt-3">
              <a
                href="/about.html"
                className="text-amber-900 hover:text-amber-950 font-medium text-[11px] underline underline-offset-2"
              >
                Ad & Affiliate Transparency Disclosure →
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400 text-[11px]">
          <div>
            © 2026 Crochet Simply (crochetsimply.online). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="/privacy-policy.html" className="hover:text-stone-700 transition-colors">
              Privacy & Cookies
            </a>
            <span aria-hidden="true">·</span>
            <a href="/terms.html" className="hover:text-stone-700 transition-colors">
              Terms of Craft
            </a>
            <span aria-hidden="true">·</span>
            <a href="/about.html" className="hover:text-stone-700 transition-colors">
              About & Editorial Desk
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
