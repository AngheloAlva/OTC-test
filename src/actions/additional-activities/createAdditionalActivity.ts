"use server"

import { aditionalActivity } from "@/db/schemas/aditional-activity"
import { db } from "@/db"

import type { aditionalActivitySchema } from "@/lib/form-schemas/aditional-activity.schema"
import type { z } from "zod"

export const createAdditionalActivity = async (values: z.infer<typeof aditionalActivitySchema>) => {
	try {
		await db.insert(aditionalActivity).values({
			...values,
			executionDate: values.executionDate.toISOString(),
		})

		return {
			ok: true,
			message: "Actividad adicional creada exitosamente",
		}
	} catch (error) {
		console.error(error)
		return {
			ok: false,
			message: "Error al crear la actividad adicional",
		}
	}
}
