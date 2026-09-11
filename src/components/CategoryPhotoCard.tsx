import React, { useState, useEffect } from 'react';
import { 
  ZoomIn, 
  Camera, 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Compass, 
  Scale, 
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';

interface CategoryPhotoCardProps {
  categoryId: string;
  categoryName: string;
  imageUrl?: string;
  imageTitle?: string;
  imageAlt?: string;
  onOpenLightbox: (url: string, title: string, desc?: string) => void;
  onOpenUpload: (categoryId: string) => void;
  isAdminAuthenticated?: boolean;
}

// Map category to a professional icon & theme color
const CATEGORY_THEME: Record<string, { icon: React.ReactNode; code: string; label: string }> = {
  redevelopment: {
    icon: <Building2 className="w-8 h-8 text-emerald-700" />,
    code: 'SEC-01',
    label: '재개발·재건축 정밀측량'
  },
  apartments: {
    icon: <Compass className="w-8 h-8 text-teal-700" />,
    code: 'SEC-02',
    label: '아파트 시공 및 기준점'
  },
  defense: {
    icon: <ShieldCheck className="w-8 h-8 text-indigo-700" />,
    code: 'SEC-03',
    label: '국방 및 보안시설 측량'
  },
  cadastral: {
    icon: <MapPin className="w-8 h-8 text-emerald-800" />,
    code: 'SEC-04',
    label: '지적확정 및 구역계'
  },
  'special-landmarks': {
    icon: <Building2 className="w-8 h-8 text-amber-700" />,
    code: 'SEC-05',
    label: '초고층 및 특수권리'
  },
  institutional: {
    icon: <FileSpreadsheet className="w-8 h-8 text-slate-700" />,
    code: 'SEC-06',
    label: '공공기반 및 종합시설'
  },
  court: {
    icon: <Scale className="w-8 h-8 text-slate-800" />,
    code: 'SEC-07',
    label: '법원감정(재판조력자)'
  }
};

export const CategoryPhotoCard: React.FC<CategoryPhotoCardProps> = ({
  categoryId,
  categoryName,
  imageUrl,
  imageTitle,
  imageAlt,
  onOpenLightbox,
  onOpenUpload,
  isAdminAuthenticated = false
}) => {
  const [imgError, setImgError] = useState(false);
  const theme = CATEGORY_THEME[categoryId] || CATEGORY_THEME.institutional;

  // Reset imgError whenever imageUrl changes
  useEffect(() => {
    setImgError(false);
  }, [imageUrl]);

  // Determine if valid image is present and has not errored
  const hasValidImage = Boolean(imageUrl && imageUrl.trim() !== '' && !imgError);

  if (hasValidImage && imageUrl) {
    return (
      <div className="relative w-full sm:w-44 h-36 sm:h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 group shadow-2xs">
        <img
          src={imageUrl}
          alt={imageAlt || categoryName}
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          onClick={() => onOpenLightbox(imageUrl, categoryName, imageTitle)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
          loading="lazy"
        />
        <div 
          onClick={() => onOpenLightbox(imageUrl, categoryName, imageTitle)}
          className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/25 transition-colors flex items-center justify-center cursor-pointer"
        >
          <div className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-white/90 text-slate-800 shadow">
            <ZoomIn className="w-4 h-4" />
          </div>
        </div>
        {/* Quick edit / delete / change button (Only visible to authenticated admin) */}
        {isAdminAuthenticated && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenUpload(categoryId);
            }}
            className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md bg-slate-900/90 hover:bg-emerald-950 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-sm border border-slate-700 font-medium"
            title="[관리자] 사진 편집 및 삭제"
          >
            <Camera className="w-2.5 h-2.5 text-emerald-400" />
            <span>편집 · 삭제</span>
          </button>
        )}
      </div>
    );
  }

  // Fallback: Architectural Blueprint Graphic Badge
  return (
    <div 
      onClick={() => {
        if (isAdminAuthenticated) {
          onOpenUpload(categoryId);
        }
      }}
      className={`relative w-full sm:w-44 h-36 sm:h-28 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 flex-shrink-0 p-3 flex flex-col justify-between select-none shadow-2xs transition-all ${
        isAdminAuthenticated 
          ? 'cursor-pointer group hover:border-emerald-500' 
          : 'cursor-default'
      }`}
      title={isAdminAuthenticated ? '[관리자] 클릭하여 실제 현장사진 등록' : `${categoryName} 측량 성과 데이터`}
    >
      {/* Blueprint grid background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '14px 14px'
        }}
      />

      <div className="relative z-10 flex items-center justify-between">
        <span className="font-mono text-[9px] text-emerald-400 font-bold tracking-wider">
          {theme.code}
        </span>
        {isAdminAuthenticated ? (
          <span className="text-[10px] text-slate-400 group-hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium">
            <Camera className="w-3 h-3 text-emerald-400" />
            <span>사진 등록</span>
          </span>
        ) : (
          <span className="text-[9px] font-mono text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/60">
            SOUL SURVEY
          </span>
        )}
      </div>

      <div className="relative z-10 text-center py-0.5">
        <div className="text-white font-bold text-xs truncate drop-shadow-xs">
          {categoryName}
        </div>
        <div className="text-[10px] text-emerald-400/90 font-medium mt-0.5">
          {theme.label}
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center">
        {isAdminAuthenticated ? (
          <div className="px-2 py-0.5 rounded bg-emerald-700/80 group-hover:bg-emerald-600 text-white text-[9px] font-bold transition-colors">
            + [관리자] 사진 등록
          </div>
        ) : (
          <div className="text-[9px] text-slate-400 font-medium">
            현장 실측 도면 · 보고서 성과품
          </div>
        )}
      </div>
    </div>
  );
};
