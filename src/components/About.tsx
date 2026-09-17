import React from 'react';
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react';
import miniatureImg from '../assets/images/survey_miniature_diorama_1789150690134.jpg';

interface AboutProps {
  onSelectExperienceTab?: () => void;
}

export const About: React.FC<AboutProps> = ({ onSelectExperienceTab }) => {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-[#F6F6F3] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Story: Content Left, Supportive Visual Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-14 sm:mb-16">
          <div className="lg:col-span-7">
            <div className="text-xs font-bold tracking-wider text-emerald-800 uppercase mb-3">
              ABOUT SOUL SURVEY
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-6">
              현장을 아는 측량, <br />
              <span className="text-emerald-800">필요한 만큼 정확하게.</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              <p>
                측량이 필요한데 어떤 방법으로 해야 할지 모르셔도 괜찮습니다.
              </p>
              <p>
                현장의 조건과 필요한 성과물을 확인하고 <br className="hidden sm:inline" />
                적합한 측량방법과 작업 범위를 함께 검토합니다.
              </p>
              <p className="font-semibold text-slate-800">
                SOUL SURVEY는 2004년부터 현장에서 측량해온 기술자가 <br className="hidden sm:inline" />
                직접 현장을 확인하고 작업합니다.
              </p>
            </div>

            {/* Consolidated Principle Callout */}
            <div className="mt-7 pt-6 border-t border-stone-200/80">
              <div className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 bg-white px-4 py-3 rounded-xl border border-stone-200/90 shadow-2xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                <span>현장을 직접 확인하고, 필요한 만큼 정확하게 측량합니다.</span>
              </div>
            </div>
          </div>

          {/* Supportive Visual: Clean Diorama Image as Secondary Reference */}
          <div className="lg:col-span-5">
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-stone-200/90 shadow-2xs">
              <div className="relative rounded-xl overflow-hidden bg-stone-100">
                <img 
                  src={miniatureImg} 
                  alt="소울측량 지형 데이터 시각화" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="text-xs text-slate-500 mt-3 px-1 text-center">
                지형과 시설물 현황을 파악하여 설계 및 시공에 적합한 데이터로 제공합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Representative Field Experience Section (Dark Background Kept) */}
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden survey-grid-pattern-dark">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <div className="text-xs font-semibold text-emerald-400 mb-2">
                FIELD EXPERIENCE SINCE 2004
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-snug">
                2004년부터 현장에서 측량해왔습니다.
              </h3>
              <div className="text-sm font-bold text-emerald-300 mb-3">
                대표자가 직접 현장을 확인하고 측량합니다.
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                20년 넘게 다양한 건설 및 측량 현장에서 쌓은 경험을 바탕으로 
                현장 조건에 맞는 측량방법과 성과물을 함께 검토합니다.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="#portfolio"
                onClick={() => onSelectExperienceTab?.()}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-slate-900 bg-white hover:bg-emerald-50 rounded-xl transition-all shadow-sm"
              >
                <span>대표자 참여 경력 보기</span>
                <ChevronRight className="w-4 h-4 text-emerald-800" />
              </a>

              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-xl transition-all border border-slate-700"
              >
                <span>현장 상담 문의하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
