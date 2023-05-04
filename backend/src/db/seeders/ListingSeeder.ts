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

    em.create(Listing, {
      owner: 2,
      name: "Amityville Horror House",
      region: "New York",
      country: "United States",
      description:
        "The site of Ronald DeFeo Jr.'s grisly sextuple murder in 1974, this " +
        "gorgeous Dutch Colonial style home came to prominence when it was " +
        "featured in Jay Anson's 1977 book, The Amityville Horror. At a " +
        "spacious 3600 square feet, 5 bedrooms, and 4 bathrooms, this home " +
        "is perfect for students living together! Note: not recommended to " +
        "purchase this home if you have children, pets, or a lack of faith.",
      bedrooms: 5,
      bathrooms: 4,
      area: 3600,
      price: 984600,
    });
  }
}
