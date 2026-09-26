import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, X, Menu, ChevronDown, Ruler, Hash, Calculator, Bookmark 
} from 'lucide-react';

interface HeaderProps {
  onOpenRowCounter: () => void;
  onOpenYarnCalculator: () => void;
  onOpenHookConverter: () => void;
  savedArticlesCount: number;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRowCounter,
  onOpenYarnCalculator,
  onOpenHookConverter,
  savedArticlesCount,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toolsRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setIsToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Lock scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (anchorId: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(anchorId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)]' 
            : 'bg-[#FAF8F5] border-b border-stone-200/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 sm:h-18 flex items-center justify-between gap-6">
            
            {/* MINIMALIST LOGO */}
            <a 
              href="/" 
              className="font-serif text-2xl font-normal tracking-tight text-stone-900 hover:text-stone-600 transition-colors shrink-0"
              aria-label="CrochetSimply Home"
            >
              CrochetSimply
            </a>

            {/* MINIMALIST DESKTOP NAVIGATION */}
            <nav className="hidden md:flex items-center gap-8 text-[13px] font-sans text-stone-600 tracking-wide">
              <a 
                href="#articles" 
                className="hover:text-stone-950 transition-colors"
              >
                Patterns
              </a>

              <a 
                href="#stitch-library" 
                className="hover:text-stone-950 transition-colors"
              >
                Stitches
              </a>

              <a 
                href="#gallery" 
                className="hover:text-stone-950 transition-colors"
              >
                Gallery
              </a>

              <a 
                href="#techniques" 
                className="hover:text-stone-950 transition-colors"
              >
                Techniques
              </a>

              {/* TOOLS DROPDOWN */}
              <div className="relative" ref={toolsRef}>
                <button
                  type="button"
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  className="flex items-center gap-1 hover:text-stone-950 transition-colors cursor-pointer py-1"
                >
                  <span>Tools</span>
                  <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${isToolsOpen ? 'rotate-180 text-stone-800' : ''}`} />
                </button>

                {isToolsOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-56 bg-[#FAF8F5] border border-stone-200/90 rounded-xl shadow-lg p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 text-left">
                    <button
                      onClick={() => {
                        setIsToolsOpen(false);
                        onOpenHookConverter();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-sans text-stone-700 hover:text-stone-950 hover:bg-stone-200/50 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>Hook Converter</span>
                      <span className="text-[10px] text-stone-400 font-mono">mm/US/UK</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsToolsOpen(false);
                        onOpenRowCounter();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-sans text-stone-700 hover:text-stone-950 hover:bg-stone-200/50 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>Row Counter</span>
                      <span className="text-[10px] text-stone-400 font-mono">Tally</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsToolsOpen(false);
                        onOpenYarnCalculator();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs font-sans text-stone-700 hover:text-stone-950 hover:bg-stone-200/50 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>Yarn Estimator</span>
                      <span className="text-[10px] text-stone-400 font-mono">Skeins</span>
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* RIGHT UTILITIES */}
            <div className="flex items-center gap-4 text-xs font-sans text-stone-600">
              
              {/* Search Toggle / Input */}
              {isSearchOpen ? (
                <div className="flex items-center gap-2 border-b border-stone-400 pb-0.5 w-36 sm:w-48 animate-in fade-in duration-150">
                  <Search className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-transparent text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      onSearchChange('');
                    }}
                    className="text-stone-400 hover:text-stone-700"
                    aria-label="Close search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:text-stone-950 transition-colors p-1 cursor-pointer"
                  title="Search patterns"
                  aria-label="Open search"
                >
                  <Search className="w-4 h-4 text-stone-600" />
                </button>
              )}

              {/* Saved indicator */}
              <a
                href="#articles"
                className="hover:text-stone-950 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="View saved patterns"
              >
                <Bookmark className="w-3.5 h-3.5 text-stone-500" />
                <span className="font-mono text-[11px] text-stone-500">
                  {savedArticlesCount}
                </span>
              </a>

              {/* Minimalist Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1 text-stone-800 hover:text-stone-950 transition-colors cursor-pointer"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 stroke-[1.5]" />
                ) : (
                  <Menu className="w-5 h-5 stroke-[1.5]" />
                )}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* MINIMALIST FULL-SCREEN MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 md:hidden bg-[#FAF8F5] p-6 sm:p-8 flex flex-col justify-between animate-in fade-in duration-200">
          <div className="space-y-6 pt-4">
            
            {/* Search in mobile */}
            <div className="border-b border-stone-300 pb-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search articles and stitches..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
              />
            </div>

            {/* Editorial Nav Items */}
            <nav className="flex flex-col space-y-4 font-serif text-2xl text-stone-900 pt-2">
              <button
                onClick={() => handleNavClick('articles')}
                className="text-left hover:text-stone-500 transition-colors"
              >
                Patterns & Articles
              </button>
              <button
                onClick={() => handleNavClick('stitch-library')}
                className="text-left hover:text-stone-500 transition-colors"
              >
                Stitch Library
              </button>
              <button
                onClick={() => handleNavClick('gallery')}
                className="text-left hover:text-stone-500 transition-colors"
              >
                Visual Gallery
              </button>
              <button
                onClick={() => handleNavClick('techniques')}
                className="text-left hover:text-stone-500 transition-colors"
              >
                Techniques
              </button>
            </nav>

            {/* Studio Tools */}
            <div className="pt-6 border-t border-stone-200/80 space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 block">
                Maker Tools
              </span>
              <div className="space-y-2 text-sm font-sans text-stone-700">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenHookConverter();
                  }}
                  className="block w-full text-left py-1 hover:text-stone-950 transition-colors"
                >
                  Hook Size Converter →
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenRowCounter();
                  }}
                  className="block w-full text-left py-1 hover:text-stone-950 transition-colors"
                >
                  Active Row Counter →
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenYarnCalculator();
                  }}
                  className="block w-full text-left py-1 hover:text-stone-950 transition-colors"
                >
                  Yarn & Skein Estimator →
                </button>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-stone-200 text-xs text-stone-400 font-mono flex items-center justify-between">
            <span>CrochetSimply</span>
            <span>Edition 2026</span>
          </div>
        </div>
      )}
    </>
  );
};
