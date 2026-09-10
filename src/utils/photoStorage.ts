// IndexedDB helper to persistently store high-resolution survey site photos

const DB_NAME = 'soul_survey_db';
const STORE_NAME = 'site_photos';
const DB_VERSION = 1;

export interface StoredPhoto {
  id: string; // unique key e.g. "redevelopment_main", "military_0", etc.
  categoryId: string; // "redevelopment" | "apartments" | "defense" | "cadastral" | "special-landmarks" | "institutional" | "court"
  title: string;
  dataUrl: string;
  filename: string;
  uploadedAt: number;
}

export function openPhotoDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      return reject(new Error('IndexedDB is not supported in this environment'));
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function savePhoto(photo: StoredPhoto): Promise<void> {
  try {
    const db = await openPhotoDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(photo);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to save photo to IndexedDB:', err);
  }
}

export async function getAllPhotos(): Promise<StoredPhoto[]> {
  try {
    const db = await openPhotoDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to load photos from IndexedDB:', err);
    return [];
  }
}

export async function deletePhoto(id: string): Promise<void> {
  try {
    const db = await openPhotoDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to delete photo from IndexedDB:', err);
  }
}

export async function deletePhotosByCategoryId(categoryId: string): Promise<void> {
  try {
    const all = await getAllPhotos();
    const toDelete = all.filter(p => p.categoryId === categoryId);
    for (const p of toDelete) {
      await deletePhoto(p.id);
    }
  } catch (err) {
    console.error('Failed to delete photos by category:', err);
  }
}

export async function deletePhotosByUrl(dataUrl: string): Promise<void> {
  try {
    const all = await getAllPhotos();
    const toDelete = all.filter(p => p.dataUrl === dataUrl);
    for (const p of toDelete) {
      await deletePhoto(p.id);
    }
  } catch (err) {
    console.error('Failed to delete photos by url:', err);
  }
}

export async function clearAllPhotos(): Promise<void> {
  try {
    const db = await openPhotoDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to clear photos:', err);
  }
}

// Automatically match a filename to a category ID and metadata
export function matchFilenameToCategory(filename: string): {
  categoryId: string;
  categoryName: string;
  tag: string;
  cleanTitle: string;
} {
  const lower = filename.toLowerCase();

  if (lower.includes('재개발') || lower.includes('삼성4구역') || lower.includes('택지') || lower.includes('남양뉴타운')) {
    return {
      categoryId: 'redevelopment',
      categoryName: '재개발 · 재건축 및 택지개발사업',
      tag: lower.includes('택지') ? '택지개발' : '재개발정비사업',
      cleanTitle: filename.replace(/\.(png|jpg|jpeg|webp)$/i, '')
    };
  }

  if (lower.includes('아파트') || lower.includes('래미안') || lower.includes('옥수') || lower.includes('운중동') || lower.includes('타운하우스') || lower.includes('푸르지오')) {
    return {
      categoryId: 'apartments',
      categoryName: '아파트 신축공사',
      tag: '아파트시공',
      cleanTitle: filename.replace(/\.(png|jpg|jpeg|webp)$/i, '')
    };
  }

  if (lower.includes('군시설') || lower.includes('국방') || lower.includes('국군수도병원') || lower.includes('사령부')) {
    return {
      categoryId: 'defense',
      categoryName: '군시설 및 국방시설',
      tag: '국방·군시설',
      cleanTitle: filename.replace(/\.(png|jpg|jpeg|webp)$/i, '')
    };
  }

  if (lower.includes('지적확정') || lower.includes('수원111') || lower.includes('일원대우')) {
    return {
      categoryId: 'cadastral',
      categoryName: '지적확정측량',
      tag: '지적확정측량',
      cleanTitle: filename.replace(/\.(png|jpg|jpeg|webp)$/i, '')
    };
  }

  if (lower.includes('롯데월드') || lower.includes('대형시설') || lower.includes('가락시장') || lower.includes('구분지상권') || lower.includes('특수권리')) {
    return {
      categoryId: 'special-landmarks',
      categoryName: '특수권리 및 대형시설물',
      tag: lower.includes('가락시장') ? '구분지상권' : '초고층랜드마크',
      cleanTitle: filename.replace(/\.(png|jpg|jpeg|webp)$/i, '')
    };
  }

  if (lower.includes('법원') || lower.includes('감정') || lower.includes('재판')) {
    return {
      categoryId: 'court',
      categoryName: '법원감정측량',
      tag: '법원감정',
      cleanTitle: filename.replace(/\.(png|jpg|jpeg|webp)$/i, '')
    };
  }

  // Fallback to institutional
  return {
    categoryId: 'institutional',
    categoryName: '기타 참여사업',
    tag: '기타주요사업',
    cleanTitle: filename.replace(/\.(png|jpg|jpeg|webp)$/i, '')
  };
}
