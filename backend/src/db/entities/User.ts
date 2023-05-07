import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from "@mikro-orm/core";
import { Listing } from "./Listing.js";
import { Offer } from "./Offer.js";
import { BaseEntity } from "./BaseEntity.js";

@Entity({ tableName: "users" })
export class User extends BaseEntity {
  /**
   * Unique email address which acts as a login username.
   */
  @Property()
  @Unique()
  email!: string;

  /**
   * Name of the user.
   */
  @Property()
  name!: string;

  /**
   * Listings created by the user.
   */
  @OneToMany(() => Listing, (listing) => listing.owner, {
    cascade: [Cascade.ALL],
  })
  created_listings!: Collection<Listing>;

  /**
   * Offers made by the user on other properties.
   */
  @OneToMany(() => Offer, (offer) => offer.buyer, { cascade: [Cascade.ALL] })
  created_offers!: Collection<Offer>;

  /**
   * Properties purchased on the platform.
   */
  @OneToMany(() => Listing, (listing) => listing.purchased_by, {
    cascade: [Cascade.ALL],
  })
  purchased_properties!: Collection<Listing>;
}
