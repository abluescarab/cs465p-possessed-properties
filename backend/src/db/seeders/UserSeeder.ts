import { EntityManager } from "@mikro-orm/postgresql";
import { Seeder } from "@mikro-orm/seeder";
import { User } from "../entities/User.js";
import { faker } from "@faker-js/faker";

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(User, {
      email: "email@email.com",
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    });

    for (let i = 0; i < 9; i++) {
      const first = faker.person.firstName();
      const last = faker.person.lastName();

      em.create(User, {
        email: `email${i}@email.com`,
        name: `${first} ${last}`,
      });
    }
  }
}
