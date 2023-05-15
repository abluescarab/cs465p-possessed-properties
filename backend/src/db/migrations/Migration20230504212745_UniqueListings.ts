import { Migration } from '@mikro-orm/migrations';

export class Migration20230504212745 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "listings" alter column "description" type varchar(1000) using ("description"::varchar(1000));');
    this.addSql('alter table "listings" add constraint "listings_name_unique" unique ("name");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "listings" alter column "description" type varchar(255) using ("description"::varchar(255));');
    this.addSql('alter table "listings" drop constraint "listings_name_unique";');
  }

}
