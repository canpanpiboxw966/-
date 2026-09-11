import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('soul_survey_past_categories');
      localStorage.removeItem('soul_survey_company_projects');
      localStorage.removeItem('soul_survey_inquiries');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 text-center">
          <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              S
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              소울측량 (SOUL SURVEY)
            </h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              화면을 표시하는 중 일시적인 로컬 저장소 또는 네트워크 오류가 발생했습니다.
              아래 버튼을 눌러 초기 화면으로 복구해 주세요.
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-3 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
            >
              화면 새로고침 및 복구
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
