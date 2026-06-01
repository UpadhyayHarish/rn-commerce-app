import { FilterGroup } from "../types/filter";

export const mockFilters: FilterGroup[] = [
  {
    id: "category",
    name: "Category",
    type: "radio",
    values: [
      { id: "electronics", label: "Electronics" },
      { id: "clothing", label: "Clothing" },
      { id: "accessories", label: "Accessories" },
      { id: "home", label: "Home & Garden" },
      { id: "sports", label: "Sports" },
    ],
  },
  {
    id: "material",
    name: "Material",
    type: "multiselect",
    values: [
      { id: "cotton", label: "Cotton" },
      { id: "polyester", label: "Polyester" },
      { id: "wool", label: "Wool" },
      { id: "silk", label: "Silk" },
      { id: "leather", label: "Leather" },
    ],
  },
  {
    id: "color",
    name: "Color",
    type: "multiselect",
    values: [
      { id: "black", label: "Black" },
      { id: "white", label: "White" },
      { id: "red", label: "Red" },
      { id: "blue", label: "Blue" },
      { id: "green", label: "Green" },
      { id: "yellow", label: "Yellow" },
    ],
  },
  {
    id: "size",
    name: "Size",
    type: "multiselect",
    values: [
      { id: "xs", label: "XS" },
      { id: "s", label: "S" },
      { id: "m", label: "M" },
      { id: "l", label: "L" },
      { id: "xl", label: "XL" },
      { id: "xxl", label: "XXL" },
    ],
  },
];
