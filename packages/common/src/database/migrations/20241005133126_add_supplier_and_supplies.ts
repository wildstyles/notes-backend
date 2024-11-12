import { Migration } from '@mikro-orm/migrations';

export class Migration20241005133126_add_supplier_and_supplies extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "suppliers" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "start_working_time" varchar(255) not null, "end_working_time" varchar(255) not null, constraint "suppliers_pkey" primary key ("id"));`,
    );

    this.addSql(
      `create table "supplies" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(255) not null, "price" numeric(10,0) not null, "supplier_id" uuid null, constraint "supplies_pkey" primary key ("id"));`,
    );

    this.addSql(
      `alter table "supplies" add constraint "supplies_supplier_id_foreign" foreign key ("supplier_id") references "suppliers" ("id") on update cascade on delete cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "supplies" drop constraint "supplies_supplier_id_foreign";`,
    );

    this.addSql(`drop table if exists "suppliers" cascade;`);

    this.addSql(`drop table if exists "supplies" cascade;`);
  }
}
