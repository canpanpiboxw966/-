import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Compass, PhoneCall, ChevronDown, Check } from 'lucide-react';
import { SoulSurveyLogo } from './SoulSurveyLogo';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white survey-grid-pattern border-b border-slate-200/80">
      {/* Subtle CAD Coordinate Crosshair Accents */}
      <div className="absolute top-24 left-10 text-[11px] font-mono text-slate-400 hidden xl:flex flex-col gap-0.5 pointer-events-none select-none">
        <span>X: 198425.320</span>
        <span>Y: 541098.850</span>
        <span>H: +42.185 m</span>
        <span className="text-emerald-700 font-semibold">TBM #1 LINKED</span>
      </div>

      <div className="absolute bottom-12 right-12 text-[11px] font-mono text-slate-400 hidden xl:flex flex-col text-right gap-0.5 pointer-events-none select-none">
        <span>SYS: GRS80 TM-CENTRAL</span>
        <span>VRS-RTK 3D ACCURACY: ±1.2cm</span>
        <span className="text-slate-500">SOUL SURVEY CO., LTD.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7">
            {/* Slogan Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>작지만 가까운 측량 파트너 · 정확한 현장 대응 · 20년+ 현장 경험</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.25] mb-6">
              필요한 측량, <br className="hidden sm:inline" />
              <span className="text-emerald-800 underline decoration-emerald-200 decoration-4 underline-offset-8">
                편하게 이야기하세요.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl font-normal">
              현장의 조건과 필요한 성과물을 먼저 꼼꼼히 살펴보고 가장 적합한 측량방법을 함께 검토합니다. 
              설계사무소, 건설사, 현장 담당자가 전화 한 통으로 상황을 설명하면 즉시 이해하고 실질적인 해결책을 찾아드립니다.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <a
                id="hero-inquiry-cta"
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-slate-900 hover:bg-emerald-800 rounded-xl shadow-sm transition-all group"
              >
                <span>현장 측량 견적 문의하기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                id="hero-portfolio-cta"
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-2xs transition-colors"
              >
                <span>주요 실적 및 경력 보기</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </a>

              <a
                id="hero-phone-cta"
                href="tel:010-0000-0000"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>010-0000-0000</span>
              </a>
            </div>

            {/* 3 Core Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-800 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">20년+ 베테랑 현장 감각</h3>
                  <p className="text-xs text-slate-500 mt-0.5">2004년부터 100여 개 국책·민간 대형 현장 실무 경험</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-700 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">대표자 100% 직접 책임</h3>
                  <p className="text-xs text-slate-500 mt-0.5">외주 하청 없이 대표자가 현장 실측부터 도면 작성까지 직수행</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0 text-teal-800 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">과잉 없는 맞춤 제안</h3>
                  <p className="text-xs text-slate-500 mt-0.5">인허가·설계·시공 목적에 최적화된 합리적인 작업 방법 제시</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Official Brand Identity Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-50 to-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm relative">
              <div className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase mb-4 flex items-center justify-between">
                <span>OFFICIAL IDENTITY</span>
                <span className="text-slate-400 font-mono font-normal">EST. 2004</span>
              </div>

              {/* Exact Unaltered Logo */}
              <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-100 shadow-2xs flex items-center justify-center mb-6">
                <SoulSurveyLogo size="xl" className="w-full justify-center" />
              </div>

              {/* Company Specs */}
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">전문분야</span>
                  <span className="font-semibold text-slate-800">일반측량 · GNSS 위성측량 · 드론공간정보</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">현장 총괄</span>
                  <span className="font-semibold text-emerald-800">20년+ 베테랑 기술자 직접 답사 및 납품</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">성과품 포맷</span>
                  <span className="font-semibold text-slate-800">CAD (DWG/DXF), 수치지형도, 성과조서</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">서비스 지역</span>
                  <span className="font-semibold text-slate-800">수도권 전역 및 전국 주요 현장 출장</span>
                </div>
              </div>

              {/* Fast Direct Call Bar */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">실시간 직통 상담</span>
                <a
                  href="tel:010-0000-0000"
                  className="text-xs font-bold text-slate-900 hover:text-emerald-700 flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                  <span>010-0000-0000</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
