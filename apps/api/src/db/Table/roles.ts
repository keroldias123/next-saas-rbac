import { pgEnum } from "drizzle-orm/pg-core";


export const Role = pgEnum("role", ["ADMIN", "MEMBER", "BILLING"])