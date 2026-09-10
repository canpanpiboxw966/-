import React from 'react';
import { MessageSquare, Target, Clock, Coins, Award, Check } from 'lucide-react';

export const About: React.FC = () => {
  const promises = [
    {
      icon: MessageSquare,
      title: '현장 눈높이의 친근한 소통',
      desc: '어려운 측량 전문용어로 벽을 치지 않습니다. 현장 여건과 필요하신 성과품을 편하게 설명해 주시면 즉시 알아듣고 최적의 해결 방식을 함께 상의합니다.'
    },
    {
      icon: Target,
      title: '타협 없는 정밀도와 원칙',
      desc: '기준점 하나의 오차가 설계 오류와 시공 하자, 인허가 반려로 이어질 수 있습니다. 20년간 지켜온 철저한 폐합 오차 검증과 성과 검측 원칙을 지킵니다.'
    },
    {
      icon: Clock,
      title: '공정에 맞춘 신속한 납품',
      desc: '설계 일정과 착공 기한은 현장의 생명입니다. 약속된 기한 내에 설계자가 바로 활용할 수 있는 표준 규격의 CAD 성과품(dwg)과 조서를 신속히 제공합니다.'
    },
    {
      icon: Coins,
      title: '정직하고 투명한 맞춤 견적',
      desc: '대형 회사의 무거운 관리비나 불필요한 과잉측량을 배제합니다. 현장 목적(인허가, 설계, 시공)에 꼭 맞는 실속 있는 작업으로 합리적인 비용을 제안합니다.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold tracking-wider text-emerald-800 uppercase mb-2">
            ABOUT SOUL SURVEY
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
            작지만 가장 든든한 측량 파트너, <br className="hidden sm:inline" />
            <span className="text-emerald-800">20년+ 현장 경험</span>으로 답합니다.
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            SOUL SURVEY는 규모만 큰 종합 엔지니어링 회사의 무거운 절차 대신,
            설계사무소·건설사·현장 소장님이 언제든 부담 없이 연락할 수 있는 
            ‘작지만 실력 있는 측량 파트너’입니다.
          </p>
        </div>

        {/* Narrative & Representative Background Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Column: Story & Positioning */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold mb-5">
                <Award className="w-3.5 h-3.5" />
                <span>현장 실무 2004년부터 현재까지</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 leading-relaxed">
                "정확한 측량은 현장의 목소리를 제대로 듣는 것에서 출발합니다."
              </h3>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  대표자는 2004년부터 지난 20여 년간 수도권 재개발·재건축, 잠실 롯데월드타워 초고층 공사, 
                  국방부 핵심 군사기지, 은평뉴타운 지적확정측량 등 대한민국 주요 건설 현장의 가장 치열한 최전선에서 
                  직접 측량기를 메고 기준점을 세워 왔습니다.
                </p>
                <p>
                  대형 회사의 경우 실제 현장에는 초임 기사가 투입되어 소통이 어긋나거나 일정에 차질이 생기기 쉽습니다. 
                  하지만 SOUL SURVEY는 <strong>대표자가 직접 현장을 답사하고, 관측하며, CAD 도면 성과품까지 직접 검토</strong>합니다.
                </p>
                <p className="font-medium text-slate-800">
                  전화해서 현장 상황을 설명하시면 바로 알아듣고, 무엇이 필요한지 먼저 짚어드리며 함께 방법을 찾아드립니다.
                </p>
              </div>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 mt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-black text-slate-900">20년+</div>
                <div className="text-xs text-slate-500 mt-0.5">현장 실무 경력</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-700">대표자 직수행</div>
                <div className="text-xs text-slate-500 mt-0.5">현장 조사 및 성과 검측</div>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">신속 소통</div>
                <div className="text-xs text-slate-500 mt-0.5">현장 맞춤형 솔루션</div>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Core Promises */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {promises.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">{p.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brand Checklist Banner */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden survey-grid-pattern-dark">
          <div className="max-w-3xl">
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-emerald-400">
              이런 분들께 SOUL SURVEY를 적극 추천합니다
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>도면과 현장 여건이 달라 난감한 설계사무소 담당자</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>착공 전 건축선 및 경계 이격거리를 확실히 짚고 넘어가야 할 건설 소장님</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>어떤 측량을 해야 인허가가 통과되는지 판단이 필요한 건축주·토지주</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>대형 엔지니어링의 높은 견적과 느린 피드백에 지치신 현장 관계자</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
