import { Migration } from '@mikro-orm/migrations';

export class Migration20230526001051 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "listings" add column "img_uri" varchar(255) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "listings" drop column "img_uri";');
  }

}
