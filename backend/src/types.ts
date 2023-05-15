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

export enum HauntingType {
  /**
   * An unknown haunting type. This is usually reserved for locations with
   * multiple hauntings or a property that is not itself haunted but has a
   * terrible history or is surrounded by haunted locations.
   */
  UNKNOWN,
  /**
   * An intelligent haunting. These spirits can communicate with the living and
   * tend to be friendly.
   */
  INTELLIGENT,
  /**
   * A residual spirit is one that repeats a tragic moment of their life over
   * and over. They possess no awareness of the living or their own death.
   */
  RESIDUAL,
  /**
   * German for "noisy ghost," a poltergeist is a potentially dangerous spirit
   * that can interact with the living by knocking on walls, moving furniture,
   * throwing objects, and eventually appearing as full-blown apparitions.
   */
  POLTERGEIST,
  /**
   * Inhuman hauntings range from animal spirits to elemental creatures to
   * demonic activity. Gnomes, banshees, fairies, and other legendary creatures
   * fall under this umbrella.
   */
  INHUMAN,
}
