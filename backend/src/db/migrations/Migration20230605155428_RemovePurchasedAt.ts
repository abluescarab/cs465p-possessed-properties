import { Migration } from '@mikro-orm/migrations';

export class Migration20230605155428 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "listings" drop column "purchased_at";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "listings" add column "purchased_at" timestamptz(0) null;');
  }

}
