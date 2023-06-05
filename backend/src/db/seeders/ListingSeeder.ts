import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Listing } from "../entities/Listing.js";
import { HauntingType } from "../../types.js";

export const LISTING_SEEDS = [
  {
    owner: 1,
    name: "Dracula's Castle",
    region: "Transylvania",
    country: "Romania",
    description:
      "This picturesque castle is over 600 years old and rests " +
      "in the hills near Bran, Romania. Though it is marketed as the " +
      "fictional Dracula’s home, the castle itself and the surrounding " +
      "countryside contains plenty of other spooks and scares for the " +
      "discerning homeowner. Buy now!",
    bedrooms: 20,
    bathrooms: 15.5,
    area: 15000,
    price: 250000000,
    hauntingType: "unknown",
    imageUri: "draculas-castle.jpg",
  },
  {
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
    hauntingType: "inhuman",
    imageUri: "amityville-horror-house.jpg",
  },
  {
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
    hauntingType: "intelligent",
    imageUri: "winchester-mystery-house.jpg",
  },
  {
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
    hauntingType: "unknown",
    imageUri: "lizzie-borden-house.jpg",
  },
  {
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
    hauntingType: "intelligent",
    imageUri: "pittock-mansion.jpg",
  },
  {
    owner: 6,
    name: "Lalaurie Mansion",
    address: "1140 Royal St, New Orleans",
    region: "Louisiana",
    country: "United States",
    description:
      "Built in 1831, this charming cornerstone of Louisiana history boasts " +
      "10,284 square feet of haunted home living! 6 bedrooms and 7 bathrooms " +
      "provide ample space to raise a family, move in your in-laws, and hide " +
      "from the ghostly apparitions of Delphine MacCarthy Lalaurie. Lalaurie " +
      "enslaved and tortured many people in this house, before fleeing in " +
      "'34 after a fire broke out on the property. Luckily, after some " +
      "restoration, this manor is ready to go and become the creepy " +
      "exploitative bed and breakfast of your dreams!",
    bedrooms: 6,
    bathrooms: 7,
    area: 10284,
    price: 3550000,
    hauntingType: "unknown",
    imageUri: "lalaurie-mansion.jpg",
  },
  {
    owner: 7,
    name: "The Castle",
    address: "411 Craven Street, Beaufort",
    region: "South Carolina",
    country: "United States",
    description:
      "A surviving structure of South Carolina's battles, this property was " +
      "used as a hospital for injured and dying soldiers. These militant " +
      "apparitions serve as a permanent audience for the famous Gauche- A " +
      "phantom jester, who has haunted the area since well before the " +
      "house's construction in the late 1850s. Snap up your new ghostly " +
      "roommates (and this 7932 sq ft, 5 bed/6 bath home) today!",
    bedrooms: 5,
    bathrooms: 6,
    area: 7932,
    price: 4050000,
    hauntingType: "unknown",
    imageUri: "the-castle.jpg",
  },
  {
    owner: 8,
    name: "The House of Death",
    address: "14 W 10th St, New York",
    region: "New York",
    country: "United States",
    description:
      "This large estate has been converted into a series of apartments! " +
      "Make a ghoulish amount of money renting out apartments in The Big " +
      "Apple. Supernatural seekers and thrill finders will love the odd " +
      "occurances and rumored curses that befall the residents. You deal " +
      "with the deed. They deal with the dead. Win-win!",
    bedrooms: 6,
    bathrooms: 5,
    area: 4750,
    price: 4373000,
    hauntingType: "unknown",
    imageUri: "the-house-of-death.jpg",
  },
  {
    owner: 9,
    name: "Molly Brown House",
    address: "1340 N Pennsylvania St, Denver",
    region: "Colorado",
    country: "United States",
    description:
      "This quaint house has been restored and turned into a museum " +
      "dedicated to the Unsinkable Molly Brown. Periodic reports of a " +
      "disappearing friendly woman indicate this is a more passive " +
      "haunting- With less risk of bodily harm, insanity, ancient curses, " +
      "bleeding walls, or possession! Make a buck, or turn it back into a " +
      "residential home. 2 beds, 2 baths, and 1300 sq ft make this one of " +
      "the smaller (and cheaper) spooky entries on this website.",
    bedrooms: 2,
    bathrooms: 2,
    area: 1328,
    price: 450000,
    hauntingType: "intelligent",
    imageUri: "molly-brown-house.jpg",
  },
  {
    owner: 10,
    name: "Sallie House",
    address: "508 N 2nd St, Atchison",
    region: "Kansas",
    country: "United States",
    description:
      "This 3 bed, one-and-a-half bath house serves as a portal between the " +
      "mortal and spirit realms. All sorts of paranormal activites have been " +
      "reported, ranging from harmless to hair-raising. Made famous by the " +
      "ghost Sallie, who died from a failed appendectomy at 6 years old, it " +
      "has gained world-wide reknown. This would be a lovely haven for a " +
      "lesbian couple, as Sallie does not like men.",
    bedrooms: 3,
    bathrooms: 1.5,
    area: 1464,
    price: 400000,
    hauntingType: "unknown",
    imageUri: "sallie-house.jpg",
  },
  {
    owner: 1,
    name: "Snedeker House",
    address: "208 Meriden Ave, Southington",
    region: "Connecticut",
    country: "United States",
    description:
      "After the former residents moved, paranormal activities have " +
      "DEFINITELY ceased. This 3000 sq ft house SHOULD be free of evil " +
      "spirits and malicious nightmares... free to whoever is willing to " +
      "risk it.",
    bedrooms: 5,
    bathrooms: 2,
    area: 3084,
    price: 0,
    hauntingType: "poltergeist",
    imageUri: "snedeker-house.jpg",
  },
  {
    owner: 2,
    name: "Monte Cristo Homestead",
    address: "1 Homestead Lane, Junee",
    region: "New South Wales",
    country: "Australia",
    description:
      "This homestead is a package deal with two buildings. A cabin and a " +
      "manor share an expanse of land, providing an excellent opportunity " +
      "for families looking for an additional dwelling unit. Excusing the " +
      "occasional ghostly harassment, this colorful property could serve " +
      "all your storage and baby-raising needs!",
    bedrooms: 5,
    bathrooms: 4,
    area: 3200,
    price: 750000,
    hauntingType: "unknown",
    imageUri: "monte-cristo-homestead.jpg",
  },
  {
    owner: 3,
    name: "Hull House",
    address: "800 S Halsted, Chicago",
    region: "Illinois",
    country: "United States",
    description:
      "Stories of the weird and macabre stem from this complex's origins as " +
      "a home for wayward women and children. Nestled on the outskirts of " +
      "University of Illinois Chicago's campus, this is a glorious " +
      "opportunity for student housing! Students will love sharing the scary " +
      "scenarios they encounter while living in communal housing with their " +
      "friends.",
    bedrooms: 22,
    bathrooms: 8,
    area: 14000,
    price: 550000,
    hauntingType: "unknown",
    imageUri: "hull-house.jpg",
  },
  {
    owner: 4,
    name: "Dudley House",
    address: "197 North Ashwood Avenue, Ventura",
    region: "California",
    country: "United States",
    description:
      'The "faulty wiring" in this old farmhouse may cause some odd ' +
      "occurances in the kitchen. No murder or mayhem here. 4 bedrooms, " +
      "2 bathrooms, and 1566 square feet of familial bliss, blessed by the " +
      "ancestors of the original Dudley family.",
    bedrooms: 4,
    bathrooms: 2,
    area: 1566,
    price: 457000,
    hauntingType: "unknown",
    imageUri: "dudley-house.jpg",
  },
  {
    owner: 5,
    name: "Hallahan Funeral Home",
    address: "208 Meriden Ave, Southington",
    region: "Connecticut",
    country: "United States",
    description:
      "After the deceased were removed, a family moved in. This DEFINITELY " +
      "did not result in a pocket dimension, complete with additional " +
      "timeloop. This 3000 sq ft house is COMPLETELY FILLED with evil spirits " +
      "and malicious nightmares... free to whoever is willing to risk it.",
    bedrooms: 5,
    bathrooms: 2,
    area: 3084,
    price: 0,
    hauntingType: "poltergeist",
    imageUri: "hallahan-funeral-home.jpg",
  },
  {
    owner: 6,
    name: "Villisca Axe Murder House",
    address: "508 East 2nd Street, Villisca",
    region: "Iowa",
    country: "United States",
    description:
      "Don't let the cold case murder spree attached to this house's " +
      "history deter you from this adorable cottage-inspired abode! The 8 " +
      "victims, 6 of which were children, were given proper funerals. May " +
      "they rest in peace, and you rest your head in this 3 bed, 2 bath " +
      "slice of Iowa heaven.",
    bedrooms: 3,
    bathrooms: 2,
    area: 1475,
    price: 375000,
    hauntingType: "residual",
    imageUri: "villisca-axe-murder-house.jpg",
  },
];

export class ListingSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    for (const listing of LISTING_SEEDS) {
      em.create(Listing, {
        owner: listing.owner,
        name: listing.name,
        address: listing.address,
        region: listing.region,
        country: listing.country,
        description: listing.description,
        bedrooms: listing.bedrooms,
        bathrooms: listing.bathrooms,
        area: listing.area,
        price: listing.price,
        hauntingType: listing.hauntingType as HauntingType,
        imageUri: listing.imageUri,
      });
    }
  }
}
