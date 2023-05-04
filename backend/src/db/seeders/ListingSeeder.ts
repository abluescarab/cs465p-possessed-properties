import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Listing } from "../entities/Listing.js";

export class ListingSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Listing, {
      owner: 1,
      name: "Dracula's Castle",
      region: "Transylvania",
      country: "Romania",
      description:
        "This picturesque castle is over 600 years old and rests " +
        "in the hills near Bran, Romania. Though it is marketed as the " +
        "fictional Dracula’s home, the castle itself contains plenty of " +
        "other spooks and scares for the discerning homeowner. Buy now!",
      bedrooms: 20,
      bathrooms: 15.5,
      area: 15000,
      price: 250000000,
    });
  }
}
