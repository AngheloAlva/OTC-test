import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

import { workBook } from "./work-book"

export const otcInspector = sqliteTable("otc_inspector", {
	id: integer("id", { mode: "number" }).notNull().primaryKey({ autoIncrement: true }),

	inspectorName: text("inspector_name").notNull(),
	dateOfExecution: text("date_of_execution").notNull(),
	activityStartTime: text("activity_start_time").notNull(),
	activityEndTime: text("activity_end_time").notNull(),
	// attachments: text("attachments"),
	supervisionComments: text("supervision_comments").notNull(),
	safetyObservations: text("safety_observations").notNull(),
	nonConformities: text("non_conformities"),

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
