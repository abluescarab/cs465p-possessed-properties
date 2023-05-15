import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Offer } from "../entities/Offer.js";

export class OfferSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Offer, {
      buyer: 3,
      listing: 1,
      price: 240000000,
    });

    em.create(Offer, {
      buyer: 4,
      listing: 2,
      price: 950000,
    });
  }
}
