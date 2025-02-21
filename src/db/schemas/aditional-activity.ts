import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

import { workBook } from "./work-book"

export const aditionalActivity = sqliteTable("aditional_activity", {
	id: integer("id", { mode: "number" }).notNull().primaryKey({ autoIncrement: true }),

	comments: text("comments"),
	executionDate: text("execution_date").notNull(),
	activityStartTime: text("activity_start_time").notNull(),
	activityEndTime: text("activity_end_time").notNull(),
	// attachments: text("attachments").notNull(),
	activityName: text("activity_name").notNull(),

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
