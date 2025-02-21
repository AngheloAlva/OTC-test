import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

import { workBook } from "./work-book"

export const preventionArea = sqliteTable("prevention_area", {
	id: integer("id", { mode: "number" }).notNull().primaryKey({ autoIncrement: true }),

	name: text("name").notNull(),
	recommendations: text("recommendations"),
	others: text("others"),

	createdAt: text("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text("updated_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),

	workBookId: integer("work_book_id")
		.notNull()
		.references(() => workBook.id),
})
