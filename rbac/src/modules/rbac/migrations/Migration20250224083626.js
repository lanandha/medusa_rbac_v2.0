"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20250224083626 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250224083626 extends migrations_1.Migration {
    async up() {
        this.addSql(`create table if not exists "rbac_permission_category" ("id" text not null, "name" text not null, "type" text check ("type" in ('predefined', 'custom')) not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "rbac_permission_category_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_rbac_permission_category_deleted_at" ON "rbac_permission_category" (deleted_at) WHERE deleted_at IS NULL;`);
        this.addSql(`create table if not exists "rbac_permission" ("id" text not null, "name" text not null, "type" text check ("type" in ('predefined', 'custom')) not null, "matcherType" text check ("matcherType" in ('api')) not null, "matcher" text not null, "actionType" text check ("actionType" in ('read', 'write', 'delete')) not null, "category_id" text null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "rbac_permission_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_rbac_permission_category_id" ON "rbac_permission" (category_id) WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_rbac_permission_deleted_at" ON "rbac_permission" (deleted_at) WHERE deleted_at IS NULL;`);
        this.addSql(`create table if not exists "rbac_role" ("id" text not null, "name" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "rbac_role_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_rbac_role_deleted_at" ON "rbac_role" (deleted_at) WHERE deleted_at IS NULL;`);
        this.addSql(`create table if not exists "rbac_policy" ("id" text not null, "type" text check ("type" in ('deny', 'allow')) not null, "permission_id" text not null, "role_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "rbac_policy_pkey" primary key ("id"));`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_rbac_policy_permission_id" ON "rbac_policy" (permission_id) WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_rbac_policy_role_id" ON "rbac_policy" (role_id) WHERE deleted_at IS NULL;`);
        this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_rbac_policy_deleted_at" ON "rbac_policy" (deleted_at) WHERE deleted_at IS NULL;`);
        this.addSql(`alter table if exists "rbac_permission" add constraint "rbac_permission_category_id_foreign" foreign key ("category_id") references "rbac_permission_category" ("id") on update cascade on delete cascade;`);
        this.addSql(`alter table if exists "rbac_policy" add constraint "rbac_policy_permission_id_foreign" foreign key ("permission_id") references "rbac_permission" ("id") on update cascade on delete cascade;`);
        this.addSql(`alter table if exists "rbac_policy" add constraint "rbac_policy_role_id_foreign" foreign key ("role_id") references "rbac_role" ("id") on update cascade on delete cascade;`);
    }
    async down() {
        this.addSql(`alter table if exists "rbac_permission" drop constraint if exists "rbac_permission_category_id_foreign";`);
        this.addSql(`alter table if exists "rbac_policy" drop constraint if exists "rbac_policy_permission_id_foreign";`);
        this.addSql(`alter table if exists "rbac_policy" drop constraint if exists "rbac_policy_role_id_foreign";`);
        this.addSql(`drop table if exists "rbac_permission_category" cascade;`);
        this.addSql(`drop table if exists "rbac_permission" cascade;`);
        this.addSql(`drop table if exists "rbac_role" cascade;`);
        this.addSql(`drop table if exists "rbac_policy" cascade;`);
    }
}
exports.Migration20250224083626 = Migration20250224083626;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0aW9uMjAyNTAyMjQwODM2MjYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9yYmFjL21pZ3JhdGlvbnMvTWlncmF0aW9uMjAyNTAyMjQwODM2MjYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0RBQWtEO0FBRWxELE1BQWEsdUJBQXdCLFNBQVEsc0JBQVM7SUFFM0MsS0FBSyxDQUFDLEVBQUU7UUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLG9XQUFvVyxDQUFDLENBQUM7UUFDbFgsSUFBSSxDQUFDLE1BQU0sQ0FBQywySUFBMkksQ0FBQyxDQUFDO1FBRXpKLElBQUksQ0FBQyxNQUFNLENBQUMsa2hCQUFraEIsQ0FBQyxDQUFDO1FBQ2hpQixJQUFJLENBQUMsTUFBTSxDQUFDLDJIQUEySCxDQUFDLENBQUM7UUFDekksSUFBSSxDQUFDLE1BQU0sQ0FBQyx5SEFBeUgsQ0FBQyxDQUFDO1FBRXZJLElBQUksQ0FBQyxNQUFNLENBQUMscVFBQXFRLENBQUMsQ0FBQztRQUNuUixJQUFJLENBQUMsTUFBTSxDQUFDLDZHQUE2RyxDQUFDLENBQUM7UUFFM0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxV0FBcVcsQ0FBQyxDQUFDO1FBQ25YLElBQUksQ0FBQyxNQUFNLENBQUMsdUhBQXVILENBQUMsQ0FBQztRQUNySSxJQUFJLENBQUMsTUFBTSxDQUFDLDJHQUEyRyxDQUFDLENBQUM7UUFDekgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpSEFBaUgsQ0FBQyxDQUFDO1FBRS9ILElBQUksQ0FBQyxNQUFNLENBQUMsNE1BQTRNLENBQUMsQ0FBQztRQUUxTixJQUFJLENBQUMsTUFBTSxDQUFDLCtMQUErTCxDQUFDLENBQUM7UUFDN00sSUFBSSxDQUFDLE1BQU0sQ0FBQyw2S0FBNkssQ0FBQyxDQUFDO0lBQzdMLENBQUM7SUFFUSxLQUFLLENBQUMsSUFBSTtRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLDBHQUEwRyxDQUFDLENBQUM7UUFFeEgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvR0FBb0csQ0FBQyxDQUFDO1FBRWxILElBQUksQ0FBQyxNQUFNLENBQUMsOEZBQThGLENBQUMsQ0FBQztRQUU1RyxJQUFJLENBQUMsTUFBTSxDQUFDLDBEQUEwRCxDQUFDLENBQUM7UUFFeEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpREFBaUQsQ0FBQyxDQUFDO1FBRS9ELElBQUksQ0FBQyxNQUFNLENBQUMsMkNBQTJDLENBQUMsQ0FBQztRQUV6RCxJQUFJLENBQUMsTUFBTSxDQUFDLDZDQUE2QyxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUVGO0FBeENELDBEQXdDQyJ9