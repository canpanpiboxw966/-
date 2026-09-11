import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';

import { INITIAL_PAST_CATEGORIES, INITIAL_COMPANY_PROJECTS } from './data/initialData';
import { PastProjectCategory, CompanyProject, InquiryRecord } from './types';
import { Phone, ArrowUp } from 'lucide-react';

import { getAllPhotos } from './utils/photoStorage';

export default function App() {
  // Load saved state or default, sanitizing any stale fake image paths
  const [pastCategories, setPastCategories] = useState<PastProjectCategory[]>(() => {
    try {
      const saved = localStorage.getItem('soul_survey_past_categories');
      if (saved) {
        const parsed = JSON.parse(saved) as PastProjectCategory[];
        // Sanitize: remove any outdated broken /images/projects/ paths
        return parsed.map(c => ({
          ...c,
          representativeImage: {
            ...c.representativeImage,
            url: c.id === 'court' 
              ? '/court-badge.svg' 
              : (c.representativeImage?.url?.includes('/images/projects/') ? '' : c.representativeImage?.url || '')
          },
          images: (c.images || [])
            .filter(img => !img.url?.includes('/images/projects/'))
        }));
      }
      return INITIAL_PAST_CATEGORIES;
    } catch {
      return INITIAL_PAST_CATEGORIES;
    }
  });

  // Load photos from IndexedDB on startup
  useEffect(() => {
    async function loadPersistedPhotos() {
      try {
        const stored = await getAllPhotos();
        if (stored && stored.length > 0) {
          setPastCategories(prev => {
            const next = JSON.parse(JSON.stringify(prev)) as PastProjectCategory[];
            for (const item of stored) {
              const cat = next.find(c => c.id === item.categoryId);
              if (cat) {
                cat.representativeImage = {
                  title: item.title,
                  url: item.dataUrl,
                  alt: item.title
                };
                if (!cat.images) cat.images = [];
                const existingIdx = cat.images.findIndex(img => img.title === item.title);
                const entry = {
                  title: item.title,
                  url: item.dataUrl,
                  description: `${cat.categoryName} 현장 사진 / 도면`,
                  tag: cat.categoryName
                };
                if (existingIdx >= 0) {
                  cat.images[existingIdx] = entry;
                } else {
                  cat.images.unshift(entry);
                }
              }
            }
            return next;
          });
        }
      } catch (err) {
        console.error('Error loading stored photos:', err);
      }
    }
    loadPersistedPhotos();
  }, []);

  const [companyProjects, setCompanyProjects] = useState<CompanyProject[]>(() => {
    try {
      const saved = localStorage.getItem('soul_survey_company_projects');
      return saved ? JSON.parse(saved) : INITIAL_COMPANY_PROJECTS;
    } catch {
      return INITIAL_COMPANY_PROJECTS;
    }
  });

  const [inquiries, setInquiries] = useState<InquiryRecord[]>(() => {
    try {
      const saved = localStorage.getItem('soul_survey_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Admin Modal Open State
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Floating back to top visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save to localStorage whenever states change
  const handleUpdatePastCategories = (categories: PastProjectCategory[]) => {
    setPastCategories(categories);
    try {
      localStorage.setItem('soul_survey_past_categories', JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateCompanyProjects = (projects: CompanyProject[]) => {
    setCompanyProjects(projects);
    try {
      localStorage.setItem('soul_survey_company_projects', JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateInquiries = (newInquiries: InquiryRecord[]) => {
    setInquiries(newInquiries);
    try {
      localStorage.setItem('soul_survey_inquiries', JSON.stringify(newInquiries));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddInquiry = (record: InquiryRecord) => {
    const updated = [record, ...inquiries];
    handleUpdateInquiries(updated);
  };

  const handleResetToDefaults = () => {
    setPastCategories(INITIAL_PAST_CATEGORIES);
    setCompanyProjects(INITIAL_COMPANY_PROJECTS);
    try {
      localStorage.removeItem('soul_survey_past_categories');
      localStorage.removeItem('soul_survey_company_projects');
    } catch (e) {
      console.error(e);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-700 selection:text-white">
      {/* 1. Header */}
      <Header
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenContact={() => {
          const el = document.getElementById('contact');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. About Section */}
        <About />

        {/* 4. Portfolio Section (Past experience accordion + Company performance) */}
        <Portfolio
          pastCategories={pastCategories}
          companyProjects={companyProjects}
          onUpdatePastCategories={handleUpdatePastCategories}
        />

        {/* 5. Services Section (5 General survey fields + GNSS & Drone Tech) */}
        <Services />

        {/* 6. Process Section (7 steps) */}
        <Process />

        {/* 7. Contact Section (Direct Call + Estimate Request Form) */}
        <Contact onInquirySubmitted={handleAddInquiry} />
      </main>

      {/* 8. Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Admin Management Modal (Password: 1111) */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        companyProjects={companyProjects}
        onUpdateCompanyProjects={handleUpdateCompanyProjects}
        pastCategories={pastCategories}
        onUpdatePastCategories={handleUpdatePastCategories}
        inquiries={inquiries}
        onUpdateInquiries={handleUpdateInquiries}
        onResetToDefaults={handleResetToDefaults}
      />

      {/* Mobile Floating Quick Action Hotline */}
      <div className="fixed bottom-5 right-4 z-30 flex flex-col gap-2.5 sm:hidden">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="맨 위로 가기"
            className="w-10 h-10 rounded-full bg-white/90 text-slate-700 shadow-md border border-slate-200 flex items-center justify-center transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
        <a
          href="tel:010-0000-0000"
          aria-label="전화 통화"
          className="w-12 h-12 rounded-full bg-emerald-800 text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* Desktop Floating Scroll-to-Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="페이지 맨 위로 이동"
          className="hidden sm:flex fixed bottom-8 right-8 z-30 w-11 h-11 rounded-full bg-white/95 text-slate-700 hover:text-emerald-800 shadow-md border border-slate-200/90 items-center justify-center hover:shadow-lg transition-all"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
