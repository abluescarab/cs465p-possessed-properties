import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
} from "@mikro-orm/core";
import { Offer } from "./Offer.js";
import { BaseEntity } from "./BaseEntity.js";

@Entity()
export class Listing extends BaseEntity {
  /**
   * Person who posted the listing.
   */
  @Property()
  owner!: string;

  /**
   * Name of the property.
   */
  @Property()
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
  @Property()
  description!: string;

  /**
   * List price for purchases.
   */
  @Property()
  price!: number;

  /**
   * User-provided tags for sorting and searching for the listing.
   */
  @Property()
  tags!: Array<string>;

  /**
   * Offers placed on the property.
   */
  @OneToMany(() => Offer, (offer) => offer.listing, { cascade: [Cascade.ALL] })
  offers!: Collection<Offer>;

  /**
   * Whether the listing is open, i.e., the property has not been purchased.
   */
  @Property()
  open: boolean = true;

  // TODO: implement photo(s) field
}
