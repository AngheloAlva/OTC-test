import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

import { documentsGroup } from "./documents-group"

export const documentsSubgroup = sqliteTable("documents_subgroup", {
	id: integer("id", { mode: "number" }).notNull().primaryKey({ autoIncrement: true }),

	name: text("name").notNull(),
	description: text("description"),

	createdAt: text("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text("updated_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),

	documentsGroup: text("documents_group")
		.references(() => documentsGroup.id)
		.notNull(),
})
