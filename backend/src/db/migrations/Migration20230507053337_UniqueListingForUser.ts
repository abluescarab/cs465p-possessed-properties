import { Migration } from '@mikro-orm/migrations';

export class Migration20230507053337 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "offers" drop constraint "offers_listing_id_foreign";');

    this.addSql('alter table "listings" drop constraint "listings_pkey";');
    this.addSql('alter table "listings" drop column "id";');
    this.addSql('alter table "listings" add constraint "listings_pkey" primary key ("owner_id", "name");');

    this.addSql('alter table "offers" add column "listing_name" varchar(255) not null;');
    this.addSql('alter table "offers" drop constraint "offers_pkey";');
    this.addSql('alter table "offers" drop column "id";');
    this.addSql('alter table "offers" rename column "listing_id" to "listing_owner_id";');
    this.addSql('alter table "offers" add constraint "offers_listing_owner_id_listing_name_foreign" foreign key ("listing_owner_id", "listing_name") references "listings" ("owner_id", "name") on update cascade;');
    this.addSql('alter table "offers" add constraint "offers_pkey" primary key ("buyer_id", "listing_owner_id", "listing_name");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "offers" drop constraint "offers_listing_owner_id_listing_name_foreign";');

    this.addSql('alter table "listings" add column "id" serial not null;');
    this.addSql('alter table "listings" drop constraint "listings_pkey";');
    this.addSql('alter table "listings" add constraint "listings_pkey" primary key ("id");');

    this.addSql('alter table "offers" add column "id" serial not null;');
    this.addSql('alter table "offers" drop constraint "offers_pkey";');
    this.addSql('alter table "offers" drop column "listing_name";');
    this.addSql('alter table "offers" rename column "listing_owner_id" to "listing_id";');
    this.addSql('alter table "offers" add constraint "offers_listing_id_foreign" foreign key ("listing_id") references "listings" ("id") on update cascade;');
    this.addSql('alter table "offers" add constraint "offers_pkey" primary key ("id");');
  }

}
