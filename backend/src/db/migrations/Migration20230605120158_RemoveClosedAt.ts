import { Migration } from '@mikro-orm/migrations';

export class Migration20230605120158 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "offers" drop column "closed_at";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "offers" add column "closed_at" timestamptz(0) null;');
  }

}
