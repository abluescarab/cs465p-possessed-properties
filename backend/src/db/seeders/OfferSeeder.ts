import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Offer } from "../entities/Offer.js";
import { LISTING_SEEDS } from "./ListingSeeder.js";
import { faker } from "@faker-js/faker";
import { USER_COUNT } from "./UserSeeder.js";

export class OfferSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    for (let i = 0; i < 100; i++) {
      const buyer = faker.number.int({ min: 1, max: USER_COUNT });
      const listing = faker.number.int({ min: 1, max: LISTING_SEEDS.length });
      const price = faker.number.int({
        min: 0,
        max: LISTING_SEEDS[listing - 1].price,
      });

      em.create(Offer, { buyer, listing, price });
    }
  }
}
