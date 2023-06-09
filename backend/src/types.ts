export const OfferStatusStrings = ["open", "cancelled", "accepted", "rejected"];

/**
 * The current status of an {@link Offer}.
 *
 * <em>open</em>: The offer is still open.
 *
 * <em>cancelled</em>: The offer was cancelled by the buyer.
 *
 * <em>accepted</em>: The offer was accepted by the listing owner.
 *
 * <em>rejected</em>: The offer was rejected by the listing owner.
 */
export type OfferStatus = (typeof OfferStatusStrings)[number];

/**
 * <em>unknown</em>: Usually reserved for locations with multiple hauntings or
 * a property that is not haunted but has a terrible history or is surrounded
 * by haunted locations.
 *
 * <em>intelligent</em>: These spirits can communicate with the living and tend
 * to be friendly.
 *
 * <em>residual</em>: A spirit that repeats a tragic moment of their life over
 * and over. They possess no awareness of the living or their own death.
 *
 * <em>poltergeist</em>: A potentially dangerous spirit that can interact with
 * the living by knocking on walls, moving furniture, throwing objects, and
 * eventually appearing as full-blown apparitions.
 *
 * <em>inhuman</em>: Range from animal spirits to elemental creatures to demonic
 * activity. Gnomes, banshees, fairies, and other legendary creatures
 * fall under this umbrella.
 */
export type HauntingType =
  | "unknown"
  | "intelligent"
  | "residual"
  | "poltergeist"
  | "inhuman";
