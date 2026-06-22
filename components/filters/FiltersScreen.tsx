"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useFilters, FiltersState, SavedFilter } from "@/context/FiltersContext";
import { Chip } from "@/components/ui/Chip";
import { Toggle } from "@/components/ui/Toggle";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import {
  IconArrowLeft,
  IconChevronRight,
  IconStar,
  IconNetworkOff,
  IconClock,
  IconTriangleAlert,
} from "@/components/ui/icons";
import { CITY_TO_ZONES } from "@/lib/filterData";

// ─── Count calculation ────────────────────────────────────────────────────────

function calcCount(s: FiltersState): number {
  const selTotal =
    s.cities.length +
    s.techzones.length +
    s.models.length +
    (s.availabilityTab !== 0 ? 1 : 0) +
    s.errors.length +
    s.reasons.length;

  const toggleTotal =
    (s.inLease ? 1 : 0) +
    (s.outOfCity ? 1 : 0) +
    (s.noGps ? 1 : 0) +
    (s.enabled ? 1 : 0) +
    (s.serviceMode ? 1 : 0);

  const valueTotal =
    (s.chargeValue ? 1 : 0) +
    (s.idleValue ? 1 : 0) +
    (s.offlineValue ? 1 : 0);

  if (selTotal + toggleTotal + valueTotal === 0) return 238;

  const base = selTotal === 0 ? 238 : Math.min(237, 26 + (selTotal - 1) * 12);
  return Math.max(1, base - toggleTotal * 15 - valueTotal * 10);
}

function hoursLabel(n: string): string {
  const num = parseInt(n, 10);
  if (isNaN(num)) return `${n} ч`;
  const mod10 = num % 10;
  const mod100 = num % 100;
  if (mod100 >= 11 && mod100 <= 14) return `${n} часов`;
  if (mod10 === 1) return `${n} час`;
  if (mod10 >= 2 && mod10 <= 4) return `${n} часа`;
  return `${n} часов`;
}

function statesEqual(a: FiltersState, b: FiltersState): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function taskLabel(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return `${n} задач`;
  if (mod10 === 1) return `${n} задача`;
  if (mod10 >= 2 && mod10 <= 4) return `${n} задачи`;
  return `${n} задач`;
}

// ─── Quick-select lists shown as chips ────────────────────────────────────────

const CITY_CHIPS = ["Москва", "Санкт–Петербург", "Новосибирск", "Краснодар"];
const MODEL_CHIPS = ["Eleven", "Ninebot SL 90", "Ninebot B100", "Ninebot MAX Pro"];

// ─── Primitives ───────────────────────────────────────────────────────────────

function Counter({ value }: { value: number }) {
  return (
    <div className="flex items-center justify-center px-1.5 h-5 min-w-5 rounded-[16px] bg-bg-inv">
      <span className="text-white text-[14px] font-semibold leading-5 tracking-[0.14px]">
        {value}
      </span>
    </div>
  );
}

function SectionHeader({
  label,
  action,
  onAction,
}: {
  label: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-4 h-5">
      <span className="text-base font-medium leading-5 text-text-secondary flex-1">
        {label}
      </span>
      {action && (
        <button
          onClick={onAction}
          className="text-base font-medium leading-5 text-brand active:opacity-50 transition-opacity duration-100"
        >
          {action}
        </button>
      )}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-[#d8dde6]" />;
}

// ─── Selector row (Техзоны) ───────────────────────────────────────────────────

function SelectorRow({
  label,
  count,
  onClick,
}: {
  label: string;
  count?: number;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 h-14 px-4 bg-bg-secondary rounded-[20px] active:bg-[#dde1ea] transition-colors duration-100"
    >
      <span className="flex-1 min-w-0 text-base font-medium leading-5 text-text-primary text-left truncate">
        {label}
      </span>
      <div className="flex items-center gap-1">
        {count !== undefined && count > 0 && <Counter value={count} />}
        <IconChevronRight size={16} />
      </div>
    </button>
  );
}

// ─── Parameter row (toggle / chevron) ────────────────────────────────────────

function ParamRow({
  label,
  subtitle,
  right,
  onToggle,
  toggleOn,
  onClick,
  counter,
}: {
  label: string;
  subtitle?: string;
  right: "toggle" | "chevron";
  onToggle?: () => void;
  toggleOn?: boolean;
  onClick?: () => void;
  counter?: number;
}) {
  const isChevron = right === "chevron";
  const Wrapper = isChevron ? "button" : "div";

  return (
    <Wrapper
      {...(isChevron && onClick ? { onClick } : {})}
      className={`flex items-center gap-2 py-3 w-full ${
        isChevron
          ? "active:opacity-60 transition-opacity duration-100 cursor-pointer"
          : ""
      }`}
    >
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <span className="text-base font-medium leading-5 text-text-primary truncate text-left">
          {label}
        </span>
        {subtitle && (
          <span className="text-[14px] font-normal leading-5 text-text-secondary truncate text-left">
            {subtitle}
          </span>
        )}
      </div>
      <div className="shrink-0 flex items-center gap-1">
        {isChevron && counter !== undefined && counter > 0 && <Counter value={counter} />}
        {isChevron ? (
          <IconChevronRight size={16} />
        ) : (
          <Toggle on={toggleOn} onClick={onToggle} />
        )}
      </div>
    </Wrapper>
  );
}

// ─── Status item ──────────────────────────────────────────────────────────────

function StatusItem({
  icon,
  label,
  subtitle,
  counter,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  counter?: number;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-2 py-3 px-4 active:bg-bg-secondary transition-colors duration-100">
      <div className="size-11 rounded-[16px] bg-bg-secondary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <span className="text-base font-medium leading-5 text-text-primary truncate text-left">
          {label}
        </span>
        {subtitle && (
          <span className="text-[14px] font-normal leading-5 text-text-secondary truncate text-left">
            {subtitle}
          </span>
        )}
      </div>
      <div className="shrink-0 flex items-center gap-1">
        {counter !== undefined && <Counter value={counter} />}
        <IconChevronRight size={16} />
      </div>
    </button>
  );
}

// ─── Status Bar ──────────────────────────────────────────────────────────────

function StatusBar() {
  return (
    <div className="relative flex items-center justify-between bg-status-bar h-6 px-4 shrink-0">
      <span className="text-white text-[14px] font-medium leading-none">12:30</span>
      <div className="flex items-center gap-1.5">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <rect x="0" y="7" width="3" height="5" rx="0.5" fill="rgba(255,255,255,0.9)" />
          <rect x="5" y="5" width="3" height="7" rx="0.5" fill="rgba(255,255,255,0.9)" />
          <rect x="10" y="2" width="3" height="10" rx="0.5" fill="rgba(255,255,255,0.9)" />
          <rect x="15" y="0" width="3" height="12" rx="0.5" fill="rgba(255,255,255,0.9)" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1 1 0 100 2 1 1 0 000-2z" fill="rgba(255,255,255,0.9)" />
          <path d="M5.2 7.2A4 4 0 018 6a4 4 0 012.8 1.2" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M2.8 4.8A7 7 0 018 3a7 7 0 015.2 1.8" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M0.5 2.5A10 10 0 018 0a10 10 0 017.5 2.5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
          <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="rgba(255,255,255,0.9)" />
          <rect x="2" y="2" width="15" height="8" rx="1.5" fill="rgba(255,255,255,0.9)" />
          <path d="M22 4v4a2 2 0 000-4z" fill="rgba(255,255,255,0.9)" />
        </svg>
      </div>
    </div>
  );
}

// ─── Top App Bar ──────────────────────────────────────────────────────────────

function TopAppBar({ onReset, resetEnabled, resetLabel = "Сбросить" }: { onReset: () => void; resetEnabled: boolean; resetLabel?: string }) {
  return (
    <div className="flex items-center gap-2 h-[52px] px-2 bg-white shrink-0">
      <button
        className="p-1.5 shrink-0"
      >
        <IconArrowLeft />
      </button>
      <div className="flex-1 min-w-0">
        <span className="text-base font-semibold leading-5 text-text-primary tracking-[-0.2px] truncate">
          Фильтры
        </span>
      </div>
      <button
        onClick={resetEnabled ? onReset : undefined}
        className="px-2 py-3 shrink-0 transition-opacity duration-100"
        disabled={!resetEnabled}
      >
        <span className={`text-base font-medium leading-5 ${resetEnabled ? "text-brand" : "text-[#a6abb7]"}`}>
          {resetLabel}
        </span>
      </button>
    </div>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────

export function FiltersScreen() {
  const router = useRouter();
  const { state, update, reset, savedFilters, saveFilter, deleteFilter, updateFilter } = useFilters();

  const [isLoading, setIsLoading] = useState(false);
  const [displayCount, setDisplayCount] = useState(() => calcCount(state));
  const isFirst = useRef(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("filters-scroll");
    if (saved && scrollRef.current) {
      scrollRef.current.scrollTop = parseInt(saved, 10);
    }
  }, []);

  const navigateTo = (path: string) => {
    if (scrollRef.current) {
      sessionStorage.setItem("filters-scroll", String(scrollRef.current.scrollTop));
    }
    router.push(path);
  };

  const [showSheet, setShowSheet] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [favoriteName, setFavoriteName] = useState("");
  const [activeFilterId, setActiveFilterId] = useState<string | "all" | null>(null);

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openSheet = () => {
    setShowSheet(true);
    requestAnimationFrame(() => setSheetVisible(true));
  };

  const closeSheet = () => {
    setSheetVisible(false);
    setTimeout(() => setShowSheet(false), 300);
  };

  const openToast = () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setShowToast(true);
    requestAnimationFrame(() => setToastVisible(true));
    toastTimer.current = setTimeout(() => {
      setToastVisible(false);
      setTimeout(() => setShowToast(false), 300);
    }, 3000);
  };

  const closeToast = () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastVisible(false);
    setTimeout(() => setShowToast(false), 300);
  };

  const openConfirm = (id: string) => {
    setConfirmDeleteId(id);
    requestAnimationFrame(() => setConfirmVisible(true));
  };

  const closeConfirm = () => {
    setConfirmVisible(false);
    setTimeout(() => setConfirmDeleteId(null), 200);
  };

  const handleConfirmDelete = () => {
    if (confirmDeleteId) {
      deleteFilter(confirmDeleteId);
      if (activeFilterId === confirmDeleteId) {
        setActiveFilterId(null);
        reset();
      }
    }
    closeConfirm();
  };

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setIsLoading(true);
    const t = setTimeout(() => {
      setIsLoading(false);
      setDisplayCount(calcCount(state));
    }, 800);
    return () => clearTimeout(t);
  }, [state]);

  const toggleCity = (city: string) => {
    if (state.cities.includes(city)) {
      const removedZones = CITY_TO_ZONES[city] ?? [];
      update({
        cities: state.cities.filter((c) => c !== city),
        techzones: state.techzones.filter((z) => !removedZones.includes(z)),
      });
    } else {
      update({ cities: [...state.cities, city] });
    }
  };

  const toggleModel = (model: string) =>
    update({
      models: state.models.includes(model)
        ? state.models.filter((m) => m !== model)
        : [...state.models, model],
    });

  const toggleBool = (
    key: "inLease" | "outOfCity" | "noGps" | "enabled" | "serviceMode"
  ) => update({ [key]: !state[key] });

  const hasAnyFilter =
    state.cities.length > 0 ||
    state.techzones.length > 0 ||
    state.models.length > 0 ||
    state.availabilityTab !== 0 ||
    state.inLease ||
    state.outOfCity ||
    state.noGps ||
    state.enabled ||
    state.serviceMode ||
    !!state.chargeValue ||
    !!state.idleValue ||
    !!state.offlineValue ||
    state.errors.length > 0 ||
    state.reasons.length > 0;

  const activeFilter =
    activeFilterId !== null && activeFilterId !== "all"
      ? savedFilters.find((f) => f.id === activeFilterId) ?? null
      : null;

  const isModifiedFromSaved =
    activeFilter !== null && !statesEqual(state, activeFilter.state);

  return (
    <div className="flex flex-col w-full h-dvh overflow-hidden">

      {/* Fixed header */}
      <div className="shrink-0 shadow-[0px_0px_8px_0px_rgba(33,41,51,0.15),0px_0px_2px_0px_rgba(33,41,51,0.16)]">
        <StatusBar />
        <TopAppBar
          onReset={activeFilter !== null ? () => openConfirm(activeFilter.id) : reset}
          resetEnabled={hasAnyFilter || activeFilter !== null}
          resetLabel={activeFilter !== null ? "Удалить" : "Сбросить"}
        />
      </div>

      {/* Scrollable content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-white">

        {/* Saved filters row */}
        {savedFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 px-4 py-3">
            {savedFilters.map((f) => {
              const isActive = activeFilterId === f.id;
              return (
                <div
                  key={f.id}
                  className={`flex items-center rounded-[12px] transition-colors duration-150 ${
                    isActive ? "bg-bg-inv pl-3 pr-1 py-1.5 gap-1" : "bg-bg-secondary px-3 py-1.5"
                  }`}
                >
                  <button
                    onClick={() => {
                      if (isActive) {
                        setActiveFilterId(null);
                        reset();
                      } else {
                        setActiveFilterId(f.id);
                        update(f.state);
                      }
                    }}
                    className={`text-base font-medium leading-5 ${isActive ? "text-white" : "text-text-primary"}`}
                  >
                    {f.name}
                  </button>
                  {isActive && (
                    <button
                      onClick={() => openConfirm(f.id)}
                      className="size-5 flex items-center justify-center shrink-0 active:opacity-60"
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5.5 5.5L14.5 14.5M14.5 5.5L5.5 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Локация / Техзоны / Модель */}
        <div className="pt-5 pb-5 flex flex-col">

          <div className="flex flex-col gap-3">
            <SectionHeader
              label="Локация"
              action="Все"
              onAction={() => navigateTo("/filters/locations")}
            />
            <div className="flex flex-wrap gap-2 px-4">
              {CITY_CHIPS.map((city) => (
                <Chip
                  key={city}
                  label={city}
                  selected={state.cities.includes(city)}
                  onClick={() => toggleCity(city)}
                />
              ))}
            </div>
          </div>

          <div className="h-8" />

          <div className="flex flex-col gap-3">
            <SectionHeader
              label="Техзоны"
              action="Все"
              onAction={() => navigateTo("/filters/techzone")}
            />
            <div className="px-4">
              <SelectorRow
                label={state.techzones.length > 0
                  ? state.techzones.join(", ")
                  : "Все"}
                count={state.techzones.length}
                onClick={() => navigateTo("/filters/techzone")}
              />
            </div>
          </div>

          <div className="h-8" />

          <div className="flex flex-col gap-3">
            <SectionHeader
              label="Модель транспорта"
              action="Все"
              onAction={() => navigateTo("/filters/model")}
            />
            <div className="flex flex-wrap gap-2 px-4">
              {MODEL_CHIPS.map((model) => (
                <Chip
                  key={model}
                  label={model}
                  selected={state.models.includes(model)}
                  onClick={() => toggleModel(model)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Доступность ТС */}
        <div className="h-5" />
        <div className="px-4">
          <h2 className="text-[18px] font-semibold leading-6 text-text-primary">
            Доступность ТС
          </h2>
        </div>
        <div className="h-4" />
        <div className="px-4">
          <SegmentedControl
            options={["Все", "В доступе", "Недоступные"]}
            activeIndex={state.availabilityTab}
            onSelect={(i) => update({ availabilityTab: i })}
            firstFlex
          />
        </div>
        <div className="h-2" />
        <div className="px-4">
          <div className="bg-bg-secondary rounded-[20px] px-4 py-2">
            {state.availabilityTab !== 1 && (
              <ParamRow
                label="Причины снятия"
                subtitle={state.reasons.length > 0 ? state.reasons.join(", ") : "Не выбрано"}
                right="chevron"
                onClick={() => navigateTo("/filters/reasons")}
                counter={state.reasons.length || undefined}
              />
            )}
            <ParamRow
              label="В аренде"
              right="toggle"
              toggleOn={state.inLease}
              onToggle={() => toggleBool("inLease")}
            />
            <ParamRow
              label="Вне города"
              right="toggle"
              toggleOn={state.outOfCity}
              onToggle={() => toggleBool("outOfCity")}
            />
            <ParamRow
              label="Процент заряда"
              subtitle={
                state.chargeValue
                  ? `${state.chargeDirection === "more" ? "Больше" : "Меньше"} ${state.chargeValue}%`
                  : "Не выбрано"
              }
              right="chevron"
              onClick={() => navigateTo("/filters/charge")}
            />
          </div>
        </div>

        {/* Состояние ТС */}
        <div className="h-8" />
        <div className="px-4">
          <h2 className="text-[18px] font-semibold leading-6 text-text-primary">
            Состояние ТС
          </h2>
        </div>
        <div className="h-3" />

        <StatusItem
          icon={<IconNetworkOff />}
          label="Не в сети"
          subtitle={state.offlineValue ? `${state.offlineDirection === "more" ? "Больше" : "Меньше"} ${hoursLabel(state.offlineValue)}` : "Не выбрано"}
          onClick={() => navigateTo("/filters/offline")}
        />
        <StatusItem
          icon={<IconClock />}
          label="Простой"
          subtitle={state.idleValue ? `${hoursLabel(state.idleValue)}${state.idleOnlyWithoutRent ? " • Без аренды" : ""}` : "Не выбрано"}
          onClick={() => navigateTo("/filters/idle")}
        />
        <StatusItem
          icon={<IconTriangleAlert />}
          label="Ошибки"
          subtitle={state.errors.length === 0 ? "Не выбрано" : undefined}
          counter={state.errors.length || undefined}
          onClick={() => navigateTo("/filters/errors")}
        />

        <div className="h-2" />
        <div className="px-4">
          <div className="bg-bg-secondary rounded-[20px] px-4 py-2">
            <ParamRow
              label="Нет GPS"
              right="toggle"
              toggleOn={state.noGps}
              onToggle={() => toggleBool("noGps")}
            />
            <ParamRow
              label="Включен"
              right="toggle"
              toggleOn={state.enabled}
              onToggle={() => toggleBool("enabled")}
            />
            <ParamRow
              label="Сервисный режим"
              right="toggle"
              toggleOn={state.serviceMode}
              onToggle={() => toggleBool("serviceMode")}
            />
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* Sticky footer */}
      <div className="shrink-0 px-4 pt-4 pb-4 flex flex-col gap-[10px]">
        {activeFilter !== null ? (
          isModifiedFromSaved && (
            <button
              onClick={() => { updateFilter(activeFilter.id, state); openToast(); }}
              className="flex items-center justify-center gap-2 h-12 w-full rounded-[16px] bg-bg-secondary active:bg-[#dde1ea] transition-colors duration-100"
            >
              <span className="text-[18px] font-medium leading-5 text-brand">
                Сохранить в фильтр
              </span>
            </button>
          )
        ) : (
          hasAnyFilter && (
            <button
              onClick={openSheet}
              className="flex items-center justify-center gap-2 h-12 w-full rounded-[16px] bg-bg-secondary active:bg-[#dde1ea] transition-colors duration-100"
            >
              <IconStar className="text-brand" />
              <span className="text-[18px] font-medium leading-5 text-brand">
                Добавить в избранное
              </span>
            </button>
          )
        )}
        <button className="flex items-center justify-center h-12 w-full rounded-[16px] bg-[#804aff] active:bg-[#6b3aff] transition-colors duration-100">
          {isLoading ? (
            <div className="size-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <span className="text-[18px] font-medium leading-5 text-white">
              Показать {taskLabel(displayCount)}
            </span>
          )}
        </button>
      </div>

      {/* Delete confirmation dialog */}
      {confirmDeleteId !== null && (
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center px-6 transition-opacity duration-200 ${confirmVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div onClick={closeConfirm} className="absolute inset-0 bg-black/30" />
          <div
            className={`relative bg-white rounded-[24px] w-full p-5 flex flex-col gap-4 shadow-[0px_0px_1.5px_0px_rgba(31,38,49,0.08),0px_2px_6.5px_0px_rgba(31,38,49,0.12)] transition-transform duration-200 ${confirmVisible ? "scale-100" : "scale-95"}`}
          >
            {/* Text */}
            <div className="flex flex-col items-center gap-1 text-center">
              <span className="text-[22px] font-semibold leading-8 text-text-primary">Удалить фильтр?</span>
              <span className="text-base font-normal leading-6 text-text-secondary">Выбранный фильтр<br />будет удалён</span>
            </div>
            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={closeConfirm}
                className="flex-1 h-12 rounded-[16px] bg-bg-secondary active:bg-[#dde1ea] flex items-center justify-center transition-colors duration-100"
              >
                <span className="text-[18px] font-medium leading-5 text-text-primary">Отмена</span>
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 h-12 rounded-[16px] bg-[#2e3643] active:bg-[#222b36] flex items-center justify-center transition-colors duration-100"
              >
                <span className="text-[18px] font-medium leading-5 text-white">Да</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div
          className={`fixed top-10 left-2 right-2 z-[80] flex items-center gap-3 bg-[#40a17e] rounded-[16px] px-4 h-12 transition-all duration-300 ${
            toastVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
          }`}
        >
          {/* Checkmark circle icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
            <path d="M8.5 12l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* Text */}
          <span className="flex-1 text-base font-medium leading-5 text-white">
            Изменения сохранены
          </span>
          {/* Close button */}
          <button onClick={closeToast} className="shrink-0 active:opacity-60">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Bottom Sheet — Добавить в избранное */}
      {showSheet && (
        <>
          {/* Overlay */}
          <div
            onClick={closeSheet}
            className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${sheetVisible ? "opacity-100" : "opacity-0"}`}
          />
          {/* Sheet */}
          <div
            className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[20px] shadow-[0px_0px_8px_0px_rgba(33,41,51,0.15),0px_0px_2px_0px_rgba(33,41,51,0.16)] transition-transform duration-300 ${sheetVisible ? "translate-y-0" : "translate-y-full"}`}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-8 rounded-full bg-[#a6abb7] opacity-40" />
            </div>

            {/* Title */}
            <div className="flex items-center h-[52px] px-4">
              <span className="text-[18px] font-medium leading-5 text-text-primary">
                Добавить в избранное
              </span>
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
              <input
                className="w-full border border-[#cfd3dc] rounded-[16px] px-3 py-3 text-base text-text-primary placeholder:text-[#6c7482] outline-none focus:border-brand transition-colors duration-150"
                placeholder="Введите название фильтра"
                value={favoriteName}
                onChange={(e) => setFavoriteName(e.target.value)}
              />
            </div>

            {/* Footer button */}
            <div className="px-4 pb-4">
              <button
                onClick={() => {
                  if (!favoriteName.trim()) return;
                  const id = saveFilter(favoriteName.trim(), state);
                  setActiveFilterId(id);
                  setFavoriteName("");
                  closeSheet();
                  openToast();
                }}
                className={`w-full h-12 rounded-[16px] transition-colors duration-100 flex items-center justify-center ${
                  favoriteName.trim()
                    ? "bg-[#804aff] active:bg-[#6b3aff]"
                    : "bg-bg-secondary"
                }`}
              >
                <span className={`text-[18px] font-medium leading-5 ${favoriteName.trim() ? "text-white" : "text-brand"}`}>
                  Сохранить в избранное
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
