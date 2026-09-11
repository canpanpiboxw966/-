import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'icon' | 'stacked';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

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

  const symbolSrc = `${import.meta.env.BASE_URL}logo-symbol.svg`;

  // If icon-only variant
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img
          src={symbolSrc}
          alt="소울측량 심볼마크"
          className={`${symbolSizes[size]} object-contain drop-shadow-xs`}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // If stacked variant (e.g. Hero showcase or centered presentation)
  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        <img
          src={symbolSrc}
          alt="소울측량 심볼마크"
          className={`${symbolSizes[size]} object-contain mb-3 drop-shadow-xs`}
          referrerPolicy="no-referrer"
        />
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
        <img
          src={symbolSrc}
          alt="소울측량 심볼"
          className={`${symbolSizes[size]} object-contain`}
          referrerPolicy="no-referrer"
        />
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

