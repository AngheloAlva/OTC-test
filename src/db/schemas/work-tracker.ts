import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"
import { user } from "./auth"

export const workTracker = sqliteTable("work_tracker", {
	id: integer("id", { mode: "number" }).notNull().primaryKey({ autoIncrement: true }),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	otNumber: text("ot_number").notNull(),
	description: text("description").notNull(),
	date: text("date").notNull(),
	dedicatedHours: integer("dedicated_hours").notNull(),
	quantityPersons: integer("quantity_persons").notNull(),
	location: text("location").notNull(),
	status: text("status", { enum: ["pendiente", "aprobado", "rechazado"] }).notNull(),

	createdAt: text("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text("updated_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
})
