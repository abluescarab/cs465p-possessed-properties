import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import type { Rel } from "@mikro-orm/core";
import { User } from "./User.js";
import { Listing } from "./Listing.js";
import { BaseEntity } from "./BaseEntity.js";

@Entity({ tableName: "offers" })
export class Offer extends BaseEntity {
  /**
   * User who placed the offer.
   */
  @ManyToOne({ primary: true })
  buyer!: Rel<User>;

  /**
   * Listing the offer was placed on.
   */
  @ManyToOne({ primary: true })
  listing!: Rel<Listing>;

  /**
   * Price offered on the listing.
   */
  @Property()
  price!: number;
}
