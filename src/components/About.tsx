import React, { useState } from 'react';
import { 
  Box, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Crosshair,
  ShieldCheck,
  Cpu,
  Radio,
  Award,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import miniatureImg from '../assets/images/survey_miniature_diorama_1789150690134.jpg';

export const About: React.FC = () => {
  const [activePin, setActivePin] = useState<number>(0);

  const pins = [
    {
      id: 0,
      title: '경계 복원 & 건축선 핀',
      desc: '대지 경계와 건축 한계선을 1mm 단위로 정확하게 짚어 이웃 간 분쟁을 미연에 방지합니다.',
      tag: '정밀도 ±5mm'
    },
    {
      id: 1,
      title: 'GNSS 위성 기준점',
      desc: '국토지리정보원 국가기준점과 실시간 연동하여 절대 오차 없는 세계측지계 좌표를 고정합니다.',
      tag: '국가기준점 폐합'
    },
    {
      id: 2,
      title: '등고선 & 수치지형 블록',
      desc: '현장의 고저차와 배수 경사를 3D 단면으로 추출하여 설계자가 바로 쓸 수 있는 CAD로 완성합니다.',
      tag: '1/500 DWG 완성'
    }
  ];

  const miniaturePillars = [
    {
      icon: Crosshair,
      title: '오차 없는 1mm 정밀도',
      subtitle: '타협 없는 성과 검측',
      desc: '기준점 하나의 오차가 큰 하자로 번지지 않도록, 20년간 지켜온 철저한 폐합 오차 검증 원칙을 고수합니다.'
    },
    {
      icon: Cpu,
      title: '대표자 직수행 & 직검측',
      subtitle: '초보기사 외주 배제',
      desc: '대형사의 현장 전달 누락 대신, 20년 경력 대표자가 직접 장비를 챙겨 현장 관측과 도면 검토를 마칩니다.'
    },
    {
      icon: Radio,
      title: '신속하고 가벼운 소통',
      subtitle: '설계사무소·현장 직통',
      desc: '무거운 절차와 결재 라인 없이, 전화 한 통으로 현장 상황을 즉시 파악하고 맞춤형 솔루션을 제안합니다.'
    },
    {
      icon: ShieldCheck,
      title: '거품 없는 실속 견적',
      subtitle: '투명하고 정직한 정산',
      desc: '불필요한 과잉측량을 권하지 않으며, 인허가·착공 목적에 꼭 필요한 알짜 공정만 합리적으로 제안합니다.'
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-50/80 border-b border-slate-200 relative overflow-hidden">
      {/* Background Micro Coordinates (PC only) */}
      <div className="absolute top-10 right-10 text-[11px] font-mono text-slate-300 hidden lg:block select-none pointer-events-none text-right">
        <div>[GEODETIC SURVEY MODEL: 3D DIORAMA]</div>
        <div>SCALE 1:500 · GRS80 TM-CENTRAL</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-3.5 shadow-2xs">
              <Box className="w-3.5 h-3.5 text-emerald-700" />
              <span>ABOUT SOUL SURVEY · 정밀 3D 미니어처 감성</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              정교한 측량 현장을 한눈에, <br className="hidden sm:inline" />
              <span className="text-emerald-800">작지만 정밀한 디오라마</span>처럼 보여드립니다.
            </h2>
            <p className="mt-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
              측량은 차갑고 어려운 토목 기술이 아닙니다. 땅 위의 모든 경계와 높낮이를 
              정교한 미니어처 블록을 맞추듯 한 치의 오차 없이 명쾌하고 따뜻하게 정리해 드립니다.
            </p>
          </div>

          {/* Isometric Micro Status Badges (Responsive: 3 cols on mobile/PC) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full lg:w-auto">
            <div className="px-3 py-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Accuracy</span>
              <span className="text-xs sm:text-sm font-mono font-extrabold text-slate-900">±0.005m</span>
            </div>
            <div className="px-3 py-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Experience</span>
              <span className="text-xs sm:text-sm font-mono font-extrabold text-emerald-800">20+ Years</span>
            </div>
            <div className="px-3 py-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] text-slate-400 block font-bold uppercase">Format</span>
              <span className="text-xs sm:text-sm font-mono font-extrabold text-slate-900">CAD / DWG</span>
            </div>
          </div>
        </div>

        {/* Main 3D Miniature Showcase Card: 1 Col on Mobile, 12-Col Grid on PC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 p-5 sm:p-8 lg:p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden mb-12 sm:mb-16">
          {/* Left: 3D Miniature Image Diorama */}
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
              <img 
                src={miniatureImg} 
                alt="소울측량 3D 미니어처 디오라마" 
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.02]"
              />
              
              {/* Top Floating Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold flex items-center gap-2 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>SOUL SURVEY 3D DIORAMA</span>
              </div>

              {/* Bottom Coordinate Bar */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/80 flex items-center justify-between text-xs text-slate-700 shadow-sm">
                <div className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-xs">
                  <span className="font-semibold text-slate-800">X: 198,420.35</span>
                  <span className="hidden sm:inline">Y: 541,209.12</span>
                  <span className="text-emerald-800 font-bold">H: +42.15m</span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  폐합오차 허용치 이내
                </span>
              </div>
            </div>
          </div>

          {/* Right: Interactive 3D Hotspot Selector */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>정밀 측량 핵심 포인트 미리보기</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              복잡한 대지 경계도, <br />
              깔끔한 미니어처처럼 명확해집니다
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              전원주택 단독필지부터 대규모 개발단지까지, 대표자가 직접 최신 GNSS 수신기와 광파기로 관측하여 눈에 보이지 않던 토지의 법적 경계선과 높낮이를 눈앞에 또렷이 구현합니다.
            </p>

            {/* Interactive Pin List (1-col on mobile, highly touch-friendly) */}
            <div className="space-y-2.5 pt-1">
              {pins.map((pin) => (
                <div
                  key={pin.id}
                  onClick={() => setActivePin(pin.id)}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer select-none ${
                    activePin === pin.id
                      ? 'bg-white border-emerald-500 shadow-sm ring-2 ring-emerald-500/20'
                      : 'bg-white/70 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                        activePin === pin.id ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {pin.id + 1}
                      </span>
                      <span>{pin.title}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      {pin.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-7">
                    {pin.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Isometric Style Pillar Cards: 1 Col Mobile -> 2 Col Tablet -> 4 Col PC */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              소울측량이 약속하는 4대 입체 원칙
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              크기보다 중요한 것은 현장과의 호흡이며, 20년의 경험이 담긴 정직한 약속입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {miniaturePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center mb-3.5 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 block mb-1">
                      {pillar.subtitle}
                    </span>
                    <h4 className="text-base font-extrabold text-slate-900 mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="font-semibold">PRINCIPLE 0{idx + 1}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Representative Experience Guarantee Banner */}
        <div className="mt-12 sm:mt-16 bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden survey-grid-pattern-dark">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950 border border-emerald-700/50 text-emerald-400 text-xs font-semibold mb-3">
                <Award className="w-3.5 h-3.5" />
                <span>2004년부터 20년+ 현장 실무 경력</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-snug">
                “대표자가 직접 현장을 답사하고, 관측하며, CAD 도면까지 책임집니다.”
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                잠실 롯데월드타워 초고층 공사, 수도권 대규모 재개발·재건축, 국방부 핵심 군사기지 등에서 
                20년간 지켜온 엄격한 기준점 검측 원칙으로 작은 필지 하나도 안전하고 완벽하게 측량합니다.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-slate-900 bg-white hover:bg-emerald-50 rounded-xl transition-all shadow-sm"
              >
                <span>측량 상담 및 견적 신청</span>
                <ChevronRight className="w-4 h-4 text-emerald-800" />
              </a>
              <a
                href="#portfolio"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-xl transition-all border border-slate-700"
              >
                <span>대표자 7개 분야 참여경력 보기</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
