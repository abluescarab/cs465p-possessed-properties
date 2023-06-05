// Copied from backend.
export type HauntingType =
  | "unknown"
  | "intelligent"
  | "residual"
  | "poltergeist"
  | "inhuman";

export type ListingType = {
  id: number;
  name: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUri: string;
  deletedAt: string;
  purchasedAt: string;
};
