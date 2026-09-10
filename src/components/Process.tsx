import React from 'react';
import { PROCESS_STEPS } from '../data/initialData';
import { 
  PhoneCall, 
  FileSearch, 
  Layers, 
  CheckSquare, 
  Crosshair, 
  FileSpreadsheet, 
  Send,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const Process: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    PhoneCall,
    FileSearch,
    Layers,
    CheckSquare,
    Crosshair,
    FileSpreadsheet,
    Send
  };

  return (
    <section id="process" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-wider text-emerald-800 uppercase mb-2">
            SURVEY WORKFLOW
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            의뢰부터 납품까지 7단계 진행 절차
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            체계적이고 투명한 프로세스로 납기 지연 없이 정확한 성과물을 안전하게 전달해 드립니다.
          </p>
        </div>

        {/* Empathy Reassurance Banner */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                측량 종류나 법적 명칭을 잘 모르셔도 괜찮습니다.
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                현장 주소와 원하시는 목적(설계, 착공, 경계 확인 등)만 알려주시면 가장 적합한 측량방법을 함께 찾아드립니다.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="self-start sm:self-auto px-4 py-2 text-xs font-bold text-slate-900 bg-emerald-200 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap"
          >
            편하게 상담 신청하기
          </a>
        </div>

        {/* Process Steps Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = iconMap[step.icon] || PhoneCall;
            const isLast = idx === PROCESS_STEPS.length - 1;

            return (
              <div
                key={step.step}
                className={`bg-white rounded-xl p-5 sm:p-6 border transition-all duration-200 relative flex flex-col justify-between ${
                  isLast 
                    ? 'border-emerald-700 bg-emerald-50/30' 
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xl font-black text-emerald-800">
                      {step.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>STEP {step.step}</span>
                  {idx < PROCESS_STEPS.length - 1 ? (
                    <span className="text-emerald-700 font-semibold">다음 단계 &rarr;</span>
                  ) : (
                    <span className="text-emerald-800 font-bold">납품 완료 ✓</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
