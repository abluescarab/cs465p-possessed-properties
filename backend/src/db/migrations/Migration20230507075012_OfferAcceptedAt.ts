import { Migration } from '@mikro-orm/migrations';

export class Migration20230507075012 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "offers" add column "accepted_at" timestamptz(0) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "offers" drop column "accepted_at";');
  }

}
