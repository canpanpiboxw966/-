import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'icon' | 'stacked';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SoulSurveySymbolSvg: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 320 480" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ssSGrad" x1="40" y1="410" x2="280" y2="30" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#154e5b" />
        <stop offset="22%" stopColor="#1b6877" />
        <stop offset="48%" stopColor="#288f7a" />
        <stop offset="72%" stopColor="#42aa86" />
        <stop offset="92%" stopColor="#5fbe97" />
        <stop offset="100%" stopColor="#70c49f" />
      </linearGradient>
      <linearGradient id="ssHexGradLight" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#2e967f" />
        <stop offset="100%" stopColor="#6fc39e" />
      </linearGradient>
      <linearGradient id="ssHexGradDeep" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#17515e" />
        <stop offset="100%" stopColor="#319981" />
      </linearGradient>
    </defs>
    <g id="soul-survey-symbol">
      <g stroke="#265952" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.82">
        <line x1="232" y1="32" x2="190" y2="64" />
        <line x1="232" y1="32" x2="266" y2="124" />
        <line x1="266" y1="124" x2="284" y2="222" />
        <line x1="284" y1="222" x2="220" y2="252" />
        <line x1="156" y1="268" x2="112" y2="238" />
        <line x1="26" y1="308" x2="78" y2="288" />
        <line x1="26" y1="308" x2="44" y2="370" />
      </g>
      <g stroke="url(#ssSGrad)" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 142,105 C 152,72 184,58 226,62 C 242,64 252,72 258,84 C 265,96 264,108 252,114" strokeWidth="12" fill="none" />
        <path d="M 276,134 C 278,124 272,112 256,104 C 235,92 195,94 152,118 C 114,140 88,180 94,226 C 100,268 136,298 184,332 C 228,362 245,394 235,420 C 220,455 160,465 106,442 C 72,426 50,394 44,360" strokeWidth="22" fill="none" />
        <path d="M 188,64 C 150,70 120,95 110,132 C 100,172 120,204 152,230" strokeWidth="8" fill="none" />
        <path d="M 152,268 C 182,295 210,326 215,358 C 220,388 205,412 176,424 C 145,435 108,425 82,398" strokeWidth="10" fill="none" />
        <path d="M 48,374 C 54,410 85,445 140,460 C 205,475 258,440 274,385 C 285,345 272,300 242,265" strokeWidth="12" fill="none" />
        <path d="M 55,424 C 84,452 135,468 188,460 C 225,452 254,428 266,392" strokeWidth="8" fill="none" />
      </g>
      <polygon points="252,32 242,49 222,49 212,32 222,15 242,15" fill="url(#ssHexGradLight)" stroke="#1f5e52" strokeWidth="1.8" />
      <polygon points="242,142 235,154 221,154 214,142 221,130 235,130" fill="url(#ssHexGradLight)" stroke="#1f5e52" strokeWidth="1.6" />
      <polygon points="304,222 294,240 274,240 264,222 274,204 294,204" fill="url(#ssHexGradLight)" stroke="#1f5e52" strokeWidth="1.8" />
      <polygon points="171,268 163.5,281 148.5,281 141,268 148.5,255 163.5,255" fill="url(#ssHexGradDeep)" stroke="#1b544b" strokeWidth="1.6" />
      <polygon points="46,308 36,325.5 16,325.5 6,308 16,290.5 36,290.5" fill="url(#ssHexGradDeep)" stroke="#174c43" strokeWidth="1.8" />
      <polygon points="90,404 83,416 69,416 62,404 69,392 83,392" fill="url(#ssHexGradDeep)" stroke="#174c43" strokeWidth="1.6" />
    </g>
  </svg>
);

export const SoulSurveyLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'horizontal',
  theme = 'light',
  size = 'md'
}) => {
  const isDark = theme === 'dark';

  // S-mark symbol dimensions
  const symbolSizes = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-12 h-12 sm:w-14 sm:h-14',
    xl: 'w-16 h-16 sm:w-20 sm:h-20'
  };

  // Primary Title ("소울측량") typography size
  const titleSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
    xl: 'text-3xl sm:text-4xl'
  };

  // Subtitle ("SOUL SURVEY") typography size
  const subtitleSizes = {
    sm: 'text-[9px] sm:text-[10px]',
    md: 'text-[10px] sm:text-[11px]',
    lg: 'text-xs sm:text-sm',
    xl: 'text-sm sm:text-base'
  };

  // If icon-only variant
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <div className={`${symbolSizes[size]} flex items-center justify-center drop-shadow-xs`}>
          <SoulSurveySymbolSvg className="w-full h-full object-contain" />
        </div>
      </div>
    );
  }

  // If stacked variant (e.g. Hero showcase or centered presentation)
  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        <div className={`${symbolSizes[size]} flex items-center justify-center mb-3 drop-shadow-xs`}>
          <SoulSurveySymbolSvg className="w-full h-full object-contain" />
        </div>
        <div className="flex items-center gap-2">
          <span className={`font-black tracking-tight ${titleSizes[size]} ${isDark ? 'text-white' : 'text-slate-900'}`}>
            소울측량
          </span>
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
            isDark 
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60' 
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}>
            종합측량
          </span>
        </div>
        <span className={`font-extrabold tracking-[0.22em] mt-1 ${subtitleSizes[size]} ${
          isDark ? 'text-emerald-400' : 'text-emerald-700'
        }`}>
          SOUL SURVEY
        </span>
      </div>
    );
  }

  // Standard Horizontal Lockup (Header, Footer, Navigation)
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* 1. Official Geodetic S-Mark Symbol */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <div className={`${symbolSizes[size]} flex items-center justify-center`}>
          <SoulSurveySymbolSvg className="w-full h-full object-contain" />
        </div>
      </div>

      {/* 2. Harmonious Typographic Lockup (상호명 디자인) */}
      <div className="flex flex-col justify-center text-left">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className={`font-black tracking-tight leading-none ${titleSizes[size]} ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            소울측량
          </span>
          <span className={`px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-bold leading-none tracking-tight border ${
            isDark 
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60' 
              : 'bg-emerald-50 text-emerald-800 border-emerald-200/90'
          }`}>
            종합측량
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5 leading-none">
          <span className={`font-extrabold tracking-[0.16em] sm:tracking-[0.2em] leading-none uppercase ${subtitleSizes[size]} ${
            isDark ? 'text-emerald-400' : 'text-emerald-700'
          }`}>
            SOUL SURVEY
          </span>
          <span className={`text-[10px] font-medium leading-none hidden md:inline ${
            isDark ? 'text-slate-400' : 'text-slate-400'
          }`}>
            · 공간정보
          </span>
        </div>
      </div>
    </div>
  );
};

