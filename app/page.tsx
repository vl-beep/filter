"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-dvh bg-bg-secondary">
      {/* Status bar */}
      <div className="flex items-center justify-between h-6 px-4 bg-[#181d24] shrink-0">
        <span className="text-white text-[14px] font-medium leading-none">12:30</span>
        <div className="flex items-center gap-1.5">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <rect x="0" y="7" width="3" height="5" rx="0.5" fill="rgba(255,255,255,0.9)" />
            <rect x="5" y="5" width="3" height="7" rx="0.5" fill="rgba(255,255,255,0.9)" />
            <rect x="10" y="2" width="3" height="10" rx="0.5" fill="rgba(255,255,255,0.9)" />
            <rect x="15" y="0" width="3" height="12" rx="0.5" fill="rgba(255,255,255,0.9)" />
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
            <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="rgba(255,255,255,0.9)" />
            <rect x="2" y="2" width="15" height="8" rx="1.5" fill="rgba(255,255,255,0.9)" />
            <path d="M22 4v4a2 2 0 000-4z" fill="rgba(255,255,255,0.9)" />
          </svg>
        </div>
      </div>

      {/* Top app bar */}
      <div className="flex items-center justify-between h-[52px] px-4 bg-[#181d24] shrink-0">
        <span className="text-white text-base font-semibold leading-5">Задачи</span>
        <Link
          href="/filters"
          className="flex items-center gap-1.5 px-3 h-8 rounded-[12px] bg-white/10 active:bg-white/20 transition-colors duration-100"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 4h12M4 8h8M6 12h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-white text-[14px] font-medium leading-5">Фильтры</span>
        </Link>
      </div>

      {/* Placeholder content */}
      <div className="flex-1 flex items-center justify-center">
        <span className="text-text-secondary text-base">Список задач</span>
      </div>
    </div>
  );
}
