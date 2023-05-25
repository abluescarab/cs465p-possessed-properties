import { Migration } from '@mikro-orm/migrations';

export class Migration20230525052956 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "listings" add column "haunting_type" varchar(255) not null;');

    this.addSql('alter table "offers" add column "status" varchar(255) null default \'open\';');
    this.addSql('alter table "offers" rename column "accepted_at" to "closed_at";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "listings" drop column "haunting_type";');

    this.addSql('alter table "offers" drop column "status";');
    this.addSql('alter table "offers" rename column "closed_at" to "accepted_at";');
  }

}
