import React from 'react';
import { ArrowRight, PhoneCall, ChevronDown, CheckCircle2, Building2 } from 'lucide-react';
import heroMiniatureImg from '../assets/images/survey_miniature_hero_cube_1789151725760.jpg';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 bg-[#FAF9F6] survey-grid-pattern border-b border-stone-200/80 snap-section flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Focused Main Copy & Direct Actions */}
          <div className="lg:col-span-7">
            {/* Experience Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold mb-5 sm:mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>2004년부터 20년+ 현장 실무 · 대표자 직접 현장 확인</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.28] mb-5 sm:mb-6">
              필요한 측량, <br className="hidden sm:inline" />
              <span className="text-emerald-800 underline decoration-emerald-300 decoration-4 underline-offset-8">
                편하게 이야기하세요.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl font-normal">
              현장의 조건과 필요한 성과물을 확인하고 <br className="hidden sm:inline" />
              적합한 측량방법을 함께 검토합니다.
            </p>

            {/* Primary Action Buttons (사무실/직통 병행 표기 적용) */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-3.5 mb-8">
              {/* 견적 문의하기 */}
              <a
                id="hero-inquiry-cta"
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-bold text-white bg-slate-900 hover:bg-emerald-800 active:scale-98 rounded-xl shadow-xs transition-all group min-h-[48px]"
              >
                <span>측량 문의하기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* 사무실 전화 */}
              <a
                id="hero-office-phone-cta"
                href="tel:02-6082-0092"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm sm:text-base font-bold text-slate-800 bg-stone-100 hover:bg-stone-200 border border-stone-300/80 active:bg-stone-300 rounded-xl transition-colors min-h-[48px]"
                title="사무실 전화 연결"
              >
                <Building2 className="w-4 h-4 text-slate-600" />
                <span>사무실 (02-6082-0092)</span>
              </a>

              {/* 대표 직통 전화 */}
              <a
                id="hero-mobile-phone-cta"
                href="tel:010-2322-0092"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm sm:text-base font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 active:bg-emerald-200 rounded-xl transition-colors min-h-[48px]"
                title="대표 직통 전화 연결"
              >
                <PhoneCall className="w-4 h-4 text-emerald-700" />
                <span>직통 (010-2322-0092)</span>
              </a>

              {/* 실적 보기 */}
              <a
