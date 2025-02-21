import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

import { documentsSubgroup } from "./documents-subgroup"
import { user } from "./auth"

export const document = sqliteTable("document", {
	id: integer("id", { mode: "number" }).notNull().primaryKey({ autoIncrement: true }),

	name: text("name").notNull(),
	description: text("description"),
	type: text("type").notNull(),
	fileUrl: text("file_url").notNull(),
	expirationDate: text("expiration_date"),

	createdAt: text("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text("updated_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),

	subgroupId: integer("subgroup_id")
		.references(() => documentsSubgroup.id)
		.notNull(),
	userId: text("user_id").references(() => user.id),
})
