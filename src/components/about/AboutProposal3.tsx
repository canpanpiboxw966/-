import React, { useState } from 'react';
import { 
  MessageCircle, 
  HelpCircle, 
  CheckCircle, 
  Sparkles, 
  User, 
  Building, 
  HardHat, 
  ArrowRight,
  PhoneCall,
  FileCheck,
  Send,
  ThumbsUp
} from 'lucide-react';

export const AboutProposal3: React.FC = () => {
  const [activeStoryTab, setActiveStoryTab] = useState<'owner' | 'architect' | 'contractor'>('owner');

  const stories = {
    owner: {
      role: '개인 건축주 / 토지주',
      roleIcon: User,
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      question: '“옆집 담장이 우리 땅으로 넘어온 것 같은데... 이웃끼리 얼굴 붉히지 않고 조용하고 명쾌하게 해결하는 방법 없을까요?”',
      subtext: '측량 신청 절차도 복잡하고, 관공서에 문의하면 한 달 넘게 걸린다는데 답답해요.',
      solutionTitle: '공인된 경계 현황측량으로 감정 싸움 없이 법적 기준선을 찾아드립니다.',
      solutionDesc: '소울측량은 대표자가 직접 현장에 방문해 최신 광파기로 실제 지장물(담장, 옹벽, 수목)의 위치를 1cm 단위로 정밀 실측합니다. 객관적인 실측 성과도면(DWG/PDF)을 제공하여 이웃 간에 불필요한 언쟁 없이 합리적인 합의를 이끌어낼 수 있도록 든든하게 도와드립니다.',
      tag: '분쟁 방지 & 평화로운 해결'
    },
    architect: {
      role: '설계사무소 소장님 / 담당자',
      roleIcon: Building,
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      question: '“인허가 접수일이 코앞인데, 기존 지형도면이랑 현장 고저차가 전혀 안 맞아서 설계가 막혔어요. CAD 도면 빨리 받을 수 있나요?”',
      subtext: '현장 나가볼 시간은 없고, 측량업체에 맡겨도 CAD 레이어가 엉망이면 다시 작업해야 해서 골치 아픕니다.',
      solutionTitle: '설계사무소 표준 CAD 레이어에 꼭 맞춘 1/500 수치지형도를 약속된 날짜에 납품합니다.',
      solutionDesc: '현장의 도로 경계선, 인접지 레벨, 오수·우수 맨홀 인입선, 인접 건축물 처마선까지 설계자가 꼭 필요로 하는 필수 레이어를 꼼꼼히 분리하여 작성합니다. 도면을 열자마자 바로 배치도에 링크해 쓸 수 있도록 깔끔하게 정리해 보내드립니다.',
      tag: '설계 친화적 CAD 맞춤 납품'
    },
    contractor: {
      role: '건설사 현장소장님 / 시공사',
      roleIcon: HardHat,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      question: '“내일부터 포크레인 투입해서 터파기 시작해야 합니다! 파일 위치랑 기초 먹매김, 베테랑이 직접 와서 잡아줄 수 있나요?”',
      subtext: '대형 업체에 연락하면 초보 기사가 나와서 기준점 오차가 날까 봐 밤잠을 설칩니다.',
      solutionTitle: '20년 초고층·대형 토목 경력의 대표자가 직접 현장 기준선을 정밀 마킹합니다.',
      solutionDesc: '잠실 롯데월드타워, 수도권 대규모 재개발 현장을 책임져 온 대표자가 직접 장비를 들고 출동합니다. 규준틀 설치, 기초 터파기 레벨 검측, 옹벽 라인 체크까지 시공팀의 언어로 즉각 소통하며 10mm의 오차도 허용하지 않는 완벽한 현장 안전망을 만들어드립니다.',
      tag: '20년 베테랑 직수행 시공측량'
    }
  };

  const current = stories[activeStoryTab];
  const CurrentIcon = current.roleIcon;

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3 shadow-2xs">
          <MessageCircle className="w-3.5 h-3.5 text-amber-700" />
          <span>디자인 제안 3 · 공감 스토리 & 고민 해결 말풍선 감성</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
          어려운 측량 용어 대신, <br className="hidden sm:inline" />
          <span className="text-emerald-800">“어떤 고민으로 찾아오셨나요?”</span>부터 묻습니다.
        </h2>
        <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
          측량이 필요한 순간은 언제나 긴장되고 막막합니다. 소울측량은 높은 문턱과 딱딱한 규정을 내세우지 않고, 
          고객의 입장에서 먼저 듣고 가장 속 시원한 해답을 드립니다.
        </p>
      </div>

      {/* Role Selector Tabs (Who are you?) */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl max-w-xl">
        <button
          onClick={() => setActiveStoryTab('owner')}
          className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeStoryTab === 'owner'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <User className="w-3.5 h-3.5 text-amber-600" />
          <span>개인 건축주·토지주</span>
        </button>

        <button
          onClick={() => setActiveStoryTab('architect')}
          className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeStoryTab === 'architect'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Building className="w-3.5 h-3.5 text-blue-600" />
          <span>설계사무소 소장님</span>
        </button>

        <button
          onClick={() => setActiveStoryTab('contractor')}
          className={`flex-1 min-w-[140px] px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeStoryTab === 'contractor'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <HardHat className="w-3.5 h-3.5 text-emerald-600" />
          <span>건설·시공 소장님</span>
        </button>
      </div>

      {/* Comic / Dialogue Bubble Interactive Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-9 space-y-6 relative overflow-hidden">
        {/* Customer Question Bubble */}
        <div className="flex items-start gap-4 max-w-2xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center flex-shrink-0 shadow-2xs">
            <CurrentIcon className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">{current.role}</span>
              <span className="text-[10px] text-slate-400 font-mono">Real Voice</span>
            </div>
            <div className="bg-slate-100/90 text-slate-800 p-4 sm:p-5 rounded-2xl rounded-tl-sm border border-slate-200/80 shadow-2xs relative">
              <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {current.question}
              </p>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {current.subtext}
              </p>
            </div>
          </div>
        </div>

        {/* Soul Survey Answer Bubble */}
        <div className="flex items-start gap-4 max-w-2xl ml-auto flex-row-reverse">
          <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <Sparkles className="w-6 h-6 text-emerald-300" />
          </div>
          <div className="space-y-1.5 flex-1 text-right">
            <div className="flex items-center gap-2 justify-end">
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                {current.tag}
              </span>
              <span className="text-xs font-bold text-emerald-900">SOUL SURVEY의 해결책</span>
            </div>
            <div className="bg-emerald-900 text-white p-4 sm:p-5 rounded-2xl rounded-tr-sm shadow-md text-left relative">
              <h4 className="text-sm sm:text-base font-bold text-emerald-200 leading-snug mb-2 flex items-center gap-1.5">
                <ThumbsUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{current.solutionTitle}</span>
              </h4>
              <p className="text-xs sm:text-sm text-emerald-50/90 leading-relaxed font-light">
                {current.solutionDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Step Storyboard Timeline */}
      <div className="p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200">
        <div className="text-center max-w-lg mx-auto mb-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            소울측량과 함께하는 가장 편안한 4단계 여정
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            어렵고 긴 절차 없이, 전화 한 통으로 시작해 정확한 성과품까지 논스톱으로 진행됩니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold mb-3 font-mono">
              01
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
              <span>편안한 유선 상담</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              지번과 필요한 목적(인허가, 경계확인, 시공)만 말씀해 주시면 즉시 알아듣고 최적 공정을 안내합니다.
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold mb-3 font-mono">
              02
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <HardHat className="w-3.5 h-3.5 text-emerald-700" />
              <span>대표자 현장 정밀 관측</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              위탁이나 초보 기사 없이, 20년 경력의 대표자가 최신 GNSS 장비를 챙겨 현장을 꼼꼼히 조사합니다.
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold mb-3 font-mono">
              03
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>표준 CAD 도면 완성</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              설계자가 바로 활용할 수 있는 깔끔한 레이어의 수치지형도(dwg) 및 조서를 정확히 작성합니다.
            </p>
          </div>

          <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center text-xs font-bold mb-3 font-mono">
              04
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-emerald-900 mb-1 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>성과품 납품 & 고민 해결</span>
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              약속된 기한 내 성과품을 전달하고, 필요시 사후 설계 협의나 시공 체크까지 끝까지 함께합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
