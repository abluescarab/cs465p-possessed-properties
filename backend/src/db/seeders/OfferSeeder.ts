import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { Offer } from "../entities/Offer.js";

export class OfferSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Offer, {
      buyer: 2,
      listing: 1,
      price: 150000,
    });

    em.create(Offer, {
      buyer: 3,
      listing: 1,
      price: 200000,
    });
  }
}
