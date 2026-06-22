"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useFilters } from "@/context/FiltersContext";
import { Checkbox } from "@/components/ui/Checkbox";
import { SearchInput } from "@/components/ui/SearchInput";
import { IconArrowLeft } from "@/components/ui/icons";
import { TECHZONES_DATA, ZoneType, Zone } from "@/lib/filterData";

const TYPE_FILTERS: (ZoneType | "Все")[] = ["Заряд", "Логистика", "Все"];


// ─── TopAppBar ────────────────────────────────────────────────────────────────

function TopAppBar({
  title,
  onBack,
  onSelectAll,
  allSelected,
}: {
  title: string;
  onBack: () => void;
  onSelectAll: () => void;
  allSelected: boolean;
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
          {allSelected ? "Сбросить" : "Выбрать все"}
        </span>
      </button>
    </div>
  );
}

// ─── Zone row ─────────────────────────────────────────────────────────────────

function ZoneRow({
  zone,
  checked,
  onToggle,
}: {
  zone: Zone;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-3 h-[68px] px-4 active:bg-bg-secondary transition-colors duration-100"
    >
      <div className="size-11 rounded-[16px] bg-toggle-off flex items-center justify-center shrink-0">
        <img src="/images/icon-techzone.png" alt="" className="size-6 brightness-0 invert" />
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <span className="text-base font-medium leading-5 text-text-primary text-left truncate">
          {zone.name}
        </span>
        <span className="text-[14px] font-normal leading-5 text-text-secondary text-left">
          {zone.type}
        </span>
      </div>
      <Checkbox checked={checked} />
    </button>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export function TechzoneScreen() {
  const router = useRouter();
  const { state, update } = useFilters();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<ZoneType | "Все">("Все");
  const [localSelected, setLocalSelected] = useState<string[]>(state.techzones);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return TECHZONES_DATA.filter((g) =>
      state.cities.length === 0 || state.cities.includes(g.group)
    ).map((g) => ({
      ...g,
      zones: g.zones.filter((z) => {
        const matchesSearch = !q || z.name.toLowerCase().includes(q);
        const matchesType = typeFilter === "Все" || z.type === typeFilter;
        return matchesSearch && matchesType;
      }),
    })).filter((g) => g.zones.length > 0);
  }, [search, typeFilter, state.cities]);

  const toggle = (name: string) =>
    setLocalSelected((s) =>
      s.includes(name) ? s.filter((z) => z !== name) : [...s, name]
    );

  const visibleNames = useMemo(
    () => filtered.flatMap((g) => g.zones.map((z) => z.name)),
    [filtered]
  );

  const selectAll = () => {
    if (localSelected.length > 0) {
      setLocalSelected([]);
    } else {
      setLocalSelected(visibleNames);
    }
  };

  const apply = () => {
    update({ techzones: localSelected });
    router.push("/filters");
  };

  return (
    <div className="flex flex-col w-full h-dvh overflow-hidden">
      {/* Header */}
      <div className="shrink-0 shadow-[0px_0px_8px_0px_rgba(33,41,51,0.10),0px_0px_2px_0px_rgba(33,41,51,0.12)]">
        <TopAppBar
          title="Техзоны"
          onBack={() => router.push("/filters")}
          onSelectAll={selectAll}
          allSelected={localSelected.length > 0}
        />
      </div>

      {/* Search */}
      <div className="shrink-0 pt-3">
        <SearchInput
          placeholder="Введите название техзоны"
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* Type filter chips */}
      <div className="shrink-0 flex gap-2 px-4 pt-3 pb-1">
        {TYPE_FILTERS.map((type) => {
          const active = typeFilter === type;
          const allZones = TECHZONES_DATA.flatMap((g) => g.zones);
          const hasSelection =
            type !== "Все" &&
            localSelected.some(
              (name) => allZones.find((z) => z.name === name)?.type === type
            );
          return (
            <div key={type} className="relative">
              <button
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 rounded-[12px] text-base font-medium leading-5 transition-all duration-100 active:scale-95 ${
                  active
                    ? "bg-bg-inv text-white"
                    : "bg-bg-secondary text-text-primary active:bg-[#dde1ea]"
                }`}
              >
                {type}
              </button>
              {hasSelection && (
                <span className="absolute -top-1 -right-1 size-2 rounded-full bg-brand pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto bg-white">
        {filtered.map((group) => (
          <div key={group.group}>
            <div className="px-4 pt-3 pb-1">
              <span className="text-[13px] font-medium leading-4 text-text-secondary uppercase tracking-[0.5px]">
                {group.group}
              </span>
            </div>
            {group.zones.map((zone, i) => (
              <div key={zone.name + i}>
                <ZoneRow
                  zone={zone}
                  checked={localSelected.includes(zone.name)}
                  onToggle={() => toggle(zone.name)}
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
