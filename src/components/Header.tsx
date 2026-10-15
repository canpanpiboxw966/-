import React, { useState, useEffect } from 'react';
import { SoulSurveyLogo } from './SoulSurveyLogo';
import { Phone, Lock, Menu, X, ArrowRight, ChevronRight, MessageSquare, Building2 } from 'lucide-react';

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
        <a href="#hero" className="flex items-center group transition-transform active:scale-98">
          <SoulSurveyLogo variant="horizontal" size="md" />
        </a>

        {/* Desktop Navigation Links (PC Only) */}
        <nav className="hidden lg:flex items-center space-x-1 lg:space-x-2">
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

        {/* Right CTA Area for Tablet / PC (병행 표기 적용) */}
        <div className="hidden md:flex items-center gap-2">
          {/* Office Phone Call */}
          <a
            id="header-office-phone-btn"
            href="tel:02-6082-0092"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200/90 border border-slate-200 rounded-xl transition-colors"
            title="사무실 대표전화 통화"
          >
            <Building2 className="w-3.5 h-3.5 text-slate-600" />
            <span>02-6082-0092</span>
          </a>

          {/* Direct Mobile Call */}
          <a
            id="header-mobile-phone-btn"
            href="tel:010-2322-0092"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl transition-colors"
            title="대표 직통 휴대폰 통화"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>010-2322-0092</span>
          </a>

          {/* Quick Inquiry Button */}
          <a
            id="header-inquiry-btn"
            href="#contact"
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-extrabold text-white bg-slate-900 hover:bg-emerald-800 rounded-xl shadow-xs transition-all active:scale-98 ml-1"
          >
            <span>견적문의</span>
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
          {/* Quick Office Call Button on Mobile */}
          <a
            href="tel:02-6082-0092"
            className="p-2.5 text-slate-700 bg-slate-100 active:bg-slate-200 rounded-xl border border-slate-200 flex items-center justify-center min-w-[44px] min-h-[44px]"
            aria-label="사무실 전화 연결"
            title="사무실 02-6082-0092"
          >
            <Building2 className="w-4 h-4" />
          </a>

          {/* Quick Direct Mobile Call Button on Mobile */}
          <a
            href="tel:010-2322-0092"
            className="p-2.5 text-emerald-800 bg-emerald-50 active:bg-emerald-100 rounded-xl border border-emerald-200 flex items-center justify-center min-w-[44px] min-h-[44px]"
            aria-label="직통 전화 연결"
            title="직통 010-2322-0092"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="
