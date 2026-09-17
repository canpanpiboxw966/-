import React from 'react';
import { ArrowRight, PhoneCall, ChevronDown, CheckCircle2 } from 'lucide-react';
import heroMiniatureImg from '../assets/images/survey_miniature_hero_cube_1789151725760.jpg';

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 overflow-hidden bg-[#FAF9F6] survey-grid-pattern border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 mb-8">
              <a
                id="hero-inquiry-cta"
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-slate-900 hover:bg-emerald-800 active:scale-98 rounded-xl shadow-xs transition-all group min-h-[48px]"
              >
                <span>측량 문의하기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                id="hero-phone-cta"
                href="tel:010-0000-0000"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-bold text-slate-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 active:bg-emerald-200 rounded-xl transition-colors min-h-[48px]"
              >
                <PhoneCall className="w-4 h-4 text-emerald-700" />
                <span>전화하기 (010-0000-0000)</span>
              </a>

              <a
                id="hero-portfolio-cta"
                href="#portfolio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors min-h-[48px]"
              >
                <span>실적 보기</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Service Keywords Bar */}
            <div className="pt-5 border-t border-stone-200/80">
              <div className="text-xs font-semibold text-slate-400 mb-2">주요 일반측량 업무</div>
              <div className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                설계측량 <span className="text-slate-300 mx-1.5">·</span> 
                공사측량 <span className="text-slate-300 mx-1.5">·</span> 
                현황측량 <span className="text-slate-300 mx-1.5">·</span> 
                하천측량 <span className="text-slate-300 mx-1.5">·</span> 
                시설물 유지관리측량
              </div>
            </div>

            {/* Consolidated Experience Statement */}
            <div className="mt-5 p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900">2004년부터 현장에서 측량해왔습니다.</span> <br />
                20년 이상의 현장 경험을 바탕으로 대표자가 직접 현장을 확인합니다.
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Tasteful Visual (No Tech Clutter) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-2xs relative overflow-hidden group">
              <div className="relative rounded-2xl overflow-hidden shadow-2xs border border-stone-200 bg-stone-100">
                <img 
                  src={heroMiniatureImg} 
                  alt="소울측량 현장 디오라마" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>

              {/* Gentle, minimal caption */}
              <div className="mt-3.5 px-1.5 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700">현장 조건에 맞는 최적의 측량방법 검토</span>
                <span className="font-mono text-slate-400 text-[11px]">SOUL SURVEY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
