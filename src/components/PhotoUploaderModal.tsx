import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Eye, 
  RotateCcw,
  Sparkles,
  Info,
  Edit3,
  RefreshCw,
  FolderOpen,
  Camera,
  Layers,
  Check,
  Lock,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { 
  matchFilenameToCategory, 
  savePhoto, 
  clearAllPhotos, 
  deletePhotosByUrl, 
  deletePhotosByCategoryId 
} from '../utils/photoStorage';
import { PastProjectCategory } from '../types';

interface PhotoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: PastProjectCategory[];
  onPhotosUpdated: (updatedCategories: PastProjectCategory[]) => void;
  targetCategoryId?: string | null;
  isAdminAuthenticated: boolean;
  onAdminLogin: () => void;
  onAdminLogout?: () => void;
}

// 13 Target Reference Items corresponding to User's Project PDF & File list
const EXPECTED_PHOTOS = [
  { key: 'samsung4', name: '재개발.대전 삼성4구역 재개발 정비사업', catId: 'redevelopment', catName: '재개발 · 재건축 및 택지개발' },
  { key: 'namyang', name: '택지개발사업.화성남양뉴타운 도시개발사업(1공구및 2공구)2', catId: 'redevelopment', catName: '재개발 · 재건축 및 택지개발' },
  { key: 'woongjoong', name: '아파트시공.판교 운중동 타운하우스 신축공사', catId: 'apartments', catName: '아파트 신축공사' },
  { key: 'oxu', name: '아파트시공.래미안옥수리버젠 아파트 신축공사', catId: 'apartments', catName: '아파트 신축공사' },
  { key: 'military_hosp', name: '군시설.국군수도병원 및 사령부내', catId: 'defense', catName: '군시설 및 국방시설' },
  { key: 'military_gen', name: '군시설', catId: 'defense', catName: '군시설 및 국방시설' },
  { key: 'ilwon', name: '지적확정측량.일원대우아파트 주택재건축정비사업', catId: 'cadastral', catName: '지적확정측량' },
  { key: 'suwon', name: '지적확정측량.수원111-5구역 재건축정비사업', catId: 'cadastral', catName: '지적확정측량' },
  { key: 'lotte', name: '대형시설물.잠실 제2롯데월드 신축공사', catId: 'special-landmarks', catName: '특수권리 및 대형시설물' },
  { key: 'garak', name: '특수권리.가락시장역 8호선 구분지상권', catId: 'special-landmarks', catName: '특수권리 및 대형시설물' },
  { key: 'uos', name: '기타.서울시립대학교 중앙로 재조성공사', catId: 'institutional', catName: '기타 참여사업' },
  { key: 'severance', name: '기타.강남세브란스병원 및 도곡중학교 부지주변', catId: 'institutional', catName: '기타 참여사업' },
  { key: 'court', name: '법원감정측량', catId: 'court', catName: '법원감정측량' }
];

export const PhotoUploaderModal: React.FC<PhotoUploaderModalProps> = ({
  isOpen,
  onClose,
  categories,
  onPhotosUpdated,
  targetCategoryId,
  isAdminAuthenticated,
  onAdminLogin,
  onAdminLogout
}) => {
  // Auth State for Password Gate
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Active Tab in modal: 'upload' (일괄/개별 등록) | 'manage' (등록된 사진 편집/삭제)
  const [activeTab, setActiveTab] = useState<'upload' | 'manage'>('upload');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);
  
  // Single photo replacement tracking
  const [replaceTarget, setReplaceTarget] = useState<{ catId: string; oldUrl?: string } | null>(null);
  
  // Input references
  const bulkFileInputRef = useRef<HTMLInputElement>(null);
  const singleFileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle Admin Password Verification
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '1111') {
      onAdminLogin();
      setPasswordError(false);
      setPasswordInput('');
    } else {
      setPasswordError(true);
    }
  };

  // 1. PASSWORD GATE IF NOT LOGGED IN AS ADMIN
  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto border border-emerald-100 shadow-xs">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900">
              관리자 전용 인증
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              실제 현장 사진 및 도면 등록 · 교체 · 삭제는 <br />
              <strong className="text-slate-800">소울측량 관리자</strong>만 수행할 수 있습니다.
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="space-y-3">
            <input
              type="password"
              autoFocus
              required
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="관리자 비밀번호 (1111)"
              className="w-full px-4 py-3 text-center tracking-widest text-lg font-mono bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />

            {passwordError && (
              <div className="text-xs text-rose-600 flex items-center justify-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>비밀번호가 올바르지 않습니다. (1111)</span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                닫기
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                인증 후 관리 시작
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Helper: Read file as Data URL
  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  // 1. Bulk files upload & automatic matching
  const handleBulkFilesSelected = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setIsProcessing(true);
    setNotification(null);

    const files = Array.from(fileList);
    let successCount = 0;
    const updatedCategories = JSON.parse(JSON.stringify(categories)) as PastProjectCategory[];

    for (const file of files) {
      try {
        const dataUrl = await readFileAsDataUrl(file);
        const match = matchFilenameToCategory(file.name);
        const catId = targetCategoryId || match.categoryId;

        // Save to IndexedDB
        const photoId = `photo_${catId}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        await savePhoto({
          id: photoId,
          categoryId: catId,
          title: match.cleanTitle,
          dataUrl,
          filename: file.name,
          uploadedAt: Date.now()
        });

        // Update category state
        const targetCat = updatedCategories.find(c => c.id === catId);
        if (targetCat) {
          // Set as representative image
          targetCat.representativeImage = {
            title: match.cleanTitle,
            url: dataUrl,
            alt: match.cleanTitle
          };

          // Also add to gallery images if not already there
          if (!targetCat.images) targetCat.images = [];
          const existingIdx = targetCat.images.findIndex(img => img.title === match.cleanTitle);
          const newImgEntry = {
            title: match.cleanTitle,
            url: dataUrl,
            description: `${targetCat.categoryName} 현장 실측 사진 / 도면`,
            tag: match.tag
          };

          if (existingIdx >= 0) {
            targetCat.images[existingIdx] = newImgEntry;
          } else {
            targetCat.images.unshift(newImgEntry);
          }
          successCount++;
        }
      } catch (err) {
        console.error('Failed processing file:', file.name, err);
      }
    }

    try {
      localStorage.setItem('soul_survey_past_categories', JSON.stringify(updatedCategories));
    } catch {}

    onPhotosUpdated(updatedCategories);
    setIsProcessing(false);
    setNotification({
      type: 'success',
      message: `${successCount}개의 현장 사진이 정상 등록되었습니다.`
    });

    if (bulkFileInputRef.current) {
      bulkFileInputRef.current.value = '';
    }
  };

  // 2. Single photo replacement or addition for specific category
  const handleTriggerReplace = (catId: string, oldUrl?: string) => {
    setReplaceTarget({ catId, oldUrl });
    singleFileInputRef.current?.click();
  };

  const handleSingleFileSelected = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0 || !replaceTarget) return;
    const file = fileList[0];
    setIsProcessing(true);

    try {
      const dataUrl = await readFileAsDataUrl(file);
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '');
      const catId = replaceTarget.catId;

      // Delete old photo from IndexedDB if replacing
      if (replaceTarget.oldUrl) {
        await deletePhotosByUrl(replaceTarget.oldUrl);
      }

      // Save new photo
      await savePhoto({
        id: `photo_${catId}_${Date.now()}`,
        categoryId: catId,
        title: cleanTitle,
        dataUrl,
        filename: file.name,
        uploadedAt: Date.now()
      });

      const updatedCategories = categories.map(cat => {
        if (cat.id === catId) {
          const oldImages = cat.images || [];
          let newImages: typeof oldImages;

          if (replaceTarget.oldUrl && oldImages.some(img => img.url === replaceTarget.oldUrl)) {
            newImages = oldImages.map(img => 
              img.url === replaceTarget.oldUrl 
                ? {
                    title: cleanTitle,
                    url: dataUrl,
                    description: `${cat.categoryName} 현장 실측 사진 / 도면`,
                    tag: cat.categoryName
                  }
                : img
            );
          } else {
            newImages = [
              {
                title: cleanTitle,
                url: dataUrl,
                description: `${cat.categoryName} 현장 실측 사진 / 도면`,
                tag: cat.categoryName
              },
              ...oldImages
            ];
          }

          return {
            ...cat,
            representativeImage: {
              title: cleanTitle,
              url: dataUrl,
              alt: cleanTitle
            },
            images: newImages
          };
        }
        return cat;
      });

      try {
        localStorage.setItem('soul_survey_past_categories', JSON.stringify(updatedCategories));
      } catch {}

      onPhotosUpdated(updatedCategories);
      setNotification({
        type: 'success',
        message: `'${cleanTitle}' 사진으로 등록/교체되었습니다.`
      });
    } catch (err) {
      console.error('Failed to update photo:', err);
      setNotification({
        type: 'error',
        message: '사진 등록 중 오류가 발생했습니다.'
      });
    } finally {
      setIsProcessing(false);
      setReplaceTarget(null);
      if (singleFileInputRef.current) singleFileInputRef.current.value = '';
    }
  };

  // 3. Delete single photo from category and IndexedDB
  const handleDeleteSinglePhoto = async (catId: string, photoUrl: string, photoTitle: string) => {
    if (!confirm(`'${photoTitle}' 사진을 삭제하시겠습니까?\n삭제 후 기본 도면 배지로 복구됩니다.`)) return;

    try {
      await deletePhotosByUrl(photoUrl);

      const updatedCategories = categories.map(cat => {
        if (cat.id === catId) {
          const remainingImages = (cat.images || []).filter(img => img.url !== photoUrl);
          const isDeletingRep = cat.representativeImage?.url === photoUrl;

          let nextRep = cat.representativeImage;
          if (isDeletingRep) {
            if (remainingImages.length > 0) {
              nextRep = {
                title: remainingImages[0].title,
                url: remainingImages[0].url,
                alt: remainingImages[0].title
              };
            } else {
              nextRep = {
                title: cat.representativeTitle,
                url: '', // resets to clean SVG blueprint badge
                alt: cat.categoryName
              };
            }
          }

          return {
            ...cat,
            representativeImage: nextRep,
            images: remainingImages
          };
        }
        return cat;
      });

      try {
        localStorage.setItem('soul_survey_past_categories', JSON.stringify(updatedCategories));
      } catch {}

      onPhotosUpdated(updatedCategories);
      setNotification({
        type: 'success',
        message: `'${photoTitle}' 사진이 삭제되었습니다.`
      });
    } catch (err) {
      console.error('Failed to delete photo:', err);
      setNotification({
        type: 'error',
        message: '사진 삭제 중 오류가 발생했습니다.'
      });
    }
  };

  // 4. Delete all photos in a specific category
  const handleDeleteCategoryAllPhotos = async (catId: string, catName: string) => {
    if (!confirm(`'${catName}' 구분에 등록된 모든 사진을 삭제하시겠습니까?`)) return;

    try {
      await deletePhotosByCategoryId(catId);

      const updatedCategories = categories.map(cat => {
        if (cat.id === catId) {
          return {
            ...cat,
            representativeImage: {
              title: cat.representativeTitle,
              url: '',
              alt: cat.categoryName
            },
            images: []
          };
        }
        return cat;
      });

      try {
        localStorage.setItem('soul_survey_past_categories', JSON.stringify(updatedCategories));
      } catch {}

      onPhotosUpdated(updatedCategories);
      setNotification({
        type: 'success',
        message: `'${catName}' 분야의 모든 사진이 삭제되었습니다.`
      });
    } catch (err) {
      console.error('Failed to clear category photos:', err);
    }
  };

  // 5. Reset all photos across all categories
  const handleResetAllPhotos = async () => {
    if (!confirm('등록된 모든 현장 사진을 초기화하시겠습니까?')) return;
    await clearAllPhotos();

    const resetCats = categories.map(cat => ({
      ...cat,
      representativeImage: {
        title: cat.representativeTitle,
        url: '',
        alt: cat.categoryName
      },
      images: []
    }));

    try {
      localStorage.setItem('soul_survey_past_categories', JSON.stringify(resetCats));
    } catch {}

    onPhotosUpdated(resetCats);
    setNotification({
      type: 'success',
      message: '모든 등록 사진이 초기화되었습니다.'
    });
  };

  // Count total registered photos across all categories
  const totalRegisteredCount = categories.reduce((acc, cat) => {
    const urls = new Set<string>();
    if (cat.representativeImage?.url && !cat.representativeImage.url.includes('/images/projects/')) {
      urls.add(cat.representativeImage.url);
    }
    (cat.images || []).forEach(img => {
      if (img.url && !img.url.includes('/images/projects/')) {
        urls.add(img.url);
      }
    });
    return acc + urls.size;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base sm:text-lg text-slate-900">
                  실제 현장 사진 / 도면 등록 및 편집
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  등록됨: {totalRegisteredCount}장
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                현장 사진을 새로 등록하거나, 이미 등록된 사진을 자유롭게 편집·교체·삭제할 수 있습니다.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>관리자 인증됨</span>
            </span>
            {onAdminLogout && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('관리자 모드에서 로그아웃하시겠습니까?')) {
                    onAdminLogout();
                    onClose();
                  }
                }}
                className="px-2 py-1 text-xs text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 font-medium"
                title="관리자 로그아웃"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              title="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Nav Tabs: [1. 사진 일괄 등록] vs [2. 등록된 사진 편집 / 삭제] */}
        <div className="px-4 sm:px-6 pt-2 border-b border-slate-200 bg-white flex items-center gap-2">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'upload'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>사진 일괄 등록 (드래그 & 드롭)</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'manage'
                ? 'border-emerald-700 text-emerald-900'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Trash2 className="w-4 h-4 text-emerald-700" />
            <span>등록된 사진 편집 및 삭제 관리 ({totalRegisteredCount})</span>
          </button>
        </div>

        {/* Hidden file input for single photo replace/add */}
        <input
          ref={singleFileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleSingleFileSelected(e.target.files)}
          disabled={isProcessing}
        />

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs sm:text-sm">
          
          {/* Notification Toast */}
          {notification && (
            <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 text-xs font-semibold ${
              notification.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              <div className="flex items-center gap-2">
                {notification.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-700 flex-shrink-0" />
                )}
                <span>{notification.message}</span>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 1: BULK UPLOAD */}
          {/* ========================================================================= */}
          {activeTab === 'upload' && (
            <div className="space-y-5">
              {/* Guidance Box */}
              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5 leading-relaxed">
                <Info className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold mb-0.5">자동 매칭 안내</div>
                  보유하신 13장의 현장 사진 파일(<span className="font-mono text-blue-800">재개발...</span>, <span className="font-mono text-blue-800">아파트시공...</span>, <span className="font-mono text-blue-800">군시설...</span>, <span className="font-mono text-blue-800">지적확정...</span> 등)을 아래 박스에 한 번에 끌어다 놓거나 선택하시면, <strong>파일명에 맞게 해당 측량 분야로 자동 매칭</strong>되어 등록됩니다.
                </div>
              </div>

              {/* Drag & Drop Upload Zone */}
              <div
                onClick={() => bulkFileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleBulkFilesSelected(e.dataTransfer.files);
                }}
                className="border-2 border-dashed border-emerald-300 hover:border-emerald-600 bg-emerald-50/40 hover:bg-emerald-50/70 transition-all rounded-2xl p-6 sm:p-8 text-center cursor-pointer flex flex-col items-center justify-center gap-3 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors flex items-center justify-center shadow-xs">
                  <Upload className="w-7 h-7" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm sm:text-base">
                    {isProcessing ? '사진 처리 및 저장 중...' : '클릭하여 사진 파일 선택 (다중 파일 가능)'}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    또는 보유하신 사진 파일들을 이곳으로 직접 드래그하세요 (PNG, JPG, WEBP)
                  </div>
                </div>
                <input
                  ref={bulkFileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleBulkFilesSelected(e.target.files)}
                  disabled={isProcessing}
                />
              </div>

              {/* Checklist with Direct Action Buttons */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-bold text-slate-800 text-xs">
                    주요 13대 사업 사진 매칭 현황 및 개별 관리
                  </span>
                  {totalRegisteredCount > 0 && (
                    <button
                      onClick={handleResetAllPhotos}
                      className="text-[11px] text-rose-600 hover:text-rose-800 hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>전체 사진 초기화</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {EXPECTED_PHOTOS.map((item, idx) => {
                    const cat = categories.find(c => c.id === item.catId);
                    const hasRegisteredPhoto = Boolean(
                      cat?.representativeImage?.url && 
                      (cat.representativeImage.url.startsWith('data:') || cat.representativeImage.url.startsWith('blob:'))
                    );

                    return (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 transition-colors ${
                          hasRegisteredPhoto
                            ? 'bg-emerald-50/60 border-emerald-200'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            {hasRegisteredPhoto ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                            ) : (
                              <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex-shrink-0" />
                            )}
                            <span className="font-semibold text-slate-900 truncate">
                              {item.name}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 pl-5">
                            {item.catName}
                          </div>
                        </div>

                        {/* Actions for this item */}
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {hasRegisteredPhoto && cat?.representativeImage?.url ? (
                            <>
                              <button
                                onClick={() => setPreviewImage({
                                  url: cat.representativeImage.url,
                                  title: item.name
                                })}
                                className="p-1.5 bg-white border border-slate-200 text-slate-700 hover:text-emerald-800 hover:border-emerald-300 rounded text-[10px] font-bold"
                                title="사진 크게보기"
                              >
                                <Eye className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleTriggerReplace(cat.id, cat.representativeImage.url)}
                                className="px-2 py-1 bg-white border border-slate-200 text-slate-700 hover:text-emerald-800 hover:border-emerald-300 rounded text-[10px] font-medium"
                                title="다른 사진으로 교체"
                              >
                                교체
                              </button>
                              <button
                                onClick={() => handleDeleteSinglePhoto(cat.id, cat.representativeImage.url, item.name)}
                                className="p-1.5 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 rounded text-[10px] font-medium"
                                title="이 사진 삭제"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleTriggerReplace(item.catId)}
                              className="px-2 py-1 bg-emerald-800 hover:bg-emerald-900 text-white rounded text-[10px] font-bold"
                            >
                              + 등록
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: MANAGE & DELETE REGISTERED PHOTOS (카테고리별 사진 편집 / 개별 삭제) */}
          {/* ========================================================================= */}
          {activeTab === 'manage' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                    등록된 사진 상세 관리 및 개별 삭제
                  </div>
                  <div className="text-[11px] text-slate-500">
                    원치 않는 사진을 삭제하거나 다른 사진으로 즉시 교체할 수 있습니다.
                  </div>
                </div>
                {totalRegisteredCount > 0 && (
                  <button
                    onClick={handleResetAllPhotos}
                    className="px-2.5 py-1 text-xs text-rose-600 border border-rose-200 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1 font-semibold"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>전체 사진 일괄 삭제</span>
                  </button>
                )}
              </div>

              {totalRegisteredCount === 0 ? (
                <div className="p-10 rounded-2xl border border-dashed border-slate-300 text-center space-y-3 bg-slate-50/60">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">현재 등록된 사진이 없습니다.</div>
                    <p className="text-xs text-slate-500 mt-1">
                      '사진 일괄 등록' 탭에서 보유하신 현장 사진 파일을 추가해보세요.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs"
                  >
                    사진 등록하러 가기
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {categories.map((cat) => {
                    const repUrl = cat.representativeImage?.url;
                    const hasRep = repUrl && (repUrl.startsWith('data:') || repUrl.startsWith('blob:'));
                    const galleryImages = (cat.images || []).filter(img => 
                      img.url && (img.url.startsWith('data:') || img.url.startsWith('blob:'))
                    );
                    const hasAnyPhotos = hasRep || galleryImages.length > 0;

                    if (!hasAnyPhotos) {
                      return (
                        <div 
                          key={cat.id} 
                          className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between"
                        >
                          <div>
                            <span className="font-bold text-slate-800 text-xs">{cat.categoryName}</span>
                            <span className="text-[11px] text-slate-400 ml-2">(사진 미등록 상태)</span>
                          </div>
                          <button
                            onClick={() => handleTriggerReplace(cat.id)}
                            className="px-2.5 py-1 text-xs bg-white border border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-800 rounded-lg transition-colors font-medium"
                          >
                            + 사진 등록
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div 
                        key={cat.id}
                        className="rounded-2xl border border-emerald-200 bg-white p-4 shadow-2xs space-y-3"
                      >
                        {/* Category Header */}
                        <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">
                              {cat.categoryName}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {(hasRep ? 1 : 0) + galleryImages.filter(g => g.url !== repUrl).length}개 등록됨
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleTriggerReplace(cat.id)}
                              className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors flex items-center gap-1 font-medium"
                            >
                              <Upload className="w-3 h-3" />
                              <span>사진 추가</span>
                            </button>
                            <button
                              onClick={() => handleDeleteCategoryAllPhotos(cat.id, cat.categoryName)}
                              className="px-2.5 py-1 text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors flex items-center gap-1 font-medium"
                              title="이 분류의 모든 사진 삭제"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>분야 전체 삭제</span>
                            </button>
                          </div>
                        </div>

                        {/* Photos List Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Representative Photo Card */}
                          {hasRep && repUrl && (
                            <div className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50/40 flex items-center gap-3 relative group">
                              <div 
                                onClick={() => setPreviewImage({
                                  url: repUrl,
                                  title: cat.representativeImage?.title || cat.categoryName
                                })}
                                className="w-16 h-14 rounded-lg bg-slate-900 overflow-hidden relative cursor-pointer flex-shrink-0 border border-slate-200"
                              >
                                <img
                                  src={repUrl}
                                  alt={cat.representativeImage?.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                                <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Eye className="w-3.5 h-3.5" />
                                </div>
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1 mb-0.5">
                                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-800 text-white">
                                    대표
                                  </span>
                                  <span className="font-bold text-xs text-slate-900 truncate">
                                    {cat.representativeImage?.title || cat.representativeTitle}
                                  </span>
                                </div>
                                <div className="text-[10px] text-slate-500">
                                  메인 썸네일로 표출 중
                                </div>
                              </div>

                              {/* Action Buttons: Replace & Delete */}
                              <div className="flex items-center gap-1 flex-shrink-0">
                                <button
                                  onClick={() => handleTriggerReplace(cat.id, repUrl)}
                                  className="px-2 py-1 text-[11px] bg-white border border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-800 rounded font-medium transition-colors"
                                  title="다른 사진으로 교체"
                                >
                                  교체
                                </button>
                                <button
                                  onClick={() => handleDeleteSinglePhoto(cat.id, repUrl, cat.representativeImage?.title || '대표 사진')}
                                  className="p-1.5 text-rose-600 hover:bg-rose-100/80 rounded border border-rose-200 transition-colors"
                                  title="이 사진 삭제"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )}

                          {/* Extra Gallery Photos */}
                          {galleryImages
                            .filter(img => img.url !== repUrl)
                            .map((img, gIdx) => (
                              <div key={gIdx} className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center gap-3 relative group">
                                <div 
                                  onClick={() => setPreviewImage({
                                    url: img.url,
                                    title: img.title
                                  })}
                                  className="w-16 h-14 rounded-lg bg-slate-900 overflow-hidden relative cursor-pointer flex-shrink-0 border border-slate-200"
                                >
                                  <img
                                    src={img.url}
                                    alt={img.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                  />
                                  <div className="absolute inset-0 bg-slate-900/0 hover:bg-slate-900/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Eye className="w-3.5 h-3.5" />
                                  </div>
                                </div>

                                <div className="min-w-0 flex-1">
                                  <div className="font-bold text-xs text-slate-900 truncate mb-0.5">
                                    {img.title}
                                  </div>
                                  <div className="text-[10px] text-slate-500 line-clamp-1">
                                    {img.description || '갤러리 등록 사진'}
                                  </div>
                                </div>

                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <button
                                    onClick={() => handleTriggerReplace(cat.id, img.url)}
                                    className="px-2 py-1 text-[11px] bg-slate-50 border border-slate-300 hover:border-emerald-600 text-slate-700 hover:text-emerald-800 rounded font-medium transition-colors"
                                    title="사진 교체"
                                  >
                                    교체
                                  </button>
                                  <button
                                    onClick={() => handleDeleteSinglePhoto(cat.id, img.url, img.title)}
                                    className="p-1.5 text-rose-600 hover:bg-rose-100/80 rounded border border-rose-200 transition-colors"
                                    title="이 사진 삭제"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            * 삭제된 사진은 즉시 화면에서 제거되며 언제든 다시 등록할 수 있습니다.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            닫기
          </button>
        </div>

      </div>

      {/* Mini Image Preview Lightbox */}
      {previewImage && (
        <div 
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm truncate">{previewImage.title}</span>
              <button 
                onClick={() => setPreviewImage(null)}
                className="p-1 text-slate-400 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[65vh] overflow-hidden rounded-xl bg-slate-100 flex items-center justify-center">
              <img 
                src={previewImage.url} 
                alt={previewImage.title} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
