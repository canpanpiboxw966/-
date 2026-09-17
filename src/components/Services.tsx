import React from 'react';
import { 
  Compass, 
  HardHat, 
  MapPin, 
  Waves, 
  ShieldCheck, 
  Satellite, 
  ArrowRight
} from 'lucide-react';

export const Services: React.FC = () => {
  const services = [
    {
      num: '01',
      title: '설계측량',
      desc: '설계에 필요한 기준점·지형·종횡단 및 현황자료',
      detail: '도로, 단지, 건축 등 계획 및 설계를 위한 3차원 지형 데이터 취득',
      icon: Compass
    },
    {
      num: '02',
      title: '공사측량',
      desc: '시공기준점부터 정위치·확인·검측·준공측량',
      detail: '터파기, 구조물 먹매김, 레벨 검측 및 준공 현황 실측',
      icon: HardHat
    },
    {
      num: '03',
      title: '현황측량',
      desc: '현장의 지형과 시설물의 위치·표고를 정확하게 측량',
      detail: '인허가 신청, 부지 점유 현황, 시설물 위치 실측 및 CAD 도면화',
      icon: MapPin
    },
    {
      num: '04',
      title: '하천측량',
      desc: '하천 종·횡단 및 현황측량',
      detail: '하상 단면, 수위 기준점, 제방 안전성 및 정비 계획용 측량',
      icon: Waves
    },
    {
      num: '05',
      title: '시설물 유지관리측량',
      desc: '시설물 현황·위치 및 유지관리에 필요한 측량',
      detail: '구조물 변위 관측, 정밀 위치 점검 및 시설물 이력 관리',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="text-xs font-bold tracking-wider text-emerald-800 uppercase mb-2">
            SURVEYING SERVICES
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            주요 측량 업무
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">
            현장의 조건과 목적에 맞춰 꼭 필요한 측량 성과물을 정확하게 제공합니다.
          </p>
        </div>

        {/* 5 Core Services Grid: Mobile 1-col -> Tablet 2-col -> PC 3-col */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.num}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80">
                      {srv.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-emerald-100 text-slate-700 group-hover:text-emerald-800 flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {srv.title}
                  </h3>

                  <p className="text-sm font-semibold text-emerald-900 leading-snug mb-1.5">
                    "{srv.desc}"
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {srv.detail}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">CAD 도면 + 성과조서</span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-emerald-800 transition-colors"
                  >
                    <span>문의하기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technology Sub-banner: GNSS & Drone */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
              <Satellite className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>GNSS · 드론 항공측량</span>
                <span className="text-[11px] font-normal text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  현장 활용 기술
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                현장 조건과 목적에 맞게 최신 GNSS 위성측량 및 드론 기술을 적절히 활용합니다.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="self-start sm:self-auto px-4 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
          >
            측량방법 문의하기
          </a>
        </div>
      </div>
    </section>
  );
};
