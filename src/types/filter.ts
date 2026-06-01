export interface FilterValue {
  id: string;
  label: string;
  selected?: boolean;
}

export interface FilterGroup {
  id: string;
  name: string;
  type: "multiselect" | "radio";
  values: FilterValue[];
}

export interface AppliedFilters {
  [filterId: string]: string[];
}
