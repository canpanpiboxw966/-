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

  // Height-only sizing to strictly preserve natural aspect ratio without squishing or stretching
  const symbolHeights = {
    sm: 'h-7 sm:h-8',
    md: 'h-9 sm:h-10 md:h-10',
    lg: 'h-12 sm:h-14',
    xl: 'h-16 sm:h-20'
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

  // Error fallback handler ensuring image resolves across all common paths
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    const currentSrc = target.getAttribute('src') || '';
    if (currentSrc === '/assets/soul-survey-logo.png') {
      target.src = '/assets/로고.jpg';
    } else if (currentSrc === '/assets/로고.jpg') {
      target.src = '/soul-survey-logo.png';
    } else if (currentSrc === '/soul-survey-logo.png') {
      target.src = '/로고.jpg';
    }
  };

  // 1. Icon-only variant
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img
          src="/assets/soul-survey-logo.png"
          alt="소울측량 SOUL SURVEY"
          className={`${symbolHeights[size]} w-auto object-contain flex-shrink-0 drop-shadow-xs`}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={handleImageError}
        />
      </div>
    );
  }

  // 2. Stacked variant (e.g. Hero showcase or centered presentation)
  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        <div className="flex items-center justify-center mb-3">
          <img
            src="/assets/soul-survey-logo.png"
            alt="소울측량 SOUL SURVEY"
            className={`${symbolHeights[size]} w-auto object-contain flex-shrink-0 drop-shadow-xs`}
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
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

  // 3. Standard Horizontal Lockup (Header, Footer, Navigation)
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* 1. Actual Logo Image (Natural ratio strictly preserved with height-only constraint) */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <img
          src="/assets/soul-survey-logo.png"
          alt="소울측량 SOUL SURVEY"
          className={`${symbolHeights[size]} w-auto object-contain flex-shrink-0`}
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={handleImageError}
        />
      </div>

      {/* 2. Harmonious Typographic Lockup (글씨 부분 유지) */}
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


