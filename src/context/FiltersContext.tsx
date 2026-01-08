import { createContext, type JSX, useContext, useState } from 'react';
import type { SelectItem } from '../components/select/Select.tsx';
import {
  type FilterState,
  priorityOptions,
  statusOptions,
} from '../data/filters.ts';

export interface FiltersContextType {
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: SelectItem[]) => void;
  resetFilters: () => void;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export default function FiltersProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [filters, setFilters] = useState<FilterState>({
    status: statusOptions,
    priority: priorityOptions,
    sortOrder: [{ value: 'asc', label: 'ASC' }],
  });

  const setFilter = (key: keyof FilterState, value: SelectItem[]) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () =>
    setFilters({ status: [], priority: [], sortOrder: [] });

  return (
    <>
      <FiltersContext.Provider value={{ filters, setFilter, resetFilters }}>
        {children}
      </FiltersContext.Provider>
    </>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFilters = () => {
  return useContext(FiltersContext);
};
