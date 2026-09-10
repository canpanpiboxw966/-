import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'horizontal' | 'icon' | 'stacked';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const SoulSurveyLogo: React.FC<LogoProps> = ({
  className = '',
  theme = 'light',
  size = 'md'
}) => {
  const isDark = theme === 'dark';
  const logoSrc = isDark ? '/logo-white.svg' : '/logo.svg';

  // Proportional sizing matching standard header and section layouts
  const sizeStyles = {
    sm: 'h-10 sm:h-12 w-auto max-w-[220px] sm:max-w-[260px]',
    md: 'h-14 sm:h-16 w-auto max-w-[300px] sm:max-w-[340px]',
    lg: 'h-20 sm:h-24 w-auto max-w-[420px] sm:max-w-[480px]',
    xl: 'h-28 sm:h-36 w-auto max-w-[560px] sm:max-w-[640px]'
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="소울측량 SOUL SURVEYING - 종합 측량 / 공간정보 서비스"
        className={`object-contain block ${sizeStyles[size]}`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
