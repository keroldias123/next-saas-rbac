import { pgEnum, pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { uniqueIndex } from "drizzle-orm/pg-core";
import { index } from "drizzle-orm/pg-core";

export const AccountProvider= pgEnum("account_provider", [
    "GITHUB",
])

export const Accounts = pgTable( "accounts", {
    id: uuid("id").primaryKey().defaultRandom(),

    provider: AccountProvider().notNull(),

    provideraccountid: text("provider_account_id").notNull(),

    userid: uuid("user_id")
      .references(() => users.id)
      .notNull(),

    //
    token: text("token").notNull(),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
},
(table) => [
    uniqueIndex("accounts_provider_provider_account_id_idx").on(
      table.provider,
      table.provideraccountid
    ),

    index("accounts_user_id_idx").on(table.userid),
  ]
)
