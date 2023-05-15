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
      address: "108 Ocean Ave, Amityville",
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

    em.create(Listing, {
      owner: 3,
      name: "Winchester Mystery House",
      address: "525 S Winchester Blvd, San Jose",
      region: "California",
      country: "United States",
      description:
        "This sprawling, winding property belonged to the wife of firearms " +
        "tycoon William Winchester, Sarah Winchester. Rumor has it that Sarah " +
        "continued adding to the house for almost 40 years due to her belief " +
        "that if she stopped building, she would die. With a gorgeous " +
        "Victorian Gothic style, this property is recommended for only the " +
        "most courageous buyer. Note that those with vision difficulties may " +
        "find it impossible to navigate the house.",
      bedrooms: 40,
      bathrooms: 13,
      area: 24000,
      price: 50000000,
    });

    em.create(Listing, {
      owner: 4,
      name: "Lizzie Borden House",
      address: "230 Second St., Fall River",
      region: "Massachusetts",
      country: "United States",
      description:
        "Lizzie Borden took an axe...or did she? Welcome to the ORIGINAL house " +
        "where Lizzie Borden was accused (and acquitted) of the brutal double " +
        "axe murders of her father, Andrew, and stepmother, Abby, that occured " +
        "on that warm summer day of August 4th,1892. This is an unbelivable " +
        "opportunity to own and operate one of New Englands top tourist " +
        "attractions. Entertain visitors from all over the world. This is a " +
        "turnkey operation, running lucrative day tours and evening events, " +
        "and as a popular bed and breakfast destination. Picture yourself " +
        "serving fun hatchet cookies, tiny johnny cakes and a scrumptious " +
        "breakfast to overnight guests who have just enjoyed an experience of " +
        "a lifetime! Owners retirement is your gain! Sale includes business, " +
        "trademarks, intellectual rights, and property. Can also be purchased " +
        'with the Victorian mansion, "Maplecroft", where Lizzie lived the rest ' +
        "of her life after she was acquitted. (Description taken from official " +
        "sale listing.)",
      bedrooms: 6,
      bathrooms: 3.5,
      area: 4463,
      price: 1875000,
    });

    em.create(Listing, {
      owner: 5,
      name: "Pittock Mansion",
      address: "3229 NW Pittock Dr., Portland",
      region: "Oregon",
      country: "United States",
      description:
        "This majestic French Renaissance-style château was built in 1914 for " +
        "Oregonian publisher Henry Pittock and his wife Georgiana Burton " +
        "Pittock. Unfortunately, Georgiana died four years later at the age of " +
        "72 and Henry a year after at 84. However, the Pittocks were not so " +
        "easily parted from their property; it is said to this day that the " +
        "smell of roses fills rooms with no flowers and that a portrait of " +
        "Henry moves around of its own accord. Ghostly shoveling sounds, " +
        "unexplained footsteps, slamming windows, moving furniture, and " +
        "even the specter of a woman in a long gown are also reported to haunt " +
        "this property.",
      bedrooms: 9,
      bathrooms: 6,
      area: 16000,
      price: 2500000,
    });
  }
}
