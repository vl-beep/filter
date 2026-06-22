"use client";

interface ChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function Chip({ label, selected = false, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-3 py-1.5 rounded-[12px] text-base font-medium leading-5 shrink-0 transition-all duration-100 active:scale-95 ${
        selected
          ? "bg-[#2e3643] text-white active:bg-[#1f2631]"
          : "bg-bg-secondary text-text-primary active:bg-[#dde1ea]"
      }`}
    >
      {label}
    </button>
  );
}
