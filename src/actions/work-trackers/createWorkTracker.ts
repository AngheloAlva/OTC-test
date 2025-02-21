"use server"

import { workTracker } from "@/db/schemas/work-tracker"
import { db } from "@/db"

import type { workTrackerSchema } from "@/lib/form-schemas/work-tracker-schema"
import type { z } from "zod"

export const createWorkTracker = async (values: z.infer<typeof workTrackerSchema>) => {
	try {
		await db.insert(workTracker).values({
			...values,
			date: values.date.toISOString(),
			dedicatedHours: parseFloat(values.dedicatedHours),
			quantityPersons: parseFloat(values.quantityPersons),
		})

		return {
			ok: true,
			message: "Registro creado exitosamente",
		}
	} catch (error) {
		console.error(error)
		return {
			ok: false,
			message: "Error al crear el registro",
		}
	}
}
