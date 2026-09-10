import React from 'react';
import { 
  Compass, 
  HardHat, 
  Waves, 
  MapPin, 
  ShieldCheck, 
  Satellite, 
  Plane,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================== */}
        {/* SECTION 1: 측량 분야 (Surveying Fields) */}
        {/* ============================================================== */}
        <div className="mb-20">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold tracking-wider text-emerald-800 uppercase mb-2">
              SURVEYING FIELDS
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              측량 분야
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              설계부터 시공, 준공, 유지관리까지 건설 및 개발 프로젝트의 전 과정에 필요한 정밀 측량 업무를 수행합니다.
            </p>
          </div>

          <div className="space-y-8">
            {/* -------------------------------------------------- */}
            {/* 01. 설계측량 */}
            {/* -------------------------------------------------- */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-mono font-bold text-lg flex-shrink-0">
                    01
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      설계측량
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-800 font-semibold mt-0.5">
                      건설공사의 설계에 필요한 현장 정보를 취득하는 측량입니다.
                    </p>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="self-start md:self-auto inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>설계측량 상담하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    기준점측량, 수준측량, 지형현황측량, 종·횡단측량, 용지경계측량 및 지장물조사 등을 통해 
                    설계에 필요한 지형도, 종·횡단면도, 지장물도 등의 기초자료를 작성합니다.
                  </p>
                </div>

                <div className="lg:col-span-5 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/70">
                  <div className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                    <span>주요 업무</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      '기준점측량',
                      '수준측량',
                      '지형현황측량',
                      '종·횡단측량',
                      '용지경계측량',
                      '지장물조사',
                      '설계용 측량성과 작성'
                    ].map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------- */}
            {/* 02. 공사측량 */}
            {/* -------------------------------------------------- */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-mono font-bold text-lg flex-shrink-0">
                    02
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      공사측량
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-800 font-semibold mt-0.5">
                      도로, 철도, 단지, 하천 등 건설공사의 설계·시공·준공 및 시설물 유지관리에 필요한 측량입니다.
                    </p>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="self-start md:self-auto inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>공사측량 상담하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="pt-6">
                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                  착공 전 설계도서와 현장의 일치 여부를 확인하고, 시공 과정에서는 구조물의 정확한 위치와 높이를 현장에 구현하며, 
                  준공 시에는 시공된 시설물의 현황을 측량합니다.
                </p>

                {/* 3 Phases: 시공 전 / 시공 중 / 준공측량 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Phase 1: 시공 전 측량 */}
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                        STEP 1
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">
                        시공 전 측량
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        공사 착공 후 설계도서에 명시된 구조물의 위치와 토공량 등이 실제 현장과 일치하는지 확인합니다.
                      </p>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-700 mb-2">주요 업무</div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          '설계기준점 확인',
                          '시공기준점 측량',
                          '중심선측량',
                          '종·횡단측량',
                          '토공량 산출',
                          '용지경계 확인',
                          '지장물조사'
                        ].map((item, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] text-slate-800">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Phase 2: 시공 중 측량 */}
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                        STEP 2
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">
                        시공 중 측량
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        설계도면에 따라 구조물이 정확한 위치와 규격으로 시공될 수 있도록 현장에서 위치와 높이를 확인합니다.
                      </p>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-700 mb-2">주요 업무</div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          '정위치측량',
                          '확인측량',
                          '검사측량'
                        ].map((item, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] text-slate-800">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Phase 3: 준공측량 */}
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                        STEP 3
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">
                        준공측량
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        설계도서에 따라 시공된 구조물 및 시설물의 현재 위치와 현황을 정확하게 조사하여 시설물의 유지관리에 필요한 자료를 작성합니다.
                      </p>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-700 mb-2">주요 업무</div>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          '준공 현황측량',
                          '시설물 최종 검측',
                          '유지관리 준공도서 작성'
                        ].map((item, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] text-slate-800">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------- */}
            {/* 03. 하천측량 */}
            {/* -------------------------------------------------- */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-mono font-bold text-lg flex-shrink-0">
                    03
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      하천측량
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-800 font-semibold mt-0.5">
                      하천의 지형과 단면 및 사업계획에 필요한 자료를 취득하는 측량입니다.
                    </p>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="self-start md:self-auto inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>하천측량 상담하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    하천의 종단 및 횡단 형태를 조사하고 하천공사 시행계획 등에 필요한 측량성과를 작성합니다.
                  </p>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70">
                    <div className="text-xs font-bold text-slate-900 mb-1">
                      종·횡단면도 작성
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      하천의 양안 및 종단측점 등을 기준으로 표고와 지반고를 측정하여 하천의 종단 및 횡단 형태를 파악합니다.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/70">
                  <div className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                    <span>주요 업무</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      '하천 종단측량',
                      '하천 횡단측량',
                      '하천 현황측량',
                      '하천공사 시행계획 관련 측량'
                    ].map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------- */}
            {/* 04. 지형현황측량 */}
            {/* -------------------------------------------------- */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-mono font-bold text-lg flex-shrink-0">
                    04
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      지형현황측량
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-800 font-semibold mt-0.5">
                      공사 및 개발 예정지역의 현재 지형과 지물을 조사하여 설계 및 계획에 필요한 지형현황도를 작성하는 측량입니다.
                    </p>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="self-start md:self-auto inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>지형현황측량 상담하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    국가기준점 및 공공기준점 등으로부터 확보한 기준점을 바탕으로 측량 대상 지역의 지형과 시설물 등의 위치를 측정합니다.
                  </p>
                </div>

                <div className="lg:col-span-5 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/70">
                  <div className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                    <span>주요 업무</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      '지형현황측량',
                      '지형도 작성',
                      '시설물 위치 측량',
                      '표고 및 지반고 측량',
                      '설계 기초자료 작성'
                    ].map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------- */}
            {/* 05. 시설물 유지관리측량 */}
            {/* -------------------------------------------------- */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-mono font-bold text-lg flex-shrink-0">
                    05
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      시설물 유지관리측량
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-800 font-semibold mt-0.5">
                      기존 시설물의 유지·보수·보완·확장·이전 등에 필요한 측량 및 시설물의 변위량을 확인하는 측량입니다.
                    </p>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="self-start md:self-auto inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 hover:text-emerald-800 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>유지관리측량 상담하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    시설물의 현재 위치와 상태를 측량하고 유지관리 및 후속 공사에 필요한 측량자료를 제공합니다.
                  </p>
                </div>

                <div className="lg:col-span-5 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/70">
                  <div className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-700" />
                    <span>주요 업무</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      '시설물 현황측량',
                      '시설물 위치 확인',
                      '시설물 변위량 확인',
                      '유지·보수 관련 측량',
                      '확장 및 이전 관련 측량'
                    ].map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-xs font-medium text-slate-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SECTION 2: 측량 기술 (Surveying Technologies) */}
        {/* ============================================================== */}
        <div className="pt-8 border-t border-slate-200">
          <div className="max-w-3xl mb-10">
            <div className="text-xs font-bold tracking-wider text-emerald-800 uppercase mb-2">
              SURVEYING TECHNOLOGY
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              측량 기술
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              현장의 조건과 작업 목적에 맞추어 최신 GNSS 위성측량 및 드론 항공측량 기술을 조합하여 정밀하고 신속한 공간정보를 구축합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* GNSS 측량 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                    <Satellite className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      GNSS 측량
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">Global Navigation Satellite System</span>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  위성항법시스템(GNSS)을 활용하여 현장의 위치와 좌표를 정밀하게 취득합니다.
                </p>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  기준점측량, 현황측량, 지형측량 및 공사측량 등 현장의 조건과 작업 목적에 따라 GNSS 측량을 활용합니다.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-900 mb-2">활용 분야</div>
                <div className="text-xs text-emerald-900 font-semibold bg-emerald-50/70 border border-emerald-200/60 p-3 rounded-lg">
                  기준점측량 · 현황측량 · 지형측량 · 공사측량
                </div>
              </div>
            </div>

            {/* 드론측량 */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
                    <Plane className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      드론측량
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">UAV Photogrammetry & Spatial Data</span>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  드론을 이용하여 대상 지역을 촬영하고 취득한 데이터를 후처리하여 측량 및 공간정보 자료로 활용합니다.
                </p>

                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  현장의 규모와 주변 환경, 필요한 성과물을 검토하여 기존 지상측량과 적절하게 조합하여 활용합니다.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-900 mb-2">활용 분야</div>
                <div className="text-xs text-emerald-900 font-semibold bg-emerald-50/70 border border-emerald-200/60 p-3 rounded-lg">
                  지형현황 파악 · 넓은 지역 현황조사 · 측량자료 구축 · 공간정보 자료 작성
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
