import React from 'react';
import { SoulSurveyLogo } from './SoulSurveyLogo';
import { Phone, Mail, MapPin, Lock, ChevronRight } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Company Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <SoulSurveyLogo variant="full" theme="dark" size="md" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm pt-2">
              작지만 가까운 측량 파트너 · 정확한 현장 대응 · 20년+ 현장 경험. <br />
              현장의 조건과 필요한 성과물을 먼저 살펴보고 적합한 측량방법을 함께 검토합니다.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1 font-normal">
              <div>상호: 소울측량 (SOUL SURVEY) | 대표자 직접 총괄</div>
              <div>사업분야: 일반측량(설계·공사·지형현황·하천·시설물유지관리), GNSS, 드론 항공측량</div>
              <div>출장지역: 수도권(서울·경기·인천) 및 전국 주요 토목·건축 현장</div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <div className="text-white font-bold text-sm tracking-wider uppercase">
              바로가기
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>회사 소개 (ABOUT)</span>
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>주요 실적 및 대표자 경력</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>업무 분야 및 핵심 기술</span>
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>7단계 진행 절차</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>온라인 견적 및 상담문의</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <div className="text-white font-bold text-sm tracking-wider uppercase">
              고객 상담 및 견적 접수
            </div>
            <div className="space-y-2.5 pt-1">
              <a
                href="tel:010-0000-0000"
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition-colors text-white font-mono"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-sans">대표자 직통 상담</div>
                  <div className="text-sm font-bold tracking-wide">010-0000-0000</div>
                </div>
              </a>

              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-mono">soulsurvey@naver.com</span>
              </div>
              <div className="text-[11px] text-slate-400">
                대용량 CAD 도면(dwg, dxf) 및 현장 사진은 이메일로도 보내실 수 있습니다.
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p className="leading-relaxed text-center md:text-left max-w-2xl">
            ※ 본 웹사이트에 기재된 대표자 과거 참여 실적(2004~2024)은 회사 설립 전 대표자의 현장 총괄 및 책임 실무 경력이며,
            SOUL SURVEY의 회사 신규 수행실적과는 명확히 구분하여 안내하고 있습니다.
          </p>

          <div className="flex items-center gap-4 flex-shrink-0">
            <span>© 2025 SOUL SURVEY. All rights reserved.</span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              title="관리자 모드 (비밀번호: 1111)"
            >
              <Lock className="w-3 h-3" />
              <span>관리자</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
