/**
 * Used to create and modify a {@link User}.
 */
export interface IUserRouteData {
  email: string;
  name: string;
}

/**
 * The current status of an {@link Offer}.
 */
export enum OfferStatus {
  /**
   * The offer is still open.
   */
  OPEN,
  /**
   * The offer was closed by the offer creator.
   */
  CLOSED,
  /**
   * The offer was accepted by the listing owner.
   */
  ACCEPTED,
  /**
   * The offer was rejected by the listing owner.
   */
  REJECTED,
}
