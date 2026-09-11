import React, { useState, useEffect } from 'react';
import { SoulSurveyLogo } from './SoulSurveyLogo';
import { Phone, Lock, Menu, X, ArrowRight, FileText } from 'lucide-react';

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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center group transition-transform hover:opacity-95">
          <SoulSurveyLogo variant="horizontal" size="md" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-slate-100/70 rounded-lg transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Area: Phone Call + Admin Gate + Quick Quote */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Direct Phone Call */}
          <a
            id="header-phone-btn"
            href="tel:010-0000-0000"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg transition-colors"
            title="대표 번호 직통 통화"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>010-0000-0000</span>
          </a>

          {/* Quick Inquiry Button */}
          <a
            id="header-inquiry-btn"
            href="#contact"
            className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-emerald-700 rounded-lg shadow-sm transition-all"
          >
            <span>측량 견적문의</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Admin Lock Button */}
          <button
            id="header-admin-btn"
            onClick={onOpenAdmin}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="관리자 모드 (비밀번호: 1111)"
            aria-label="관리자 로그인"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="tel:010-0000-0000"
            className="p-2 text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-100"
            aria-label="전화 연결"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-emerald-700 rounded-lg"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href="tel:010-0000-0000"
              className="flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-slate-800 bg-slate-100 rounded-lg"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>전화문의: 010-0000-0000</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-slate-900 rounded-lg"
            >
              <span>온라인 측량 상담신청</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-1.5 py-2 text-xs text-slate-500 hover:text-slate-800"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>관리자 모드</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
