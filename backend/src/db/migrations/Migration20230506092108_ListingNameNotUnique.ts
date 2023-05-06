import { Migration } from '@mikro-orm/migrations';

export class Migration20230506092108 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "listings" drop constraint "listings_name_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "listings" add constraint "listings_name_unique" unique ("name");');
  }

}
