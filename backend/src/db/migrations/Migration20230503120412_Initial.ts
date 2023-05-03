import { Migration } from '@mikro-orm/migrations';

export class Migration20230503120412 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" varchar(255) not null, "name" varchar(255) not null, "deleted_at" timestamptz(0) null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "listings" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "owner_id" int not null, "name" varchar(255) not null, "address" varchar(255) null, "region" varchar(255) not null, "country" varchar(255) not null, "description" varchar(255) not null, "price" int not null, "tags" text[] not null, "purchased_at" timestamptz(0) not null, "purchased_by_id" int null);');

    this.addSql('create table "offers" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "buyer_id" int not null, "listing_id" int not null, "price" int not null);');

    this.addSql('alter table "listings" add constraint "listings_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "listings" add constraint "listings_purchased_by_id_foreign" foreign key ("purchased_by_id") references "users" ("id") on update cascade on delete set null;');

    this.addSql('alter table "offers" add constraint "offers_buyer_id_foreign" foreign key ("buyer_id") references "users" ("id") on update cascade;');
    this.addSql('alter table "offers" add constraint "offers_listing_id_foreign" foreign key ("listing_id") references "listings" ("id") on update cascade;');
  }

}
