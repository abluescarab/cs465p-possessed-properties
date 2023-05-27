import { Migration } from '@mikro-orm/migrations';

export class Migration20230527124039 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "listings" rename column "img_uri" to "image_uri";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "listings" rename column "image_uri" to "img_uri";');
  }

}
