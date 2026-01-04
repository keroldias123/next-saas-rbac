import { pgTable, uuid, text, timestamp,pgEnum} from "drizzle-orm/pg-core";
import { users } from "./users";

export const TokenType = pgEnum("token_type", [
    "PASSWORD_RECOVER",
    "EMAIL_VERIFICATION",
    "GITHUB"
])

export const tokens = pgTable("tokens", {
    id: uuid("id").primaryKey().defaultRandom(),
   // token: text("token").notNull().unique(),
    type: TokenType().notNull(),
    userId: uuid("user_id").references(() => users.id).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
