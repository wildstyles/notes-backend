import { Migration } from '@mikro-orm/migrations';

export class Migration20241107124140_add_user extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "users" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "email" varchar(255) not null, "age" numeric(10,0) not null, "password" varchar(255) not null, constraint "users_pkey" primary key ("id"));`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "users" cascade;`);
  }
}
