import React, { useState, useRef } from 'react';
import { CompanyProject, PastProjectCategory, InquiryRecord, BackupData } from '../types';
import { 
  X, 
  Lock, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  RotateCcw, 
  Building2, 
  Briefcase, 
  Inbox, 
  AlertCircle,
  Upload,
  Image as ImageIcon,
  Camera,
  Download,
  FileText,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { savePhoto, getAllPhotos, bulkImportPhotos } from '../utils/photoStorage';
import { getAdminPassword } from '../config/adminConfig';
import { compressAndResizeImage } from '../utils/imageCompressor';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyProjects: CompanyProject[];
  onUpdateCompanyProjects: (projects: CompanyProject[]) => void;
  pastCategories: PastProjectCategory[];
  onUpdatePastCategories: (categories: PastProjectCategory[]) => void;
  inquiries: InquiryRecord[];
  onUpdateInquiries: (inquiries: InquiryRecord[]) => void;
  onResetToDefaults: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  companyProjects,
  onUpdateCompanyProjects,
  pastCategories,
  onUpdatePastCategories,
  inquiries,
  onUpdateInquiries,
  onResetToDefaults
}) => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Active Admin Tab: 'company' | 'past' | 'inquiries' | 'backup'
  const [adminTab, setAdminTab] = useState<'company' | 'past' | 'inquiries' | 'backup'>('company');

  // Backup & Restore State
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [backupStatusMessage, setBackupStatusMessage] = useState<string | null>(null);
  const [backupErrorMessage, setBackupErrorMessage] = useState<string | null>(null);
  const backupFileInputRef = useRef<HTMLInputElement>(null);

  // Form state for creating/editing company project
  const [editingProject, setEditingProject] = useState<CompanyProject | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // New project form values (completely clean slate)
  const [projectForm, setProjectForm] = useState<Partial<CompanyProject>>({
    title: '',
    category: '지형현황측량',
    client: '',
    location: '',
    period: '2025.01',
    summary: '',
    scope: [''],
    equipment: ['GNSS 수신기', '토털스테이션'],
    deliverables: ['1/500 수치지형도(dwg)', '성과품 보고서'],
    featuredImage: ''
  });

  // Category past project additions
  const [selectedPastCatId, setSelectedPastCatId] = useState(pastCategories[0]?.id || 'redevelopment');
  const [newPastProjectName, setNewPastProjectName] = useState('');
  const [newPastProjectClient, setNewPastProjectClient] = useState('');
  const [newPastProjectNote, setNewPastProjectNote] = useState('');

  if (!isOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === getAdminPassword()) {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  // -------------------------------------------------------------
  // Data Backup (Export all data and photos to single JSON file)
  // -------------------------------------------------------------
  const handleDownloadBackup = async () => {
    setIsBackingUp(true);
    setBackupStatusMessage(null);
    setBackupErrorMessage(null);
    try {
      const photos = await getAllPhotos();
      const backupData: BackupData = {
        appName: 'SOUL_SURVEY_BACKUP',
        version: '1.0',
        exportedAt: new Date().toISOString(),
        companyProjects,
        pastCategories,
        photos: photos || [],
        inquiries
      };

      const jsonString = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const a = document.createElement('a');
      a.href = url;
      a.download = `soulsurvey_backup_${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setBackupStatusMessage(
        `백업 파일(soulsurvey_backup_${dateStr}.json) 다운로드가 완료되었습니다. (회사 실적 ${companyProjects.length}건, 과거 경력 카테고리 ${pastCategories.length}개, 현장 사진 ${photos?.length || 0}장 포함)`
      );
    } catch (err: any) {
      console.error('Backup error:', err);
      setBackupErrorMessage(`백업 다운로드 중 오류가 발생했습니다: ${err.message || err}`);
    } finally {
      setIsBackingUp(false);
    }
  };

  // -------------------------------------------------------------
  // Data Restore (Import from JSON file and restore IndexedDB + state)
  // -------------------------------------------------------------
  const handleRestoreFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsRestoring(true);
    setBackupStatusMessage(null);
    setBackupErrorMessage(null);

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as BackupData;

      if (!parsed || (!parsed.pastCategories && !parsed.companyProjects && !parsed.photos)) {
        throw new Error('올바른 소울측량 백업 JSON 형식이 아닙니다. 백업된 파일인지 확인해주세요.');
      }

      // 1. Bulk import photos into IndexedDB
      if (Array.isArray(parsed.photos) && parsed.photos.length > 0) {
        await bulkImportPhotos(parsed.photos);
      }

      // 2. Restore past categories
      if (Array.isArray(parsed.pastCategories) && parsed.pastCategories.length > 0) {
        onUpdatePastCategories(parsed.pastCategories);
      }

      // 3. Restore company projects
      if (Array.isArray(parsed.companyProjects)) {
        onUpdateCompanyProjects(parsed.companyProjects);
      }

      // 4. Restore inquiries
      if (Array.isArray(parsed.inquiries)) {
        onUpdateInquiries(parsed.inquiries);
      }

      setBackupStatusMessage(
        `데이터가 성공적으로 복원되었습니다! (회사 실적 ${parsed.companyProjects?.length || 0}건, 과거 경력 ${parsed.pastCategories?.length || 0}개 분야, 사진 ${parsed.photos?.length || 0}장)`
      );
    } catch (err: any) {
      console.error('Restore error:', err);
      setBackupErrorMessage(`데이터 복원 실패: ${err.message || '파일을 읽을 수 없습니다.'}`);
    } finally {
      setIsRestoring(false);
      if (backupFileInputRef.current) {
        backupFileInputRef.current.value = '';
      }
    }
  };

  // Company project CRUD
  const handleSaveCompanyProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title) return;

    if (editingProject) {
      // Update existing
      const updated = companyProjects.map(p => 
        p.id === editingProject.id ? { ...p, ...(projectForm as CompanyProject) } : p
      );
      onUpdateCompanyProjects(updated);
      setEditingProject(null);
    } else {
      // Add new
      const newProj: CompanyProject = {
        id: 'proj-' + Date.now(),
        title: projectForm.title || '',
        category: (projectForm.category as any) || '지형현황측량',
        client: projectForm.client || '일반 고객',
        location: projectForm.location || '대한민국',
        period: projectForm.period || new Date().toISOString().slice(0, 7),
        summary: projectForm.summary || '',
        scope: projectForm.scope?.filter(s => s.trim().length > 0) || ['현장 기준점 및 지형측량'],
        equipment: projectForm.equipment || ['토털스테이션'],
        deliverables: projectForm.deliverables || ['CAD 도면'],
        featuredImage: projectForm.featuredImage || ''
      };
      onUpdateCompanyProjects([newProj, ...companyProjects]);
      setIsCreatingProject(false);
    }

    // Reset form
    setProjectForm({
      title: '',
      category: '지형현황측량',
      client: '',
      location: '',
      period: '2025.01',
      summary: '',
      scope: [''],
      equipment: ['GNSS 수신기'],
      deliverables: ['CAD 도면'],
      featuredImage: ''
    });
  };

  const handleDeleteCompanyProject = (id: string) => {
    if (window.confirm('이 프로젝트를 삭제하시겠습니까?')) {
      onUpdateCompanyProjects(companyProjects.filter(p => p.id !== id));
    }
  };

  const startEditProject = (project: CompanyProject) => {
    setEditingProject(project);
    setProjectForm(project);
    setIsCreatingProject(true);
  };

  // Image Upload handler with auto compression (max 1200px, JPEG 0.8)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        const compressed = await compressAndResizeImage(file, 1200, 1200, 0.8);
        setProjectForm(prev => ({ ...prev, featuredImage: compressed }));
      } catch (err) {
        console.error('Image compression failed:', err);
      }
    }
  };

  // Past project add
  const handleAddPastProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPastProjectName.trim()) return;

    const updatedCategories = pastCategories.map(cat => {
      if (cat.id === selectedPastCatId) {
        return {
          ...cat,
          totalCount: (cat.totalCount || cat.projects.length) + 1,
          projects: [
            { name: newPastProjectName.trim(), client: newPastProjectClient.trim() || undefined, note: newPastProjectNote.trim() || undefined },
            ...cat.projects
          ]
        };
      }
      return cat;
    });

    onUpdatePastCategories(updatedCategories);
    setNewPastProjectName('');
    setNewPastProjectClient('');
    setNewPastProjectNote('');
  };

  const handleDeletePastProject = (catId: string, projIndex: number) => {
    const updatedCategories = pastCategories.map(cat => {
      if (cat.id === catId) {
        const newProjList = cat.projects.filter((_, i) => i !== projIndex);
        return {
          ...cat,
          totalCount: Math.max(0, (cat.totalCount ?? cat.projects.length) - 1),
          projects: newProjList
        };
      }
      return cat;
    });
    onUpdatePastCategories(updatedCategories);
  };

  // Upload Photo for Category (compressed to max 1200px, JPEG 0.8)
  const handleCategoryPhotoUpload = async (catId: string, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    try {
      const dataUrl = await compressAndResizeImage(file, 1200, 1200, 0.8);
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '');
      await savePhoto({
        id: `photo_${catId}_${Date.now()}`,
        categoryId: catId,
        title: cleanTitle,
        dataUrl,
        filename: file.name,
        uploadedAt: Date.now()
      });
      const updated = pastCategories.map(c => {
        if (c.id === catId) {
          return {
            ...c,
            representativeImage: {
              title: cleanTitle,
              url: dataUrl,
              alt: c.categoryName
            },
            images: [
              {
                title: cleanTitle,
                url: dataUrl,
                description: `${c.categoryName} 현장 사진`,
                tag: c.categoryName
              },
              ...(c.images || []).filter(img => img.url !== dataUrl)
            ]
          };
        }
        return c;
      });
      onUpdatePastCategories(updated);
    } catch (err) {
      console.error('Failed to upload category photo:', err);
    }
  };

  // Inquiry Status Change
  const handleToggleInquiryStatus = (id: string) => {
    const updated = inquiries.map(inq => {
      if (inq.id === id) {
        const nextStatus: 'pending' | 'contacted' | 'completed' = 
          inq.status === 'pending' ? 'contacted' : inq.status === 'contacted' ? 'completed' : 'pending';
        return { ...inq, status: nextStatus };
      }
      return inq;
    });
    onUpdateInquiries(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    onUpdateInquiries(inquiries.filter(i => i.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-300 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-base">SOUL SURVEY 포트폴리오 관리자</span>
            <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
              v1.0
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. PASSWORD GATE IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-5">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6 text-emerald-800" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">관리자 인증</h3>
              <p className="text-xs text-slate-500 mt-1">
                포트폴리오 수정 및 상담 내역 조회를 위해 비밀번호를 입력해주세요.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <input
                type="password"
                required
                autoFocus
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="w-full px-4 py-3 text-center tracking-widest text-lg font-mono bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />

              {passwordError && (
                <div className="text-xs text-red-600 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>비밀번호가 올바르지 않습니다.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-emerald-800 text-white font-bold text-sm rounded-xl transition-colors"
              >
                관리자 로그인
              </button>
            </form>
          </div>
        ) : (
          /* 2. AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Admin Tabs */}
            <div className="px-6 pt-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setAdminTab('company'); setIsCreatingProject(false); }}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 ${
                    adminTab === 'company'
                      ? 'border-emerald-700 text-emerald-900 bg-white shadow-2xs'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>회사 수행실적 관리 ({companyProjects.length})</span>
                </button>

                <button
                  onClick={() => setAdminTab('past')}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 ${
                    adminTab === 'past'
                      ? 'border-emerald-700 text-emerald-900 bg-white shadow-2xs'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>대표자 경력 관리 (7개 분류)</span>
                </button>

                <button
                  onClick={() => setAdminTab('inquiries')}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 ${
                    adminTab === 'inquiries'
                      ? 'border-emerald-700 text-emerald-900 bg-white shadow-2xs'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>온라인 견적 문의 ({inquiries.length})</span>
                </button>

                <button
                  onClick={() => setAdminTab('backup')}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-lg transition-colors border-b-2 flex items-center gap-1.5 ${
                    adminTab === 'backup'
                      ? 'border-emerald-700 text-emerald-900 bg-white shadow-2xs'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>실적/사진 백업 및 복원</span>
                </button>
              </div>

              <button
                onClick={() => {
                  if (window.confirm('기본 초기 데이터로 되돌리시겠습니까? 모든 수동 추가 데이터가 초기화됩니다.')) {
                    onResetToDefaults();
                  }
                }}
                className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 py-1 px-2 rounded hover:bg-slate-200 transition-colors"
                title="초기 샘플 데이터 복원"
              >
                <RotateCcw className="w-3 h-3" />
                <span>초기 데이터 복원</span>
              </button>
            </div>

            {/* TAB CONTENT BODY */}
            <div className="flex-1 overflow-y-auto p-6 bg-white">
              {/* ============================================================== */}
              {/* TAB 1: 회사 수행실적 관리 */}
              {/* ============================================================== */}
              {adminTab === 'company' && (
                <div>
                  {!isCreatingProject ? (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">등록된 회사 수행실적 목록</h4>
                          <p className="text-xs text-slate-500">웹사이트의 '회사 수행실적' 카드에 실시간 표시됩니다.</p>
                        </div>
                        <button
                          onClick={() => {
                            setEditingProject(null);
                            setProjectForm({
                              title: '',
                              category: '지형현황측량',
                              client: '',
                              location: '',
                              period: '2025.01',
                              summary: '',
                              scope: [''],
                              equipment: ['GNSS 수신기', '토털스테이션'],
                              deliverables: ['1/500 수치지형도(dwg)'],
                              featuredImage: ''
                            });
                            setIsCreatingProject(true);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>신규 실적 등록</span>
                        </button>
                      </div>

                      {companyProjects.length === 0 ? (
                        <div className="text-center py-12 px-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                          <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                          <p className="text-sm font-bold text-slate-700">현재 등록된 회사 수행실적이 없습니다.</p>
                          <p className="text-xs text-slate-400 mt-1 mb-4">우측 상단의 '+ 신규 실적 등록' 버튼을 눌러 첫 실적을 등록해보세요.</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {companyProjects.map((p) => (
                            <div
                              key={p.id}
                              className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-all bg-slate-50/50"
                            >
                              <div className="flex items-center gap-3">
                                {p.featuredImage ? (
                                  <img
                                    src={p.featuredImage}
                                    alt={p.title}
                                    referrerPolicy="no-referrer"
                                    className="w-16 h-12 rounded object-cover flex-shrink-0 bg-slate-200"
                                  />
                                ) : (
                                  <div className="w-16 h-12 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
                                    <ImageIcon className="w-5 h-5 text-slate-400" />
                                  </div>
                                )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                                    {p.category}
                                  </span>
                                  <span className="text-xs text-slate-500 font-mono">{p.period}</span>
                                </div>
                                <div className="font-bold text-slate-900 text-sm mt-0.5 line-clamp-1">
                                  {p.title}
                                </div>
                                <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                  {p.location} · {p.client}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center">
                              <button
                                onClick={() => startEditProject(p)}
                                className="p-1.5 text-slate-600 hover:text-emerald-800 hover:bg-slate-200 rounded transition-colors"
                                title="수정"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCompanyProject(p.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="삭제"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                    /* Project Create / Edit Form */
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                        <h4 className="font-bold text-slate-900 text-base">
                          {editingProject ? '실적 수정' : '신규 수행실적 등록'}
                        </h4>
                        <button
                          onClick={() => setIsCreatingProject(false)}
                          className="text-xs text-slate-500 hover:text-slate-900"
                        >
                          취소하고 목록으로
                        </button>
                      </div>

                      <form onSubmit={handleSaveCompanyProject} className="space-y-4 text-xs sm:text-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">
                              프로젝트명 <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={projectForm.title || ''}
                              onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                              placeholder="예: 화성시 복합물류센터 지형현황 및 기준점측량"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">
                              측량 분류 <span className="text-red-500">*</span>
                            </label>
                            <select
                              value={projectForm.category}
                              onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
                            >
                              <option value="지형현황측량">지형현황측량</option>
                              <option value="공사측량">공사측량</option>
                              <option value="설계측량">설계측량</option>
                              <option value="드론/GNSS">드론/GNSS</option>
                              <option value="하천측량">하천측량</option>
                              <option value="시설물유지관리">시설물유지관리</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">발주처 / 고객</label>
                            <input
                              type="text"
                              value={projectForm.client || ''}
                              onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                              placeholder="예: 건축사사무소 다온"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">현장 위치</label>
                            <input
                              type="text"
                              value={projectForm.location || ''}
                              onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                              placeholder="예: 경기도 화성시 장안면"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">수행 기간</label>
                            <input
                              type="text"
                              value={projectForm.period || ''}
                              onChange={(e) => setProjectForm({ ...projectForm, period: e.target.value })}
                              placeholder="예: 2025.01 ~ 2025.02"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">프로젝트 개요</label>
                          <textarea
                            rows={2}
                            value={projectForm.summary || ''}
                            onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                            placeholder="간략한 작업 내용 설명"
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                          />
                        </div>

                        {/* Image setting: URL or Local upload */}
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">
                            대표 현장 사진 (URL 입력 또는 파일 업로드)
                          </label>
                          <div className="flex flex-col sm:flex-row gap-3 items-center">
                            <input
                              type="text"
                              value={projectForm.featuredImage || ''}
                              onChange={(e) => setProjectForm({ ...projectForm, featuredImage: e.target.value })}
                              placeholder="https://..."
                              className="flex-1 w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-xs"
                            />
                            <label className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap">
                              <Upload className="w-3.5 h-3.5" />
                              <span>내 PC 사진 선택</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                          {projectForm.featuredImage && (
                            <div className="mt-2 flex items-center gap-2">
                              <img
                                src={projectForm.featuredImage}
                                alt="preview"
                                referrerPolicy="no-referrer"
                                className="w-20 h-14 object-cover rounded border border-slate-200"
                              />
                              <span className="text-[11px] text-slate-500">사진 미리보기</span>
                            </div>
                          )}
                        </div>

                        <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setIsCreatingProject(false)}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                          >
                            취소
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 bg-slate-900 hover:bg-emerald-800 text-white font-bold rounded-lg transition-colors"
                          >
                            저장하기
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================== */}
              {/* TAB 2: 대표자 경력 관리 */}
              {/* ============================================================== */}
              {adminTab === 'past' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      대표자 과거 참여 경력 항목 관리
                    </h4>
                    <p className="text-xs text-slate-500">
                      7대 사업분류별 대표사업 문구 수정 및 신규 세부 사업을 추가/삭제할 수 있습니다.
                    </p>
                  </div>

                  {/* Category Selector */}
                  <div className="flex flex-wrap gap-1.5">
                    {pastCategories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedPastCatId(c.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                          selectedPastCatId === c.id
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {c.categoryName} ({c.projects.length})
                      </button>
                    ))}
                  </div>

                  {/* Selected Category Management Box */}
                  {(() => {
                    const activeCat = pastCategories.find(c => c.id === selectedPastCatId);
                    if (!activeCat) return null;

                    return (
                      <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                          <div>
                            <div className="font-bold text-slate-900 text-sm">{activeCat.categoryName}</div>
                            <div className="text-xs text-emerald-800 font-semibold mt-0.5">
                              대표 표기: {activeCat.representativeTitle}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {activeCat.representativeImage?.url ? (
                              <div className="flex items-center gap-2">
                                <img
                                  src={activeCat.representativeImage.url}
                                  alt={activeCat.categoryName}
                                  className="w-10 h-8 object-cover rounded border border-slate-200"
                                />
                                <span className="text-xs text-emerald-700 font-medium">사진 등록됨</span>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400">사진 미등록</span>
                            )}
                            <label className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-2xs">
                              <Camera className="w-3.5 h-3.5" />
                              <span>사진 변경/등록</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleCategoryPhotoUpload(activeCat.id, e.target.files)}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>

                        {/* Add new project under this category */}
                        <form onSubmit={handleAddPastProject} className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-3">
                          <div className="text-xs font-bold text-slate-800">이 분야에 새 사업 추가</div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <input
                              type="text"
                              required
                              value={newPastProjectName}
                              onChange={(e) => setNewPastProjectName(e.target.value)}
                              placeholder="사업명 (예: 00구역 정비사업)"
                              className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded"
                            />
                            <input
                              type="text"
                              value={newPastProjectClient}
                              onChange={(e) => setNewPastProjectClient(e.target.value)}
                              placeholder="발주처 (예: 00조합, 00건설)"
                              className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded"
                            />
                            <input
                              type="text"
                              value={newPastProjectNote}
                              onChange={(e) => setNewPastProjectNote(e.target.value)}
                              placeholder="비고 (예: 지형현황 및 기준점)"
                              className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded transition-colors"
                          >
                            + 사업 목록에 추가
                          </button>
                        </form>

                        {/* List of projects under this category */}
                        <div className="max-h-60 overflow-y-auto divide-y divide-slate-200 bg-white rounded-lg border border-slate-200">
                          {activeCat.projects.map((proj, idx) => (
                            <div key={idx} className="p-2.5 text-xs flex items-center justify-between gap-2 hover:bg-slate-50">
                              <div className="min-w-0">
                                <span className="font-semibold text-slate-900">{proj.name}</span>
                                {proj.client && <span className="text-slate-500 ml-2">({proj.client})</span>}
                                {proj.note && <span className="text-emerald-700 ml-1.5 text-[11px]">[{proj.note}]</span>}
                              </div>
                              <button
                                onClick={() => handleDeletePastProject(activeCat.id, idx)}
                                className="p-1 text-slate-400 hover:text-red-600 rounded"
                                title="삭제"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* ============================================================== */}
              {/* TAB 3: 온라인 견적 문의 내역 */}
              {/* ============================================================== */}
              {adminTab === 'inquiries' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      접수된 온라인 측량 견적 및 상담 요청
                    </h4>
                    <p className="text-xs text-slate-500">
                      고객이 웹사이트 문의 폼을 통해 작성한 내역입니다. (클릭 시 상태 변경: 대기 &rarr; 연락완료 &rarr; 완료)
                    </p>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      아직 접수된 온라인 문의가 없습니다. 웹사이트 문의 폼에서 테스트 제출해 보세요.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-2.5 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                inq.status === 'completed'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : inq.status === 'contacted'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {inq.status === 'completed' ? '상담완료' : inq.status === 'contacted' ? '연락완료' : '접수대기'}
                              </span>
                              <span className="font-bold text-slate-900 text-sm">
                                {inq.name} ({inq.company})
                              </span>
                              <span className="text-slate-400 font-mono">{inq.createdAt}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleToggleInquiryStatus(inq.id)}
                                className="px-2 py-1 bg-white border border-slate-300 rounded text-[11px] font-semibold hover:bg-slate-100"
                              >
                                상태변경
                              </button>
                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="p-1 text-slate-400 hover:text-red-600 rounded"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600 pt-1">
                            <div><strong>연락처:</strong> <a href={`tel:${inq.phone}`} className="text-emerald-800 underline font-mono">{inq.phone}</a></div>
                            <div><strong>현장 위치:</strong> {inq.location}</div>
                            <div><strong>필요 작업:</strong> {inq.serviceType}</div>
                          </div>

                          {inq.message && (
                            <div className="bg-white p-2.5 rounded border border-slate-200 text-slate-700">
                              {inq.message}
                            </div>
                          )}

                          {inq.fileName && (
                            <div className="text-[11px] text-emerald-700">
                              📎 첨부파일: {inq.fileName} ({inq.fileSize})
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================== */}
              {/* TAB 4: 실적/사진 백업 및 복원 (JSON) */}
              {/* ============================================================== */}
              {adminTab === 'backup' && (
                <div className="space-y-6">
                  {/* Status Banner */}
                  {backupStatusMessage && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-emerald-900">작업 성공</p>
                        <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">{backupStatusMessage}</p>
                      </div>
                    </div>
                  )}

                  {backupErrorMessage && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-red-900">오류 발생</p>
                        <p className="text-xs text-red-700 mt-0.5 leading-relaxed">{backupErrorMessage}</p>
                      </div>
                    </div>
                  )}

                  {/* Hidden File Input for JSON Restore */}
                  <input
                    type="file"
                    ref={backupFileInputRef}
                    onChange={handleRestoreFileSelected}
                    accept=".json,application/json"
                    className="hidden"
                  />

                  {/* Section 1: Backup (Download JSON) */}
                  <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/70">
                    <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
                          <Download className="w-3.5 h-3.5" />
                          <span>데이터 내보내기</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900">
                          실적 데이터 백업 (JSON 다운로드)
                        </h4>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed max-w-xl">
                          회사 수행실적, 대표자 과거 참여경력, 업로드한 모든 현장 사진(Base64 인코딩)과 온라인 견적 상담 내역을 <strong>단 하나의 JSON 백업 파일</strong>로 안전하게 저장합니다.
                        </p>
                      </div>

                      <button
                        onClick={handleDownloadBackup}
                        disabled={isBackingUp}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 disabled:bg-slate-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors flex-shrink-0 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>{isBackingUp ? '백업 생성 중...' : '실적 데이터 백업(다운로드)'}</span>
                      </button>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                        <span className="text-[11px] text-slate-500 block">회사 신규 실적</span>
                        <strong className="text-base text-slate-900 font-mono">{companyProjects.length}건</strong>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                        <span className="text-[11px] text-slate-500 block">대표자 경력 분야</span>
                        <strong className="text-base text-slate-900 font-mono">{pastCategories.length}개</strong>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                        <span className="text-[11px] text-slate-500 block">온라인 견적 문의</span>
                        <strong className="text-base text-slate-900 font-mono">{inquiries.length}건</strong>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                        <span className="text-[11px] text-slate-500 block">사진 포함 여부</span>
                        <strong className="text-base text-emerald-800 font-bold">100% 동봉</strong>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1.5">
                      <span className="text-emerald-700 font-bold">안내:</span>
                      웹사이트를 새로 배포하거나 다른 컴퓨터에서 열더라도, 이 백업 파일 하나만 있으면 언제든지 사진과 실적이 원래대로 복구됩니다.
                    </p>
                  </div>

                  {/* Section 2: Restore (Upload JSON) */}
                  <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                    <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-bold mb-2">
                          <Upload className="w-3.5 h-3.5" />
                          <span>데이터 불러오기</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900">
                          실적 데이터 불러오기 (파일 업로드)
                        </h4>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed max-w-xl">
                          이전에 다운로드해둔 <strong>JSON 백업 파일</strong>을 선택하면, 등록했던 실적과 사진들을 원래대로 즉시 복원합니다.
                        </p>
                      </div>

                      <button
                        onClick={() => backupFileInputRef.current?.click()}
                        disabled={isRestoring}
                        className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors flex-shrink-0 cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{isRestoring ? '데이터 복원 중...' : '실적 데이터 불러오기(파일 업로드)'}</span>
                      </button>
                    </div>

                    <div className="mt-4 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900">
                      <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">주의:</span> 데이터를 불러오면 백업 파일 내의 실적과 사진으로 기존 화면 데이터가 갱신됩니다. 가장 최근에 백업한 최신 JSON 파일을 선택해주세요.
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Automatic Image Compression Info */}
                  <div className="p-5 rounded-xl border border-slate-200 bg-emerald-50/40">
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm mb-1.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      <span>사진 용량 자동 최적화 시스템 적용</span>
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      스마트폰이나 고해상도 카메라로 촬영한 대용량 원본 사진(10~20MB)도 업로드 시 브라우저 내에서 <strong>최대 가로/세로 1200px 이하, JPEG 품질 0.8</strong>로 자동 리사이징 및 압축되어 저장됩니다. 웹사이트 로딩 속도가 빠르며 백업 파일의 용량도 수 MB 수준으로 매우 가볍게 유지됩니다.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
