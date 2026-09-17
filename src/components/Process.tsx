import React from 'react';

export const Process: React.FC = () => {
  const steps = [
    { label: '문의' },
    { label: '현장 확인' },
    { label: '측량방법 검토' },
    { label: '측량' },
    { label: '성과물 납품' }
  ];

  return (
    <section id="process" className="py-8 sm:py-10 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-shrink-0">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
                WORKFLOW
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                측량 진행 절차
              </h3>
            </div>

            {/* 1-Line Streamlined Pipeline as requested by user */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
              {steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className={`px-3 py-1.5 rounded-xl border transition-all ${
                    idx === steps.length - 1
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300 shadow-2xs'
                      : 'bg-white text-slate-800 border-slate-200/90 shadow-2xs'
                  }`}>
                    <span>{step.label}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <span className="text-slate-400 font-semibold px-0.5">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="text-xs text-slate-500 font-medium">
              도면 및 성과조서 일괄 납품
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
