"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface FiltersState {
  cities: string[];
  techzones: string[];
  models: string[];
  availabilityTab: number;
  inLease: boolean;
  outOfCity: boolean;
  noGps: boolean;
  enabled: boolean;
  serviceMode: boolean;
  chargeValue: string;
  chargeDirection: "more" | "less";
  idleValue: string;
  idleOnlyWithoutRent: boolean;
  offlineValue: string;
  offlineDirection: "more" | "less";
  errors: string[];
  reasons: string[];
}

export interface SavedFilter {
  id: string;
  name: string;
  state: FiltersState;
}

const INITIAL: FiltersState = {
  cities: [],
  techzones: [],
  models: [],
  availabilityTab: 0,
  inLease: false,
  outOfCity: false,
  noGps: false,
  enabled: false,
  serviceMode: false,
  chargeValue: "",
  chargeDirection: "more",
  idleValue: "",
  idleOnlyWithoutRent: true,
  offlineValue: "",
  offlineDirection: "more",
  errors: [],
  reasons: [],
};

interface FiltersCtx {
  state: FiltersState;
  update: (partial: Partial<FiltersState>) => void;
  reset: () => void;
  savedFilters: SavedFilter[];
  saveFilter: (name: string, state: FiltersState) => string;
  deleteFilter: (id: string) => void;
  updateFilter: (id: string, state: FiltersState) => void;
}

const FiltersContext = createContext<FiltersCtx | null>(null);

export function FiltersProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FiltersState>(INITIAL);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);

  const update = (partial: Partial<FiltersState>) =>
    setState((s) => ({ ...s, ...partial }));

  const reset = () => setState(INITIAL);

  const saveFilter = (name: string, filterState: FiltersState): string => {
    const id = `${Date.now()}`;
    setSavedFilters((prev) => [...prev, { id, name, state: filterState }]);
    return id;
  };

  const deleteFilter = (id: string) =>
    setSavedFilters((prev) => prev.filter((f) => f.id !== id));

  const updateFilter = (id: string, filterState: FiltersState) =>
    setSavedFilters((prev) =>
      prev.map((f) => (f.id === id ? { ...f, state: filterState } : f))
    );

  return (
    <FiltersContext.Provider value={{ state, update, reset, savedFilters, saveFilter, deleteFilter, updateFilter }}>
      {children}
    </FiltersContext.Provider>
  );
}

export function useFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFilters must be inside FiltersProvider");
  return ctx;
}
