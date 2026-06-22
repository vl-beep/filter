"use client";

interface SegmentedControlProps {
  options: string[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  firstFlex?: boolean;
}

export function SegmentedControl({
  options,
  activeIndex = 0,
  onSelect,
  firstFlex = false,
}: SegmentedControlProps) {
  return (
    <div className="flex items-stretch bg-bg-secondary rounded-[16px] overflow-hidden p-1">
      {options.map((option, i) => {
        const sizeClass = firstFlex
          ? i === 0 ? "flex-1" : "shrink-0 whitespace-nowrap"
          : "flex-1";
        return (
          <button
            key={option}
            onClick={() => onSelect?.(i)}
            className={`${sizeClass} flex items-center justify-center px-4 py-2 rounded-[12px] text-base font-medium leading-5 transition-all duration-150 ${
              i === activeIndex
                ? "bg-white text-text-primary shadow-sm"
                : "text-text-secondary active:bg-white/50"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
