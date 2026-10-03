import React from 'react';
import { SoulSurveyLogo } from './SoulSurveyLogo';
import { Phone, Mail, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer
      id="main-footer"
      className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 scroll-snap-align-start relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-6 border-b border-slate-800/80 items-start">
          {/* Left Column: Logo & Core Business Info */}
          <div className="lg:col-span-7 space-y-3">
            <SoulSurveyLogo variant="full" theme="dark" size="sm" />

            <div className="text-[11px] sm:text-xs text-slate-400 space-y-1 font-normal pt-1 leading-relaxed">
              <div>상호: 소울측량 (SOUL SURVEY) | 대표자 직접 총괄</div>
              <div>사무실주소: 서울특별시 송파구 송파대로 366-9번지 101호, 우편번호05676</div>
              <div>사업분야: 일반측량(설계·공사·지형현황·하천·시설물유지관리), GNSS, 드론 항공측량</div>
              <div>출장지역: 수도권(서울·경기·인천) 및 전국 주요 토목·건축 현장</div>
            </div>
          </div>

          {/* Right Column: Customer Consultation & Estimate */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-white font-bold text-xs tracking-wider uppercase">
              고객 상담 및 견적 접수
            </div>
            <div className="space-y-2">
              <a
                href="tel:010-2322-0029"
                className="flex items-center gap-2.5 p-2 sm:p-2.5 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700/60 transition-colors text-white font-mono"
              >
                <div className="w-6 h-6 rounded-md bg-emerald-800 text-white flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-sans">대표자 직통 상담</span>
                  <span className="text-xs sm:text-sm font-bold tracking-wide">010-2322-0029</span>
                </div>
              </a>

              <div className="flex items-center gap-1.5 text-slate-300 text-xs">
                <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="font-mono">soulsurvey@naver.com</span>
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">
                대용량 CAD 도면(dwg, dxf) 및 현장 사진은 이메일로도 보내실 수 있습니다.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <span>© 2026 SOUL SURVEY. All rights reserved.</span>
          <button
            onClick={onOpenAdmin}
            className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            title="관리자 모드"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>관리자</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
