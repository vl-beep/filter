"use client";

interface ToggleProps {
  on?: boolean;
  onClick?: () => void;
}

export function Toggle({ on = false, onClick }: ToggleProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center w-12 h-7 rounded-[120px] shrink-0 transition-colors duration-200 active:opacity-80 ${
        on ? "bg-[#804aff]" : "bg-toggle-off"
      }`}
    >
      <div
        className={`absolute size-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
          on ? "translate-x-[24px]" : "translate-x-1"
        }`}
      />
    </button>
  );
}
