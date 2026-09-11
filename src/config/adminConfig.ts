/**
 * =========================================================
 * [관리자 비밀번호 설정]
 * 관리자 모드 및 사진 관리 기능에 접근하기 위한 비밀번호입니다.
 * 원하는 비밀번호로 변경하여 사용하실 수 있습니다.
 * =========================================================
 */
export const DEFAULT_ADMIN_PASSWORD = '1234';

export function getAdminPassword(): string {
  if (typeof window !== 'undefined' && (window as any).ADMIN_PASSWORD) {
    return String((window as any).ADMIN_PASSWORD);
  }
  return DEFAULT_ADMIN_PASSWORD;
}

export const ADMIN_PASSWORD = DEFAULT_ADMIN_PASSWORD;
