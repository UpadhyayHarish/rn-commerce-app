import { useState, useCallback } from "react";
import { AppliedFilters } from "../types/filter";

export const useFilters = () => {
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});

  const updateFilters = useCallback((filters: AppliedFilters) => {
    setAppliedFilters(filters);
  }, []);

  const clearFilters = useCallback(() => {
    setAppliedFilters({});
  }, []);

  return {
    appliedFilters,
    updateFilters,
    clearFilters,
  };
};
