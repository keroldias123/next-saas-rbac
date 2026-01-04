import { pgTable, uuid, text, timestamp, uniqueIndex, pgEnum, boolean } from "drizzle-orm/pg-core";
import { TableUsers } from "./users";

export const TableOrganizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  domain: text("domain").unique(),

  shouldAttachUsersByDomain: boolean("should_attach_users_by_domain").default(false),

  avatarUrl: text("avatar_url"),

  ownerId: uuid("owner_id") .notNull() .references(() => TableUsers.id),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
})

