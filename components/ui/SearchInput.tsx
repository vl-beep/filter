"use client";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}

export function SearchInput({ placeholder, value, onChange }: SearchInputProps) {
  return (
    <div className="mx-4">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[#cfd3dc] rounded-[16px] px-4 py-3 text-base text-text-primary placeholder:text-[#6c7482] outline-none focus:border-brand transition-colors duration-150 bg-white"
      />
    </div>
  );
}
