import React from 'react';

interface LogoProps {
  variant?: 'header' | 'footer' | 'icon' | 'badge';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'header',
  className = '',
  showTagline = false,
}) => {
  // Bespoke Artisan Crochet Emblem
  // Depicts a stylized textured yarn skein loops harmoniously interlocked with an artisan crochet hook
  const emblem = (sizeClass = 'w-8 h-8') => (
    <div className={`relative shrink-0 flex items-center justify-center ${sizeClass}`}>
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cs-yarn-grad" x1="6" y1="8" x2="42" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D97706" /> {/* warm amber-600 */}
            <stop offset="0.5" stopColor="#B45309" /> {/* amber-700 */}
            <stop offset="1" stopColor="#78350F" /> {/* warm amber-900 / terracotta */}
          </linearGradient>
          
          <linearGradient id="cs-hook-grad" x1="12" y1="44" x2="38" y2="8" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="0.6" stopColor="#D97706" />
            <stop offset="1" stopColor="#B45309" />
          </linearGradient>

          <filter id="cs-glow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1" floodColor="#78350F" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Soft rounded background badge */}
        <rect
          x="3"
          y="3"
          width="42"
          height="42"
          rx="12"
          className="fill-amber-100/70 stroke-amber-200/80"
          strokeWidth="1.2"
        />

        {/* Intertwined continuous crochet loop / skein curves */}
        {/* Outer Yarn Loop */}
        <path
          d="M14 26 C12 18 19 12 26 13 C34 14 36 22 30 28 C26 32 18 35 15 31 C12 28 14 22 20 20 C27 18 33 22 34 26"
          stroke="url(#cs-yarn-grad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Inner stitch contour */}
        <path
          d="M19 18 C22 15 28 16 30 20 C32 24 29 28 24 29 C20 30 16 28 17 24"
          stroke="#78350F"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="2 3"
          opacity="0.85"
        />

        {/* Sleek artisan crochet hook shaft crossing elegantly through the stitch */}
        <path
          d="M13 39 L31 15"
          stroke="#292524"
          strokeWidth="2.8"
          strokeLinecap="round"
        />

        {/* Crochet hook tip & curved beak */}
        <path
          d="M31 15 C33.5 11.8 36.5 10 38 11.5 C39.5 13 37.5 15.5 35 16.5 C33 17.3 32 16.5 32 16.5"
          stroke="#292524"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Hook ergonomic thumb grip accent */}
        <rect
          x="18"
          y="30"
          width="7"
          height="3"
          rx="1.5"
          transform="rotate(-53 21.5 31.5)"
          className="fill-amber-500 stroke-stone-800"
          strokeWidth="1"
        />

        {/* Small golden fiber spark dot */}
        <circle cx="37" cy="27" r="1.5" className="fill-amber-500 animate-pulse" />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        {emblem('w-9 h-9')}
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs ${className}`}>
        {emblem('w-6 h-6')}
        <span className="font-serif text-sm font-medium tracking-tight text-stone-900">
          Crochet<span className="italic font-normal text-amber-800">Simply</span>
        </span>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex flex-col items-start gap-1 group ${className}`}>
        <div className="flex items-center gap-3">
          {emblem('w-10 h-10')}
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-normal tracking-tight text-stone-900 group-hover:text-amber-900 transition-colors">
              Crochet<span className="italic font-light text-amber-800">Simply</span>
            </span>
            <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase -mt-0.5">
              Modern Craft Journal & Library
            </span>
          </div>
        </div>
        {showTagline && (
          <p className="text-xs font-sans text-stone-500 mt-2 max-w-sm leading-relaxed">
            Free artisan crochet patterns, interactive row trackers, yarn calculators, and physical print-friendly guides.
          </p>
        )}
      </div>
    );
  }

  // Default: 'header'
  return (
    <div className={`inline-flex items-center gap-2.5 group cursor-pointer select-none ${className}`}>
      {emblem('w-8 h-8 sm:w-9 sm:h-9')}
      <div className="flex flex-col">
        <span className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors leading-none">
          Crochet<span className="italic font-light text-amber-800 ml-0.5">Simply</span>
        </span>
        <span className="text-[9px] font-mono tracking-widest uppercase text-stone-400 group-hover:text-amber-700 transition-colors mt-0.5 hidden xs:inline-block">
          Craft & Patterns
        </span>
      </div>
    </div>
  );
};
