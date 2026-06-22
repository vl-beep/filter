"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useFilters } from "@/context/FiltersContext";
import { Checkbox } from "@/components/ui/Checkbox";
import { SearchInput } from "@/components/ui/SearchInput";
import { IconArrowLeft, IconCity } from "@/components/ui/icons";

// ─── Data ─────────────────────────────────────────────────────────────────────

const LOCATIONS_DATA = [
  {
    region: "Московский",
    cities: ["Москва", "Зеленоград"],
  },
  {
    region: "Северо-Западный",
    cities: ["Санкт–Петербург", "Выборг"],
  },
  {
    region: "Сибирь",
    cities: ["Новосибирск", "Барнаул"],
  },
  {
    region: "Южный",
    cities: ["Краснодар", "Сочи"],
  },
  {
    region: "Калининградский",
    cities: ["Калининград", "Советск"],
  },
  {
    region: "Ленинградский",
    cities: ["Балтийск", "Гурьевск", "Серняховск"],
  },
];

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
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1 1 0 100 2 1 1 0 000-2z" fill="#212933" />
          <path d="M5.2 7.2A4 4 0 018 6a4 4 0 012.8 1.2" stroke="#212933" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M2.8 4.8A7 7 0 018 3a7 7 0 015.2 1.8" stroke="#212933" strokeWidth="1.2" strokeLinecap="round" />
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

// ─── TopAppBar ────────────────────────────────────────────────────────────────

function TopAppBar({
  title,
  onBack,
  onSelectAll,
}: {
  title: string;
  onBack: () => void;
  onSelectAll: () => void;
}) {
  return (
    <div className="flex items-center gap-2 h-[52px] px-2 bg-white shrink-0">
      <button
        onClick={onBack}
        className="p-1.5 shrink-0 active:opacity-50 transition-opacity duration-100"
      >
        <IconArrowLeft />
      </button>
      <div className="flex-1 min-w-0">
        <span className="text-base font-semibold leading-5 text-text-primary tracking-[-0.2px]">
          {title}
        </span>
      </div>
      <button
        onClick={onSelectAll}
        className="px-2 py-3 shrink-0 active:opacity-50 transition-opacity duration-100"
      >
        <span className="text-base font-medium leading-5 text-brand">
          Выбрать все
        </span>
      </button>
    </div>
  );
}

// ─── City row ─────────────────────────────────────────────────────────────────

function CityRow({
  name,
  checked,
  onToggle,
}: {
  name: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-3 h-[68px] px-4 active:bg-bg-secondary transition-colors duration-100"
    >
      <div className="size-11 rounded-[16px] bg-[#858c99] flex items-center justify-center shrink-0">
        <IconCity />
      </div>
      <span className="flex-1 text-base font-medium leading-5 text-text-primary text-left truncate">
        {name}
      </span>
      <Checkbox checked={checked} />
    </button>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function LocationsScreen() {
  const router = useRouter();
  const { state, update } = useFilters();
  const [search, setSearch] = useState("");
  const [localSelected, setLocalSelected] = useState<string[]>(state.cities);

  const allCities = LOCATIONS_DATA.flatMap((g) => g.cities);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return LOCATIONS_DATA;
    return LOCATIONS_DATA.map((g) => ({
      ...g,
      cities: g.cities.filter((c) => c.toLowerCase().includes(q)),
    })).filter((g) => g.cities.length > 0);
  }, [search]);

  const toggle = (city: string) =>
    setLocalSelected((s) =>
      s.includes(city) ? s.filter((c) => c !== city) : [...s, city]
    );

  const selectAll = () => {
    const visible = filtered.flatMap((g) => g.cities);
    const allSelected = visible.every((c) => localSelected.includes(c));
    if (allSelected) {
      setLocalSelected((s) => s.filter((c) => !visible.includes(c)));
    } else {
      setLocalSelected((s) => [...new Set([...s, ...visible])]);
    }
  };

  const apply = () => {
    update({ cities: localSelected });
    router.push("/filters");
  };

  return (
    <div className="flex flex-col w-full h-dvh overflow-hidden">
      {/* Header */}
      <div className="shrink-0 shadow-[0px_0px_8px_0px_rgba(33,41,51,0.10),0px_0px_2px_0px_rgba(33,41,51,0.12)]">
        <StatusBar />
        <TopAppBar
          title="Локация"
          onBack={() => router.push("/filters")}
          onSelectAll={selectAll}
        />
      </div>

      {/* Search */}
      <div className="shrink-0 pt-3 pb-2">
        <SearchInput
          placeholder="Введите название локации"
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {filtered.map((group) => (
          <div key={group.region}>
            <div className="px-4 pt-3 pb-1">
              <span className="text-[13px] font-medium leading-4 text-text-secondary uppercase tracking-[0.5px]">
                {group.region}
              </span>
            </div>
            {group.cities.map((city, i) => (
              <div key={city}>
                <CityRow
                  name={city}
                  checked={localSelected.includes(city)}
                  onToggle={() => toggle(city)}
                />
              </div>
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
