import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  Unique,
} from "@mikro-orm/core";
import type { Rel } from "@mikro-orm/core";
import { Offer } from "./Offer.js";
import { BaseEntity } from "./BaseEntity.js";
import { User } from "./User.js";

@Entity({ tableName: "listings" })
export class Listing extends BaseEntity {
  /**
   * Person who posted the listing.
   */
  @ManyToOne()
  owner!: Rel<User>;

  /**
   * Name of the property.
   */
  @Property()
  @Unique()
  name!: string;

  /**
   * Specific street address, if applicable.
   */
  @Property()
  address?: string;

  /**
   * Region where the property is found, e.g., Transylvania or Oregon. Acts a
   * category for breadcrumbs.
   */
  @Property()
  region!: string;

  /**
   * Country where the property is found. Acts a category for breadcrumbs.
   */
  @Property()
  country!: string;

  /**
   * Description of the property.
   */
  @Property({ length: 1000 })
  description!: string;

  /**
   * The number of bedrooms on the property.
   */
  @Property()
  bedrooms!: number;

  /**
   * The number of bathrooms on the property.
   */
  @Property()
  bathrooms!: number;

  /**
   * The square footage (area) of the property.
   */
  @Property()
  area!: number;

  /**
   * List price for purchasing.
   */
  @Property()
  price!: number;

  /**
   * When the property was purchased and the listing closed.
   */
  @Property()
  purchased_at?: Date = null;

  /**
   * Who purchased the property and closed the listing.
   */
  @ManyToOne()
  purchased_by?: Rel<User>;

  /**
   * Offers placed on the property.
   */
  @OneToMany(() => Offer, (offer) => offer.listing, { cascade: [Cascade.ALL] })
  offers!: Collection<Offer>;

  // TODO: implement photo(s) field
}
