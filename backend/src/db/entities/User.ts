import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity.js";
import { Listing } from "./Listing.js";
import { Offer } from "./Offer.js";

/* Data needed:
 * - bids
 * - purchases
 * - favorites?
 */

@Entity({ tableName: "users" })
export class User extends BaseEntity {
  @Property()
  @Unique()
  email!: string;

  @Property()
  name!: string;

  @OneToMany(() => Listing, (listing) => listing.owner, {
    cascade: [Cascade.ALL],
  })
  created_listings!: Collection<Listing>;

  @OneToMany(() => Offer, (offer) => offer.owner, { cascade: [Cascade.ALL] })
  created_offers!: Collection<Offer>;
}
