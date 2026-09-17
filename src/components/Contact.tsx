import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  UploadCloud, 
  FileCheck, 
  X,
  PhoneCall
} from 'lucide-react';
import { InquiryRecord } from '../types';

interface ContactProps {
  onInquirySubmitted: (record: InquiryRecord) => void;
}

export const Contact: React.FC<ContactProps> = ({ onInquirySubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    location: '',
    serviceType: '지형현황측량',
    expectedDate: '',
    message: '',
  });

  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const serviceOptions = [
    '지형현황측량 (설계 및 인허가용)',
    '공사측량 (착공, 터파기, 기준점, 골조 검측)',
    '설계측량 (토목·단지 종횡단)',
    '드론 항공측량 및 3D 토량 분석',
    '하천측량 (종·횡단 및 수위 기준점)',
    '시설물 유지관리측량 (변위 및 안전진단)',
    '잘 모름 / 현장 상황 보고 적합한 측량 추천 희망'
  ];

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setAttachedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newRecord: InquiryRecord = {
      id: 'inq-' + Date.now(),
      name: formData.name,
      company: formData.company || '개인',
      phone: formData.phone,
      email: formData.email,
      location: formData.location,
      serviceType: formData.serviceType,
      expectedDate: formData.expectedDate || '협의 필요',
      message: formData.message,
      fileName: attachedFile?.name,
      fileSize: attachedFile?.size,
      createdAt: new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'pending'
    };

    // Save to parent state and localStorage
    onInquirySubmitted(newRecord);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
      // Reset form
      setFormData({
        name: '',
        company: '',
        phone: '',
        email: '',
        location: '',
        serviceType: '지형현황측량',
        expectedDate: '',
        message: ''
      });
      setAttachedFile(null);
    }, 500);
  };

  return (
    <section id="contact" className="py-20 bg-[#F5F4EE] border-b border-stone-200/80 survey-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-wider text-emerald-800 uppercase mb-2">
            CONTACT & CONSULTATION
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            측량이 필요한가요?
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            현장 위치와 필요한 작업을 편하게 말씀해주세요. <br className="hidden sm:inline" />
            측량 종류를 모르셔도 괜찮습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & Fast Hotline */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Call Box */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-xs survey-grid-pattern-dark relative overflow-hidden border border-slate-800">
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>대표자 직통 상담</span>
              </div>
              <h3 className="text-xl font-bold mb-2">급한 현장 일정이나 궁금한 점은 즉시 전화주세요</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                현장 소장님, 설계 담당자님의 상황을 바로 알아듣고 즉각 대처해 드립니다.
              </p>

              <a
                href="tel:010-0000-0000"
                className="flex items-center justify-between p-4 bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-colors font-bold text-white shadow-xs group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-800 flex items-center justify-center">
                    <PhoneCall className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] text-emerald-200 font-medium">대표 직통 전화 (터치 시 통화)</div>
                    <div className="text-lg tracking-wider font-mono">010-0000-0000</div>
                  </div>
                </div>
                <span className="text-xs bg-emerald-800/80 px-2.5 py-1 rounded">연결</span>
              </a>
            </div>

            {/* Operating Info */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-2xs space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-stone-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">상담 및 업무 시간</div>
                  <div className="text-slate-600 mt-0.5">평일 08:00 ~ 18:00</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">주말 및 공휴일 긴급 현장 사전 협의 가능</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-stone-100">
                <div className="w-8 h-8 rounded-lg bg-stone-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">측량 출장 가능 지역</div>
                  <div className="text-slate-600 mt-0.5">수도권 전 지역 (서울·경기·인천) 및 전국 주요 현장</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">원거리 광역 현장 GNSS / 드론 측량 출장 지원</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-stone-100">
                <div className="w-8 h-8 rounded-lg bg-stone-100 text-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">이메일 도면 접수</div>
                  <div className="text-slate-600 font-mono mt-0.5">soulsurvey@naver.com</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">대용량 CAD 도면(dwg) 및 인허가 서류 발송용</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              측량 문의하기
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              현장 위치와 알고 계신 내용을 편하게 남겨주시면, 대표자가 직접 확인 후 연락드립니다.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    의뢰인 성함 / 직함 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="예: 홍길동 소장"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    회사명 / 소속
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="예: 00건축사사무소, 00건설 (개인은 비워두셔도 됨)"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    연락처 (휴대전화) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="예: 010-1234-5678"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    이메일 주소
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="견적서 수신용 이메일"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  현장 위치 (지번 또는 도로명 주소) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="예: 경기도 화성시 남양읍 00리 123번지 일원"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    필요한 측량 작업 종류 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
                  >
                    {serviceOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    희망 현장 측량 일정
                  </label>
                  <input
                    type="text"
                    value={formData.expectedDate}
                    onChange={(e) => setFormData({ ...formData, expectedDate: e.target.value })}
                    placeholder="예: 다음 주 중, 또는 0월 말 이전"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Drag & Drop File Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  도면(CAD dwg, PDF) 또는 현장 사진 첨부
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleFileDrop}
                  className="border-2 border-dashed border-stone-200 hover:border-emerald-600 rounded-xl p-4 text-center bg-stone-50 hover:bg-emerald-50/30 transition-colors cursor-pointer relative"
                >
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    accept=".dwg,.dxf,.pdf,.jpg,.jpeg,.png,.zip"
                  />
                  {attachedFile ? (
                    <div className="flex items-center justify-center gap-2 text-xs text-emerald-800 font-semibold py-1">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span>{attachedFile.name} ({attachedFile.size})</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAttachedFile(null);
                        }}
                        className="p-1 hover:bg-emerald-100 rounded text-slate-500"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-2 text-slate-500">
                      <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                      <span className="text-xs font-medium text-slate-700">
                        파일을 여기에 드래그하거나 클릭하여 선택
                      </span>
                      <span className="text-[11px] text-slate-400 mt-0.5">
                        CAD(dwg, dxf), PDF, 이미지, 압축파일 (최대 50MB)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  문의 내용 및 현장 특이사항
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="예: 인접 토지와 단차가 심해 옹벽 계획용 현황도가 필요합니다. 언제쯤 도면 납품이 가능한지 알고 싶습니다."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-slate-900 hover:bg-emerald-800 transition-all shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>제출 검토 중...</span>
                  ) : (
                    <>
                      <span>측량 상담 및 견적 요청서 보내기</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Submission Success Confirmation Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              상담 요청이 안전하게 접수되었습니다!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
              남겨주신 현장 위치({formData.location || '지번'})와 도면 자료를 바탕으로 신속히 사전 분석한 후, 담당자가 직접 유선으로 연락드리겠습니다.
            </p>

            <div className="flex flex-col gap-2">
              <a
                href="tel:010-0000-0000"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-900 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>급하신 경우 직통 전화 (010-0000-0000)</span>
              </a>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
