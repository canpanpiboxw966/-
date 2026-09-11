import React from 'react';
import { 
  HeartHandshake, 
  Coffee, 
  Sun, 
  Leaf, 
  Smile, 
  Shield, 
  Clock, 
  Check, 
  Sparkles 
} from 'lucide-react';
import cozyImg from '../../assets/images/cozy_consultation_warm_1789150708307.jpg';

export const AboutProposal4: React.FC = () => {
  const warmValues = [
    {
      icon: Coffee,
      title: '편안한 눈높이 상담',
      color: 'bg-amber-50 text-amber-800 border-amber-200/80',
      desc: '문턱 높은 측량사무소의 굳은 표정 대신, 따뜻한 차 한 잔 나누듯 편안하게 이야기를 경청합니다.'
    },
    {
      icon: Leaf,
      title: '과잉 없는 정직한 처방',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      desc: '불필요한 과잉측량을 권하지 않으며, 고객의 예산과 현장 목적에 가장 합리적인 길을 함께 찾습니다.'
    },
    {
      icon: Sun,
      title: '20년 장인정신의 정밀함',
      color: 'bg-orange-50 text-orange-800 border-orange-200/80',
      desc: '따뜻한 태도 뒤에는 20년간 대한민국 굵직한 건설 현장을 지켜온 칼 같은 1mm 정밀 원칙이 있습니다.'
    },
    {
      icon: HeartHandshake,
      title: '끝까지 책임지는 동행',
      color: 'bg-teal-50 text-teal-800 border-teal-200/80',
      desc: '도면만 던져주고 끝내지 않고, 인허가 보완이나 착공 단계에서 궁금하신 점까지 다정하게 챙겨드립니다.'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-amber-200/60">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold mb-3 shadow-2xs">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-700" />
            <span>디자인 제안 4 · 소프트 코지 & 파스텔 웜톤 감성</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
            측량, 이제 부담 갖지 마세요. <br className="hidden sm:inline" />
            <span className="text-amber-800">가장 편안하고 다정한 이웃</span>이 되어 드립니다.
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            건설과 토목이라는 거친 현장 속에서도, 소울측량은 사람을 향한 따뜻한 시선을 잃지 않습니다. 
            소형 대지부터 건축 인허가까지, 당신의 소중한 공간을 정성껏 보살핍니다.
          </p>
        </div>

        {/* Cozy Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs font-bold shadow-2xs self-start md:self-end">
          <Smile className="w-4 h-4 text-amber-700" />
          <span>편하게 이야기하는 측량 파트너</span>
        </div>
      </div>

      {/* Main Warm Feature Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFFDF9] p-6 sm:p-9 rounded-3xl border border-amber-100/90 shadow-sm relative overflow-hidden">
        {/* Left Warm Illustration */}
        <div className="lg:col-span-6 relative">
          <div className="rounded-3xl overflow-hidden shadow-sm border border-amber-200/60 bg-amber-50">
            <img 
              src={cozyImg} 
              alt="따뜻한 분위기의 소울측량 상담" 
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-3 -right-3 bg-white px-4 py-2.5 rounded-2xl border border-amber-200/80 shadow-md flex items-center gap-2 text-xs font-bold text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>1:1 맞춤 정밀 상담</span>
          </div>
        </div>

        {/* Right Story & Voice */}
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
            COZY & PROFESSIONAL
          </span>
          <h3 className="text-xl font-bold text-stone-900 leading-snug">
            “어려운 측량 도면 앞에서 <br />
            더 이상 주눅 들지 마세요.”
          </h3>
          <div className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
            <p>
              많은 분들이 ‘측량’ 하면 차갑고 딱딱한 관공서 규정이나 무거운 건설 장비부터 떠올리십니다. 
              하지만 측량의 본질은 고객이 소중한 내 땅을 안심하고 누릴 수 있도록 확실한 기준을 세워드리는 일입니다.
            </p>
            <p>
              소울측량은 20년 현장 경력의 대표자가 직접 찾아가, 전문용어 대신 일상의 다정한 언어로 설명해 드립니다. 
              내 집을 짓는 건축주의 설레는 마음과, 현장을 이끄는 소장님의 고단함을 누구보다 깊이 공감합니다.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-xl bg-amber-100/80 text-amber-900 text-xs font-semibold">
              #따뜻한소통
            </span>
            <span className="px-3 py-1 rounded-xl bg-emerald-100/80 text-emerald-900 text-xs font-semibold">
              #20년현장장인
            </span>
            <span className="px-3 py-1 rounded-xl bg-stone-100 text-stone-700 text-xs font-semibold">
              #대표자직접답사
            </span>
          </div>
        </div>
      </div>

      {/* 4 Cozy Value Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {warmValues.map((val, idx) => {
          const Icon = val.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-amber-100/90 shadow-2xs hover:shadow-sm hover:border-amber-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 border ${val.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm sm:text-base font-bold text-stone-900 mb-2">
                  {val.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-bold text-amber-800">
                <Check className="w-3.5 h-3.5 text-amber-600" />
                <span>소울측량의 약속</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Warm Quote Banner */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50/50 to-emerald-50 border border-amber-200/70 text-center">
        <p className="text-sm sm:text-base font-bold text-stone-800 leading-relaxed max-w-xl mx-auto">
          “작은 필지 하나라도 정성을 다합니다. <br className="hidden sm:inline" />
          가장 편안한 마음으로 소울측량의 문을 두드려주세요.”
        </p>
        <span className="text-xs text-amber-900/80 font-medium block mt-2">
          — SOUL SURVEY 대표 측량사 올림
        </span>
      </div>
    </div>
  );
};
