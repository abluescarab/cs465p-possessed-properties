import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import type { Rel } from "@mikro-orm/core";
import { User } from "./User.js";
import { Listing } from "./Listing.js";
import { ProjectBaseEntity } from "./ProjectBaseEntity.js";
import { OfferStatus } from "../../types.js";

@Entity({ tableName: "offers" })
export class Offer extends ProjectBaseEntity {
  /**
   * User who placed the offer.
   */
  @ManyToOne()
  buyer!: Rel<User>;

  /**
   * Listing the offer was placed on.
   */
  @ManyToOne()
  listing!: Rel<Listing>;

  /**
   * Price offered on the listing.
   */
  @Property()
  price!: number;

  /**
   * The current status of the offer.
   * @see {@link OfferStatus} for available statuses.
   */
  @Property()
  status?: OfferStatus = OfferStatus.OPEN;

  /**
   * When the offer was closed, i.e., has any {@link OfferStatus} other than open.
   */
  @Property()
  closed_at?: Date = null;
}
