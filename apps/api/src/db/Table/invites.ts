import { index } from "drizzle-orm/pg-core";
import { pgTable, uuid, text, timestamp, uniqueIndex, pgEnum } from "drizzle-orm/pg-core";
import {  users } from "./users";
import { TableOrganizations } from "./organizations";
import { Role } from "./roles";


export const Invites = pgTable(
  "invites",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    email: text("email").notNull(),
    role: Role("role").notNull(),

    authorId: uuid("author_id")
      .references(() => users.id, { onDelete: "set null" }),

    organizationId: uuid("organization_id")
      .notNull()
      .references(() => TableOrganizations.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    uniqueIndex("invites_email_org_idx").on(
      table.email,
      table.organizationId
    ),

    index("invites_email_idx").on(table.email),
  ]
)

