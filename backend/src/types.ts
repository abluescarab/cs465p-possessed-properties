export interface IUserRouteData {
  email: string;
  name: string;
}

export interface IListingRouteData {
  owner: string;
  name?: string;
  address?: string;
  region?: string;
  country?: string;
  description?: string;
  price?: number;
  tags?: Array<string>;
}
