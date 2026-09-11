import React, { useState } from 'react';
import { PastProjectCategory, CompanyProject } from '../types';
import { 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Briefcase, 
  Layers, 
  Info, 
  ZoomIn, 
  X,
  FileCheck,
  CheckCircle,
  Building2,
  FolderOpen,
  Camera,
  Plus
} from 'lucide-react';
import { CategoryPhotoCard } from './CategoryPhotoCard';
import { PhotoUploaderModal } from './PhotoUploaderModal';

interface PortfolioProps {
  pastCategories: PastProjectCategory[];
  companyProjects: CompanyProject[];
  onUpdatePastCategories?: (updated: PastProjectCategory[]) => void;
  isAdminAuthenticated?: boolean;
  onAdminLogin?: () => void;
  onAdminLogout?: () => void;
  onOpenAdmin?: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ 
  pastCategories, 
  companyProjects,
  onUpdatePastCategories,
  isAdminAuthenticated = false,
  onAdminLogin = () => {},
  onAdminLogout,
  onOpenAdmin
}) => {
  // Active Tab: 'experience' (대표자 참여 경력) vs 'company' (회사 수행실적)
  const [activeTab, setActiveTab] = useState<'experience' | 'company'>('experience');
  
  // Accordion state: set of open category IDs
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'redevelopment': true, // First one open by default
    'apartments': false,
    'defense': false,
    'cadastral': false,
    'special-landmarks': false,
    'institutional': false,
    'court': false
  });

  // Company project filter
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');

  // Selected project for detailed modal
  const [activeProjectModal, setActiveProjectModal] = useState<CompanyProject | null>(null);

  // Lightbox modal for photo preview
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; desc: string } | null>(null);

  // Photo uploader modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTargetCategoryId, setUploadTargetCategoryId] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    pastCategories.forEach(c => { allOpen[c.id] = true; });
    setOpenCategories(allOpen);
  };

  const collapseAll = () => {
    const allClosed: Record<string, boolean> = {};
    pastCategories.forEach(c => { allClosed[c.id] = false; });
    setOpenCategories(allClosed);
  };

  const categoriesFilterList = ['전체', '지형현황측량', '공사측량', '드론/GNSS', '하천측량', '시설물유지관리'];

  const filteredCompanyProjects = selectedFilter === '전체'
    ? companyProjects
    : companyProjects.filter(p => p.category === selectedFilter);

  return (
    <section id="portfolio" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="text-xs font-bold tracking-wider text-emerald-800 uppercase mb-2">
              PORTFOLIO & TRACK RECORD
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              측량 실적 및 현장 포트폴리오
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl">
              대표자의 20년+ 대형 프로젝트 참여 경험부터 SOUL SURVEY가 현재 직접 수행하고 있는 현장 실적까지 투명하게 공개합니다.
            </p>
          </div>

          {/* Primary View Switcher Tabs (Responsive: Full width & 44px touch targets on mobile, compact on PC) */}
          <div className="w-full md:w-auto flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              id="tab-experience-btn"
              onClick={() => setActiveTab('experience')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all min-h-[44px] select-none ${
                activeTab === 'experience'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>대표자 참여 경력</span>
            </button>
            <button
              id="tab-company-btn"
              onClick={() => setActiveTab('company')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all min-h-[44px] select-none ${
                activeTab === 'company'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <span>회사 수행실적</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW A: 대표자 참여 경력 (대표사진 & 첫째사업 상시 표기, 나머지는 펼쳤을 때) */}
        {/* ========================================================================= */}
        {activeTab === 'experience' && (
          <div>
            {/* Legal / Transparency Disclaimer Banner */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 sm:p-5 mb-8 flex items-start gap-3.5">
              <Info className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-emerald-950 leading-relaxed">
                <span className="font-bold text-emerald-900">신뢰의 투명한 고지:</span> 본 섹션의 프로젝트들은 
                <strong> 대표자가 현장 총괄 및 책임자로서 직접 참여했던 주요 대표 사업 경력</strong>입니다. 
                과장된 회사 홍보를 지양하고, 실제 현장 담당자에게 신뢰할 수 있는 실무 경험의 근거로 대표적인 프로젝트만을 발췌하여 투명하게 제시하며, 
                SOUL SURVEY 설립 이후의 직접 수행실적과는 명확히 구분하여 안내드립니다.
              </div>
            </div>

            {/* Accordion Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-2 border-b border-slate-200">
              <div className="text-xs sm:text-sm font-semibold text-slate-700">
                측량 구분별 주요 참여사업 (대표 실적 발췌)
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {isAdminAuthenticated && (
                  <button
                    onClick={() => {
                      setUploadTargetCategoryId(null);
                      setIsUploadModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs flex items-center gap-1.5"
                    title="[관리자] 보유하신 현장 사진을 사이트에 직접 등록 및 편집합니다"
                  >
                    <Camera className="w-3.5 h-3.5 text-emerald-300" />
                    <span>[관리자] 현장사진 등록 / 관리</span>
                  </button>
                )}
                <button
                  onClick={expandAll}
                  className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded transition-colors"
                >
                  모두 펼치기
                </button>
                <button
                  onClick={collapseAll}
                  className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded transition-colors"
                >
                  모두 접기
                </button>
              </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {pastCategories.map((category) => {
                const isOpen = !!openCategories[category.id];
                const firstProject = category.projects && category.projects.length > 0 ? category.projects[0] : null;

                return (
                  <div
                    key={category.id}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'border-emerald-700/50 bg-white shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    {/* Header: Photo + First Project (Always Visible) */}
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Photo Thumbnail / Blueprint Badge */}
                      <CategoryPhotoCard
                        categoryId={category.id}
                        categoryName={category.categoryName}
                        imageUrl={category.representativeImage?.url}
                        imageTitle={category.representativeImage?.title}
                        imageAlt={category.representativeImage?.alt}
                        onOpenLightbox={(url, title, desc) => setLightboxImage({ url, title, desc: desc || title })}
                        onOpenUpload={(catId) => {
                          setUploadTargetCategoryId(catId);
                          setIsUploadModalOpen(true);
                        }}
                        isAdminAuthenticated={isAdminAuthenticated}
                      />

                      {/* Middle: Category Title & First Project Info */}
                      <div 
                        onClick={() => toggleCategory(category.id)}
                        className="flex-1 min-w-0 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <h3 className="font-bold text-base sm:text-lg text-slate-900">
                            {category.categoryName}
                          </h3>
                        </div>

                        {/* First Project Highlight */}
                        {firstProject && (
                          <div className="p-2.5 sm:p-3 rounded-lg bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-emerald-950 truncate">
                                {firstProject.name}
                              </span>
                            </div>
                            {firstProject.note && (
                              <div className="text-[11px] text-emerald-800 mt-1 pl-1">
                                {firstProject.note}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Toggle hint */}
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <span>{isOpen ? '상세 사업 목록 접기' : '외 주요 참여사업 전체 목록 펼치기'}</span>
                          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-emerald-700' : ''}`} />
                        </div>
                      </div>

                      {/* Right Action Button */}
                      <button
                        id={`accordion-toggle-${category.id}`}
                        onClick={() => toggleCategory(category.id)}
                        className={`self-stretch sm:self-center px-4 py-2.5 rounded-xl border text-xs font-bold transition-colors flex items-center justify-center gap-1.5 flex-shrink-0 ${
                          isOpen
                            ? 'bg-emerald-800 text-white border-emerald-800 hover:bg-emerald-900'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                        aria-expanded={isOpen}
                      >
                        <span>{isOpen ? '목록 접기' : '전체 목록 펼치기'}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Accordion Body (Revealed When Expanded) */}
                    {isOpen && (
                      <div className="border-t border-slate-100 p-4 sm:p-6 bg-slate-50/60">
                        {/* Short Category Description & Clients */}
                        <div className="bg-white rounded-xl p-4 border border-slate-200/80 mb-5">
                          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                            {category.description}
                          </p>
                          {category.clients && category.clients.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                              <span className="font-semibold text-slate-700">
                                {category.id === 'court' ? '촉탁 및 관할 법원:' : '주요 발주처 / 협력사:'}
                              </span>
                              {category.clients.map((c, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] border border-slate-200/60 font-medium">
                                  {c}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Associated Photos Gallery */}
                        <div className="mb-5">
                          <div className="text-xs font-bold text-slate-800 mb-2.5 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <span>현장 및 사업 도면/사진</span>
                              <span className="text-emerald-700 font-bold">({category.images?.length || 0})</span>
                            </span>
                            {isAdminAuthenticated && (
                              <button
                                onClick={() => {
                                  setUploadTargetCategoryId(category.id);
                                  setIsUploadModalOpen(true);
                                }}
                                className="text-[11px] text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-1 font-semibold"
                                title="[관리자] 사진 추가 등록"
                              >
                                <Plus className="w-3 h-3" />
                                <span>[관리자] 사진 추가</span>
                              </button>
                            )}
                          </div>

                          {category.images && category.images.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {category.images.map((img, imgIdx) => (
                                <div
                                  key={imgIdx}
                                  onClick={() => setLightboxImage({
                                    url: img.url,
                                    title: img.title,
                                    desc: img.description
                                  })}
                                  className="group relative flex items-center gap-3 p-2.5 bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-xs cursor-pointer transition-all overflow-hidden"
                                >
                                  <div className="w-20 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 relative border border-slate-100">
                                    <img
                                      src={img.url}
                                      alt={img.title}
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                                      <ZoomIn className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    {img.tag && (
                                      <span className="inline-block px-1.5 py-0.2 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 rounded mb-1">
                                        {img.tag}
                                      </span>
                                    )}
                                    <div className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-900 transition-colors">
                                      {img.title}
                                    </div>
                                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                      {img.description}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div 
                              onClick={() => {
                                setUploadTargetCategoryId(category.id);
                                setIsUploadModalOpen(true);
                              }}
                              className="p-4 rounded-xl border border-dashed border-slate-300 bg-white hover:bg-emerald-50/50 cursor-pointer flex items-center justify-center gap-2 text-xs text-slate-600 hover:text-emerald-800 transition-colors"
                            >
                              <Camera className="w-4 h-4 text-emerald-700" />
                              <span>보유하신 실제 현장 사진이나 도면 파일을 등록해보세요. (클릭하여 추가)</span>
                            </div>
                          )}
                        </div>

                        {/* Full Detailed Projects Table */}
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                          <div className="px-4 py-3 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800">
                              {category.categoryName} 세부 참여사업 목록
                            </span>
                            <span className="text-[11px] text-slate-500">
                              대표 실적 발췌
                            </span>
                          </div>

                          <div className="divide-y divide-slate-100 max-h-[460px] overflow-y-auto">
                            {(category.projects || []).map((proj, pIdx) => {
                              // Check if there is an image for this project
                              const projName = proj?.name || '';
                              const matchingImg = category.images?.find(
                                img => {
                                  const imgTitle = img?.title || '';
                                  if (!imgTitle || !projName) return false;
                                  return imgTitle.includes(projName) || projName.includes(imgTitle);
                                }
                              );

                              return (
                                <div
                                  key={pIdx}
                                  className={`p-3 sm:p-3.5 flex items-start gap-3 text-xs sm:text-sm transition-colors ${
                                    pIdx === 0 ? 'bg-emerald-50/40' : 'hover:bg-slate-50'
                                  }`}
                                >
                                  <span className={`font-mono text-xs w-6 flex-shrink-0 text-right pt-0.5 ${
                                    pIdx === 0 ? 'text-emerald-700 font-bold' : 'text-slate-400'
                                  }`}>
                                    {(pIdx + 1).toString().padStart(2, '0')}
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className={`text-slate-900 ${pIdx === 0 ? 'font-bold' : 'font-medium'}`}>
                                        {proj.name}
                                      </span>
                                      {matchingImg && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setLightboxImage({
                                              url: matchingImg.url,
                                              title: matchingImg.title,
                                              desc: matchingImg.description
                                            });
                                          }}
                                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200/80 transition-colors"
                                          title="사업 관련 사진 보기"
                                        >
                                          <ZoomIn className="w-2.5 h-2.5 text-emerald-700" />
                                          <span>사진 보기</span>
                                        </button>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 flex-wrap">
                                      {proj.client && (
                                        <span className="text-slate-600">발주: {proj.client}</span>
                                      )}
                                      {proj.note && (
                                        <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded text-[10px]">
                                          {proj.note}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW B: 회사 수행실적 (SOUL SURVEY Direct Execution Projects) */}
        {/* ========================================================================= */}
        {activeTab === 'company' && (
          <div>
            {/* Header intro note */}
            <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 survey-grid-pattern-dark">
              <div>
                <div className="inline-flex items-center gap-2 text-xs text-emerald-400 font-bold mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>SOUL SURVEY 직접 수행 실적</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold">새로운 현장의 정밀한 기록을 하나씩 축적하고 있습니다</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  과장된 실적으로 시작하기보다, 소울측량이 직접 현장을 밟고 정확히 납품한 최신 성과물만을 투명하게 기록합니다.
                </p>
              </div>
              <a
                href="#contact"
                className="self-start sm:self-auto px-4 py-2.5 text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap"
              >
                우리 현장도 의뢰하기
              </a>
            </div>

            {/* Category Filter Chips */}
            {companyProjects.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-6">
                {categoriesFilterList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedFilter(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      selectedFilter === cat
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* Projects Grid or Clean Empty State */}
            {filteredCompanyProjects.length === 0 ? (
              <div className="text-center py-16 px-6 bg-slate-50 rounded-2xl border border-dashed border-slate-300 max-w-2xl mx-auto my-6">
                <div className="w-14 h-14 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-center mx-auto mb-4 text-emerald-800">
                  <Building2 className="w-7 h-7" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  신규 현장 실적이 곧 업데이트될 예정입니다
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto mb-6">
                  과장된 샘플이 아닌, 소울측량이 직접 수행한 검증된 최신 현장만을 투명하게 등록해 나갈 예정입니다. 
                  대표자의 16년+ 정밀 측량 경력은 상단의 <strong>[대표자 참여경력 (7개 분야)]</strong> 탭에서 언제든지 상세히 확인하실 수 있습니다.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => setActiveTab('experience')}
                    className="px-4 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    대표자 참여경력 (7개 분야) 보러가기
                  </button>
                  <a
                    href="#contact"
                    className="px-4 py-2 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
                  >
                    새로운 현장 의뢰하기
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanyProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setActiveProjectModal(project)}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-emerald-400 transition-all cursor-pointer flex flex-col group"
                  >
                    {/* Thumbnail Image */}
                    <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                      {project.featuredImage ? (
                        <img
                          src={project.featuredImage}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400">
                          <Building2 className="w-10 h-10 mb-1 text-slate-300" />
                          <span className="text-[11px] font-medium text-slate-500">현장 기록 사진</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 text-[11px] font-bold rounded bg-slate-900/85 backdrop-blur-xs text-white">
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3 text-[11px] text-white bg-slate-900/70 px-2 py-0.5 rounded font-mono">
                        {project.period}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                          <span className="line-clamp-1">{project.location}</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug mb-2 line-clamp-2">
                          {project.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                          {project.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">발주: {project.client}</span>
                        <span className="font-semibold text-emerald-800 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          <span>상세보기</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 1: Company Project Detail Modal */}
        {/* ========================================================================= */}
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
              <div className="relative aspect-[16/9] bg-slate-900">
                <img
                  src={activeProjectModal.featuredImage}
                  alt={activeProjectModal.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded">
                    {activeProjectModal.category}
                  </span>
                  <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-mono rounded">
                    {activeProjectModal.period}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 leading-snug">
                    {activeProjectModal.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                      {activeProjectModal.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-600" />
                      발주처: {activeProjectModal.client}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    프로젝트 개요
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {activeProjectModal.summary}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    주요 작업 범위 (Scope of Work)
                  </h4>
                  <ul className="space-y-2">
                    {(activeProjectModal.scope || []).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 mb-2">투입 장비 및 기술</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {(activeProjectModal.equipment || []).map((eq, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 mb-2">납품 성과품</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {(activeProjectModal.deliverables || []).map((del, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-md font-medium">
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setActiveProjectModal(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    닫기
                  </button>
                  <a
                    href="#contact"
                    onClick={() => setActiveProjectModal(null)}
                    className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors"
                  >
                    이와 유사한 현장 견적문의
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 2: Lightbox Zoom for Past Experience Drawings/Photos */}
        {/* ========================================================================= */}
        {lightboxImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs"
            onClick={() => setLightboxImage(null)}
          >
            <div
              className="bg-white rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] bg-slate-900 flex items-center justify-center overflow-hidden">
                <img
                  src={lightboxImage.url}
                  alt={lightboxImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 sm:p-5 bg-white flex items-center justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">{lightboxImage.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{lightboxImage.desc}</p>
                </div>
                <button
                  onClick={() => setLightboxImage(null)}
                  className="px-4 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 3: Real Site Photo / Drawing Uploader */}
        {/* ========================================================================= */}
        <PhotoUploaderModal
          isOpen={isUploadModalOpen}
          onClose={() => {
            setIsUploadModalOpen(false);
            setUploadTargetCategoryId(null);
          }}
          categories={pastCategories}
          onPhotosUpdated={(updated) => {
            if (onUpdatePastCategories) {
              onUpdatePastCategories(updated);
            }
          }}
          targetCategoryId={uploadTargetCategoryId}
          isAdminAuthenticated={isAdminAuthenticated}
          onAdminLogin={onAdminLogin}
          onAdminLogout={onAdminLogout}
        />
      </div>
    </section>
  );
};
