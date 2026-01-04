import { pgTable, uuid, text, timestamp, uniqueIndex, pgEnum } from "drizzle-orm/pg-core";
import { TableOrganizations } from "./organizations";
import { TableUsers } from "./users";
import { Role } from "./roles";

export const Members = pgTable(
  "members",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    role: Role("role").default("MEMBER"),

    organizationId: uuid("organization_id")
      .notNull()
      .references(() => TableOrganizations.id, { onDelete: "cascade" }),

    userId: uuid("user_id")
      .notNull()
      .references(() => TableUsers.id, { onDelete: "cascade" }),
  },
  (table) => [
    uniqueIndex("members_org_user_idx").on(
      table.organizationId,
      table.userId
    ),
  ]
)
