import { EntityManager } from "@mikro-orm/postgresql";
import { Seeder } from "@mikro-orm/seeder";
import { User } from "../entities/User.js";

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(User, {
      email: "email0@email.com",
      name: "John Smith",
    });

    em.create(User, {
      email: "email1@email.com",
      name: "Jane Smith",
    });

    em.create(User, {
      email: "email2@email.com",
      name: "John Doe",
    });

    em.create(User, {
      email: "email3@email.com",
      name: "Jane Doe",
    });
  }
}
