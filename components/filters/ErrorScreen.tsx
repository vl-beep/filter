"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useFilters } from "@/context/FiltersContext";
import { Checkbox } from "@/components/ui/Checkbox";
import { IconArrowLeft } from "@/components/ui/icons";

// ─── Data ─────────────────────────────────────────────────────────────────────

const ERRORS_DATA = [
  "E--1 Citiride T 2",
  "E-10 Citiride T 2",
  "E-21 Citiride T 2",
  "E-5 Eleven CrS 02",
  "E-1 Eleven CrS 02",
  "E-2 Eleven CrS 02",
  "E-3 Eleven CrS 02",
  "E-4 Eleven CrS 02",
  "E-6 Eleven CrS 02",
  "E-0 Eleven CrS 02",
  "E-5 Eleven E 10.2",
  "E-1 Eleven E 10.2",
  "E-2 Eleven E 10.2",
  "E-3 Eleven E 10.2",
  "E-0 Ninebot SL 90",
  "E-1 Ninebot SL 90",
  "E-2 Ninebot SL 90",
  "E-5 Ninebot SL 90",
];


// ─── Screen ───────────────────────────────────────────────────────────────────

export function ErrorScreen() {
  const router = useRouter();
  const { state, update } = useFilters();
  const [search, setSearch] = useState("");
  const [localSelected, setLocalSelected] = useState<string[]>(state.errors);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return ERRORS_DATA;
    return ERRORS_DATA.filter((e) => e.toLowerCase().includes(q));
  }, [search]);

  const toggle = (name: string) =>
    setLocalSelected((s) =>
      s.includes(name) ? s.filter((e) => e !== name) : [...s, name]
    );

  const selectAll = () => {
    if (localSelected.length > 0) {
      setLocalSelected([]);
    } else {
      setLocalSelected(filtered);
    }
  };

  const apply = () => {
    update({ errors: localSelected });
    router.push("/filters");
  };

  return (
    <div className="flex flex-col w-full h-dvh overflow-hidden">
      {/* Header */}
      <div className="shrink-0 shadow-[0px_0px_8px_0px_rgba(33,41,51,0.10),0px_0px_2px_0px_rgba(33,41,51,0.12)]">
        {/* Top App Bar */}
        <div className="flex items-center gap-2 h-[52px] px-2 bg-white shrink-0">
          <button
            onClick={() => router.push("/filters")}
            className="p-1.5 shrink-0 active:opacity-50 transition-opacity duration-100"
          >
            <IconArrowLeft />
          </button>
          <div className="flex-1 min-w-0">
            <span className="text-base font-semibold leading-5 text-text-primary tracking-[-0.2px]">
              Ошибки
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

      {/* Search input */}
      <div className="shrink-0 px-4 pt-3 pb-0">
        <input
          type="text"
          className="w-full border border-[#cfd3dc] rounded-[16px] px-4 py-3 text-base text-text-primary placeholder:text-[#6c7482] outline-none focus:border-brand transition-colors duration-150"
          placeholder="Введите код ошибки"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {filtered.map((error) => (
          <button
            key={error}
            onClick={() => toggle(error)}
            className="w-full flex items-center justify-between h-[56px] px-4 active:bg-bg-secondary transition-colors duration-100"
          >
            <span className="text-base font-medium leading-5 text-text-primary text-left">
              {error}
            </span>
            <Checkbox checked={localSelected.includes(error)} />
          </button>
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
