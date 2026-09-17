import React, { useState, useEffect } from 'react';
import { SoulSurveyLogo } from './SoulSurveyLogo';
import { Phone, Lock, Menu, X, ArrowRight, ChevronRight, MessageSquare } from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to PC
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: '회사소개', href: '#about' },
    { label: '주요실적', href: '#portfolio' },
    { label: '업무분야', href: '#services' },
    { label: '진행절차', href: '#process' },
    { label: '측량문의', href: '#contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF9F6]/95 backdrop-blur-md shadow-2xs border-b border-stone-200/80 py-2.5 sm:py-3'
          : 'bg-[#FAF9F6]/85 backdrop-blur-sm border-b border-stone-200/60 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo (Responsive sizing) */}
        <a href="#" className="flex items-center group transition-transform active:scale-98">
          <SoulSurveyLogo variant="horizontal" size="md" />
        </a>

        {/* Desktop Navigation Links (PC Only) */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3.5 py-2 text-sm font-bold text-slate-700 hover:text-emerald-800 hover:bg-slate-100/80 rounded-xl transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Area for Tablet / PC */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Direct Phone Call */}
          <a
            id="header-phone-btn"
            href="tel:010-0000-0000"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200/90 border border-slate-200 rounded-xl transition-colors"
            title="대표 번호 직통 통화"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>010-0000-0000</span>
          </a>

          {/* Quick Inquiry Button */}
          <a
            id="header-inquiry-btn"
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold text-white bg-slate-900 hover:bg-emerald-800 rounded-xl shadow-xs transition-all active:scale-98"
          >
            <span>측량 견적문의</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Admin Lock Button */}
          <button
            id="header-admin-btn"
            onClick={onOpenAdmin}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            title="관리자 모드"
            aria-label="관리자 로그인"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Action Controls (Mobile & Small Tablet) */}
        <div className="flex md:hidden items-center gap-1.5">
          {/* Quick Call Button on Mobile */}
          <a
            href="tel:010-0000-0000"
            className="p-2.5 text-emerald-800 bg-emerald-50 active:bg-emerald-100 rounded-xl border border-emerald-200 flex items-center justify-center min-w-[44px] min-h-[44px]"
            aria-label="전화 연결"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-slate-800 hover:bg-slate-100 active:bg-slate-200 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors border border-slate-200"
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Touch-friendly 1-Col layout) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-lg border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3.5 text-base font-bold text-slate-800 hover:bg-slate-50 hover:text-emerald-800 rounded-xl active:bg-slate-100 transition-colors"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}
          </nav>

          {/* Mobile Quick Action Buttons */}
          <div className="pt-4 mt-3 border-t border-slate-100 space-y-2.5">
            <a
              href="tel:010-0000-0000"
              className="flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-bold text-slate-900 bg-slate-100 active:bg-slate-200 rounded-xl border border-slate-200/80 w-full min-h-[46px]"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>전화문의: 010-0000-0000</span>
            </a>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-extrabold text-white bg-slate-900 active:bg-emerald-800 rounded-xl w-full min-h-[46px] shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>온라인 측량 상담신청</span>
            </a>

            <div className="flex justify-center pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>관리자 로그인</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
