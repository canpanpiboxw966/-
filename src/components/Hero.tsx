import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Compass, PhoneCall, ChevronDown, Box, Sparkles } from 'lucide-react';
import { SoulSurveyLogo } from './SoulSurveyLogo';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 overflow-hidden bg-white survey-grid-pattern border-b border-slate-200/80">
      {/* Subtle CAD Coordinate Crosshair Accents (Desktop Large Screens) */}
      <div className="absolute top-24 left-8 text-[11px] font-mono text-slate-400 hidden xl:flex flex-col gap-0.5 pointer-events-none select-none">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7">
            {/* Slogan Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold mb-5 sm:mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>작지만 가까운 측량 파트너 · 20년+ 현장 경험</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.25] mb-5 sm:mb-6">
              필요한 측량, <br className="hidden sm:inline" />
              <span className="text-emerald-800 underline decoration-emerald-300 decoration-4 underline-offset-8">
                편하게 이야기하세요.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl font-normal">
              현장의 조건과 필요한 성과물을 먼저 꼼꼼히 살펴보고 가장 적합한 측량방법을 함께 검토합니다. 
              설계사무소, 건설사, 현장 담당자가 전화 한 통으로 상황을 설명하면 즉시 이해하고 실질적인 해결책을 찾아드립니다.
            </p>

            {/* Primary Action Buttons: Mobile 1-col (stacked, full-width) -> Desktop flex row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mb-10">
              <a
                id="hero-inquiry-cta"
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-slate-900 hover:bg-emerald-800 active:scale-98 rounded-xl shadow-sm transition-all group min-h-[48px]"
              >
                <span>현장 측량 견적 문의하기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                id="hero-portfolio-cta"
                href="#portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 active:bg-slate-100 rounded-xl shadow-2xs transition-colors min-h-[48px]"
              >
                <span>주요 실적 및 경력 보기</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </a>

              <a
                id="hero-phone-cta"
                href="tel:010-0000-0000"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 active:bg-emerald-200 rounded-xl transition-colors min-h-[48px]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>010-0000-0000</span>
              </a>
            </div>

            {/* 3 Core Trust Badges: Mobile 1-col -> Tablet/PC 3-col */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
              <div className="flex items-start gap-3 p-3 sm:p-0 rounded-xl bg-slate-50/70 sm:bg-transparent border border-slate-200/60 sm:border-0">
                <div className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-800 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">20년+ 베테랑 현장 감각</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">2004년부터 100여 개 대형 현장 실무 경험</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 sm:p-0 rounded-xl bg-slate-50/70 sm:bg-transparent border border-slate-200/60 sm:border-0">
                <div className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-slate-700 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">대표자 100% 직접 책임</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">외주 하청 없이 대표자가 현장 실측부터 도면 작성까지</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 sm:p-0 rounded-xl bg-slate-50/70 sm:bg-transparent border border-slate-200/60 sm:border-0">
                <div className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0 text-teal-800 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">과잉 없는 맞춤 제안</h3>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">인허가·설계 목적에 꼭 필요한 최적 공정 제시</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Official Brand Identity Card with 3D Miniature Touch */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-emerald-700" />
                  <span>OFFICIAL IDENTITY & PRECISION</span>
                </div>
                <span className="text-slate-400 font-mono font-normal">EST. 2004</span>
              </div>

              {/* Exact Logo Box */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-2xs flex items-center justify-center mb-5">
                <SoulSurveyLogo size="xl" className="w-full justify-center" />
              </div>

              {/* Specs: Clean 1-col items */}
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">전문분야</span>
                  <span className="font-bold text-slate-800">일반측량 · 공사측량 · GNSS · 드론</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">현장 총괄</span>
                  <span className="font-bold text-emerald-800">20년+ 베테랑 기술자 직접 답사</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">성과품 포맷</span>
                  <span className="font-bold text-slate-800">CAD (DWG/DXF), 수치지형도, 성과조서</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-slate-400 font-medium">서비스 지역</span>
                  <span className="font-bold text-slate-800">수도권 전역 및 전국 주요 현장 출장</span>
                </div>
              </div>

              {/* Miniature Trust Tag */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <Sparkles className="w-3 h-3" />
                  <span>현장 맞춤 1:1 직통 소통</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400">STATUS: READY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
