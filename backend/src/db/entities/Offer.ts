import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { User } from "./User.js";
import { Listing } from "./Listing.js";
import { BaseEntity } from "./BaseEntity.js";

@Entity()
export class Offer extends BaseEntity {
  /**
   * User who placed an offer.
   */
  @ManyToOne()
  owner!: User;

  /**
   * Listing an offer was placed for.
   */
  @ManyToOne()
  listing!: Listing;

  /**
   * Price offered on the listing.
   */
  @Property()
  price!: number;
}
