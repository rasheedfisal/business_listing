import { pgTable, foreignKey, pgEnum, uuid, text, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])


export const businesses = pgTable("businesses", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	title: text("title").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	createdBy: uuid("created_by").notNull().references(() => users.id, { onDelete: "cascade" } ),
});

export const users = pgTable("users", {
	id: uuid("id").primaryKey().notNull(),
	email: text("email"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }),
});