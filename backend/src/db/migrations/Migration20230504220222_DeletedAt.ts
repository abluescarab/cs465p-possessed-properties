import { Migration } from '@mikro-orm/migrations';

export class Migration20230504220222 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "listings" add column "deleted_at" timestamptz(0) null;');

    this.addSql('alter table "offers" add column "deleted_at" timestamptz(0) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "listings" drop column "deleted_at";');

    this.addSql('alter table "offers" drop column "deleted_at";');
  }

}
