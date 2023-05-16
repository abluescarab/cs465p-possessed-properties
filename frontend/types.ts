// Copied from backend.
export type HauntingType =
  | "unknown"
  | "intelligent"
  | "residual"
  | "poltergeist"
  | "inhuman";

export type ListingType = {
  name: string;
  address: string;
  region: string;
  country: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  price: number;
  haunting_type: HauntingType;
};
