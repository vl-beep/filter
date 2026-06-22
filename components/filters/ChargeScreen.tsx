"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFilters } from "@/context/FiltersContext";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { IconArrowLeft } from "@/components/ui/icons";


export function ChargeScreen() {
  const router = useRouter();
  const { state, update } = useFilters();

  const [direction, setDirection] = useState<"more" | "less">(state.chargeDirection);
  const [value, setValue] = useState(state.chargeValue);

  const apply = () => {
    update({ chargeValue: value.trim(), chargeDirection: direction });
    router.push("/filters");
  };

  const hasValue = value.trim().length > 0;

  return (
    <div className="flex flex-col w-full h-dvh overflow-hidden bg-white">
      {/* Header */}
      <div className="shrink-0 shadow-[0px_0px_8px_0px_rgba(33,41,51,0.10),0px_0px_2px_0px_rgba(33,41,51,0.12)]">
        <div className="flex items-center gap-2 h-[52px] px-2 bg-white shrink-0">
          <button
            onClick={() => router.push("/filters")}
            className="p-1.5 shrink-0 active:opacity-50 transition-opacity duration-100"
          >
            <IconArrowLeft />
          </button>
          <span className="flex-1 text-base font-semibold leading-5 text-text-primary tracking-[-0.2px]">
            Процент заряда
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-4 pt-6 pb-0 overflow-y-auto">
        <span className="text-base font-medium leading-5 text-text-primary mb-3">
          Процент, %
        </span>

        <SegmentedControl
          options={["Больше", "Меньше"]}
          activeIndex={direction === "more" ? 0 : 1}
          onSelect={(i) => setDirection(i === 0 ? "more" : "less")}
        />

        <div className="h-3" />

        <input
          type="text"
          inputMode="decimal"
          className="w-full border border-[#cfd3dc] rounded-[16px] px-4 py-3 text-base text-text-primary placeholder:text-[#6c7482] outline-none focus:border-brand transition-colors duration-150"
          placeholder="Введите значение"
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, ""))}
        />
      </div>

      {/* Footer */}
      <div className="shrink-0 px-4 py-4">
        <button
          onClick={apply}
          className={`w-full h-12 rounded-[16px] flex items-center justify-center transition-colors duration-100 ${
            hasValue
              ? "bg-[#804aff] active:bg-[#6b3aff]"
              : "bg-bg-secondary active:bg-[#dde1ea]"
          }`}
        >
          <span className={`text-[18px] font-medium leading-5 ${hasValue ? "text-white" : "text-brand"}`}>
            Применить
          </span>
        </button>
      </div>
    </div>
  );
}
