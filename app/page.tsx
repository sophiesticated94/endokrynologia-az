'use client';
import dynamic from 'next/dynamic';

const CourseApp = dynamic(() => import('./course-app'), {
  ssr: false,
  loading: () => (
    <div className="app-shell flex items-center justify-center min-h-screen bg-[#f6f8f7]">
      <div className="flex flex-col items-center gap-3 text-slate-500 text-sm">
        <div className="w-8 h-8 border-3 border-[#187765] border-t-transparent rounded-full animate-spin" />
        <span>Ładowanie kursu…</span>
      </div>
    </div>
  ),
});

export default function Home() {
  return <CourseApp />;
}
