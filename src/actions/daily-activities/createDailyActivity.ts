"use server"

import { dailyActivity } from "@/db/schemas/daily-activity"
import { db } from "@/db"

import type { dailyActivitySchema } from "@/lib/form-schemas/daily-activity.schema"
import type { z } from "zod"

export const createDailyActivity = async (values: z.infer<typeof dailyActivitySchema>) => {
	try {
		await db.insert(dailyActivity).values({
			...values,
			executionDate: values.executionDate.toISOString(),
		})

		return {
			ok: true,
			message: "Actividad diaria creada exitosamente",
		}
	} catch (error) {
		console.error(error)
		return {
			ok: false,
			message: "Error al crear la actividad diaria",
		}
	}
}
