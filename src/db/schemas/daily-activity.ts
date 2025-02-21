import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

import { workBook } from "./work-book"

type Personnel = {
	name: string
	position: string
}

export const dailyActivity = sqliteTable("daily_activity", {
	id: integer("id", { mode: "number" }).notNull().primaryKey({ autoIncrement: true }),

	comments: text("comments").notNull(),
	executionDate: text("execution_date").notNull(),
	activityStartTime: text("activity_start_time").notNull(),
	activityEndTime: text("activity_end_time").notNull(),
	// attachments: text("attachments").notNull(),
	activityName: text("activity_name").notNull(),
	personnel: text("personnel", { mode: "json" }).$type<Array<Personnel>>().notNull(),

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
