"use client";

interface CheckboxProps {
  checked: boolean;
  onChange?: () => void;
}

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <button
      onClick={onChange}
      className={`size-6 rounded-[6px] flex items-center justify-center shrink-0 transition-all duration-100 border-2 ${
        checked
          ? "bg-[#804aff] border-[#804aff]"
          : "bg-white border-[#c4cad4] active:border-[#804aff]"
      }`}
    >
      {checked && (
        <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
          <path
            d="M1 4L4.5 7.5L11 1"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
