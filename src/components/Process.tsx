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
  Box,
  CheckCircle2,
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
    <section id="process" className="py-16 sm:py-24 bg-white border-b border-slate-200 survey-grid-pattern relative overflow-hidden">
      {/* Background Micro Coordinates */}
      <div className="absolute top-8 right-8 text-[11px] font-mono text-slate-300 hidden xl:block select-none pointer-events-none text-right">
        <div>[WORKFLOW ENGINE: 7-STEP MODULAR PIPELINE]</div>
        <div>QC PROTOCOL · ISO COMPLIANT CAD EXPORT</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold mb-2.5">
            <Box className="w-3.5 h-3.5 text-emerald-700" />
            <span>SURVEY WORKFLOW · 3D 단계별 프로세스</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            의뢰부터 납품까지 7단계 정밀 공정
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            블록을 조립하듯 투명하고 체계적인 프로세스로, 납기 지연 없이 정확한 성과물을 안전하게 전달해 드립니다.
          </p>
        </div>

        {/* Reassurance Banner */}
        <div className="bg-gradient-to-r from-emerald-50 via-slate-50 to-white border border-emerald-200/80 rounded-2xl p-5 sm:p-6 mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                측량 종류나 법적 명칭을 잘 모르셔도 괜찮습니다
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                현장 주소와 원하시는 목적(설계, 착공, 인허가, 지형현황 등)만 알려주시면 가장 적합한 측량방법을 함께 검토해 드립니다.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-900 bg-emerald-300 hover:bg-emerald-400 rounded-xl transition-colors shadow-2xs whitespace-nowrap"
          >
            <span>편하게 상담 신청하기</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Process Steps Cards: 1 Col Mobile -> 2 Col Tablet -> 4 Col PC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = iconMap[step.icon] || PhoneCall;
            const isLast = idx === PROCESS_STEPS.length - 1;

            return (
              <div
                key={step.step}
                className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-300 relative flex flex-col justify-between group shadow-2xs hover:shadow-md ${
                  isLast 
                    ? 'border-emerald-600 bg-gradient-to-b from-white to-emerald-50/50 ring-2 ring-emerald-500/20' 
                    : 'border-slate-200/90 hover:border-emerald-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <span className="font-mono text-2xl font-black text-emerald-800">
                      {step.step}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-emerald-100 text-slate-700 group-hover:text-emerald-800 flex items-center justify-center transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 font-bold block mb-1 uppercase tracking-wider">
                    STAGE 0{idx + 1}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>STEP {step.step}</span>
                  {idx < PROCESS_STEPS.length - 1 ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      다음 단계 <ArrowRight className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="text-emerald-800 font-bold flex items-center gap-1">
                      납품 완료 <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    </span>
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
