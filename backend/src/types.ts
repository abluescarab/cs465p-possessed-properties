export interface IUserRouteData {
  email: string;
  name: string;
}

export interface IListingRouteData {
  email?: string;
  name?: string;
  address?: string;
  region?: string;
  country?: string;
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  price?: number;
}
