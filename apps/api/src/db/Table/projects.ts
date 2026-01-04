import { pgTable, uuid, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { TableOrganizations } from "./organizations";
import { users } from "./users";

export const Projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: text("name").notNull(),
  description: text("description").notNull(),
  slug: text("slug").notNull().unique(),

  avatarUrl: text("avatar_url"),

  organizationId: uuid("organization_id").notNull().references(() => TableOrganizations.id, { onDelete: "cascade" }),
  
  ownerId: uuid("owner_id").notNull().references(() => users.id),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
})
