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
import { ProjectBaseEntity } from "./ProjectBaseEntity.js";

@Entity({ tableName: "users" })
export class User extends ProjectBaseEntity {
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
  listings!: Collection<Listing>;

  /**
   * Offers made by the user on other properties.
   */
  @OneToMany(() => Offer, (offer) => offer.buyer, { cascade: [Cascade.ALL] })
  offers!: Collection<Offer>;

  /**
   * Properties purchased on the platform.
   */
  @OneToMany(() => Listing, (listing) => listing.purchasedBy, {
    cascade: [Cascade.ALL],
  })
  purchases!: Collection<Listing>;
}
