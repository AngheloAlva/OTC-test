import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"
import { user } from "./auth"

export const workBook = sqliteTable("work_book", {
	id: integer("id", { mode: "number" }).notNull().primaryKey({ autoIncrement: true }),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	otNumber: text("ot_number").notNull().unique(),

	contractingCopany: text("contracting_company").notNull(),
	workResponsibleName: text("work_responsible_name").notNull(),
	workResponsiblePhone: text("work_responsible_phone").notNull(),
	otcInspectorName: text("otc_inspector_name").notNull(),
	otcInspectorPhone: text("otc_inspector_phone").notNull(),
	workName: text("work_name").notNull(),
	location: text("location").notNull(),
	workType: text("work_type", { enum: ["construccion", "Mantenimiento", "Ampliacion"] }).notNull(),
	initialDate: text("initial_date").notNull(),
	estimatedEndDate: text("estimated_end_date").notNull(),
	status: text("status", { enum: ["planificado", "ejecucion", "finalizado"] }).notNull(),
	progressStatus: text("progress_status", {
		enum: ["pendiente", "proceso", "terminado", "postergado"],
	}).notNull(),

	createdAt: text("created_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: text("updated_at")
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
})
