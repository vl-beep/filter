"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFilters } from "@/context/FiltersContext";
import { Checkbox } from "@/components/ui/Checkbox";
import { IconArrowLeft } from "@/components/ui/icons";

// ─── Data ─────────────────────────────────────────────────────────────────────

const REASONS_DATA = [
  {
    group: "Сборка / На сборке",
    items: ["Транспорт на сборке"],
  },
  {
    group: "Обслуживание / Зарядка",
    items: ["Зарядка"],
  },
  {
    group: "Обслуживание / Требует обслуживания",
    items: [
      "Нет связи",
      "Низкий заряд батареи",
      "Авторемонт",
      "Требует ремонта",
      "Обновление прошивки",
      "За зоной завершения",
      "Ошибка GPS",
      "Изъят",
    ],
  },
];

const ALL_ITEMS = REASONS_DATA.flatMap((g) => g.items);

// ─── Status bar ───────────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div className="flex items-center justify-between h-6 px-4 bg-white shrink-0">
      <span className="text-[#212933] text-[14px] font-medium leading-none">2:29</span>
      <div className="flex items-center gap-1.5">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="0.5" fill="#212933" />
          <rect x="5" y="5" width="3" height="7" rx="0.5" fill="#212933" />
          <rect x="10" y="2" width="3" height="10" rx="0.5" fill="#212933" />
          <rect x="15" y="0" width="3" height="12" rx="0.5" fill="#212933" />
        </svg>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
          <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="#212933" />
          <rect x="2" y="2" width="15" height="8" rx="1.5" fill="#212933" />
          <path d="M22 4v4a2 2 0 000-4z" fill="#212933" />
        </svg>
      </div>
    </div>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function ReasonsScreen() {
  const router = useRouter();
  const { state, update } = useFilters();
  const [localSelected, setLocalSelected] = useState<string[]>(state.reasons);

  const toggle = (name: string) =>
    setLocalSelected((s) =>
      s.includes(name) ? s.filter((r) => r !== name) : [...s, name]
    );

  const selectAll = () => {
    if (localSelected.length > 0) {
      setLocalSelected([]);
    } else {
      setLocalSelected(ALL_ITEMS);
    }
  };

  const apply = () => {
    update({ reasons: localSelected });
    router.push("/filters");
  };

  return (
    <div className="flex flex-col w-full h-dvh overflow-hidden bg-white">
      {/* Header */}
      <div className="shrink-0 shadow-[0px_0px_8px_0px_rgba(33,41,51,0.10),0px_0px_2px_0px_rgba(33,41,51,0.12)]">
        <StatusBar />
        <div className="flex items-center gap-2 h-[52px] px-2 bg-white shrink-0">
          <button
            onClick={() => router.push("/filters")}
            className="p-1.5 shrink-0 active:opacity-50 transition-opacity duration-100"
          >
            <IconArrowLeft />
          </button>
          <div className="flex-1 min-w-0">
            <span className="text-base font-semibold leading-5 text-text-primary tracking-[-0.2px]">
              Причины снятия
            </span>
          </div>
          <button
            onClick={selectAll}
            className="px-2 py-3 shrink-0 active:opacity-50 transition-opacity duration-100"
          >
            <span className="text-base font-medium leading-5 text-brand">{localSelected.length > 0 ? "Сбросить" : "Выбрать все"}</span>
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {REASONS_DATA.map((group) => (
          <div key={group.group}>
            <div className="px-4 pt-4 pb-1">
              <span className="text-[14px] font-normal leading-5 text-text-secondary">
                {group.group}
              </span>
            </div>
            {group.items.map((item) => (
              <button
                key={item}
                onClick={() => toggle(item)}
                className="w-full flex items-center justify-between h-[56px] px-4 active:bg-bg-secondary transition-colors duration-100"
              >
                <span className="text-base font-medium leading-5 text-text-primary text-left">
                  {item}
                </span>
                <Checkbox checked={localSelected.includes(item)} />
              </button>
            ))}
          </div>
        ))}
        <div className="h-4" />
      </div>

      {/* Footer */}
      <div className="shrink-0 px-4 py-4">
        <button
          onClick={apply}
          className={`w-full h-12 rounded-[16px] transition-colors duration-100 flex items-center justify-center ${
            localSelected.length > 0
              ? "bg-[#804aff] active:bg-[#6b3aff]"
              : "bg-bg-secondary active:bg-[#dde1ea]"
          }`}
        >
          <span className={`text-[18px] font-medium leading-5 ${localSelected.length > 0 ? "text-white" : "text-brand"}`}>
            Применить
          </span>
        </button>
      </div>
    </div>
  );
}
