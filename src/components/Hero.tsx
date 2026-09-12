import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Compass, PhoneCall, ChevronDown, Box, Sparkles, MapPin, Radio } from 'lucide-react';
import { SoulSurveyLogo } from './SoulSurveyLogo';
import heroMiniatureImg from '../assets/images/survey_miniature_hero_cube_1789151725760.jpg';

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
        <span>VRS-RTK GNSS NETWORK LINKED</span>
        <span className="text-slate-500">SOUL SURVEY CO., LTD.</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7">
            {/* Slogan Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold mb-5 sm:mb-6 shadow-2xs">
              <Box className="w-3.5 h-3.5 text-emerald-700" />
              <span>3D 정밀 디오라마 감성 · 20년 현장 경력의 든든한 측량 파트너</span>
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
              복잡하고 어려운 토목 측량이 아닙니다. 정교한 3D 디오라마 모델을 다루듯, 
              현장의 조건과 필요한 성과물을 대표자가 직접 살펴보고 가장 명쾌한 해결책을 찾아드립니다.
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
                <span>회사 실적 및 참여경력 보기</span>
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

          {/* Right Column: 3D Miniature Diorama Showcase Box */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-slate-50 via-white to-emerald-50/40 rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-md relative overflow-hidden group">
              {/* Header inside the box */}
              <div className="flex items-center justify-between gap-2 pb-3 mb-3.5 border-b border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-900">
                  <Box className="w-4 h-4 text-emerald-700" />
                  <span>3D SURVEY MODEL DIORAMA</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 font-bold">
                  RTK-GPS LINKED
                </span>
              </div>

              {/* 3D Miniature Hero Image with Floating Elements */}
              <div className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 mb-4">
                <img 
                  src={heroMiniatureImg} 
                  alt="소울측량 3D 디오라마 현장 모델" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.03]"
                />

                {/* Floating Top Pill */}
                <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>PRECISE SURVEY MODEL</span>
                </div>

                {/* Bottom Logo Overlay */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-white/80 flex items-center justify-between text-xs shadow-sm">
                  <div className="flex items-center gap-2">
                    <SoulSurveyLogo size="sm" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 font-mono">
                    1:500 CAD READY
                  </span>
                </div>
              </div>

              {/* Specs: 1-col items in Miniature Cube Style */}
              <div className="space-y-1.5 text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-slate-100">
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400 font-medium">현장 책임자</span>
                  <span className="font-bold text-slate-800">대표 측량사 100% 직수행</span>
                </div>
                <div className="flex items-center justify-between py-1 border-t border-slate-50">
                  <span className="text-slate-400 font-medium">납품 포맷</span>
                  <span className="font-bold text-emerald-800">CAD (DWG/DXF) + 성과조서</span>
                </div>
                <div className="flex items-center justify-between py-1 border-t border-slate-50">
                  <span className="text-slate-400 font-medium">적용 분야</span>
                  <span className="font-bold text-slate-800">지형현황 · 인허가 · 토목공사 · 기준점</span>
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium px-1">
                <span className="flex items-center gap-1 text-emerald-800 font-bold">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>현장 맞춤형 신속 상담</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400">EST. 2004</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
