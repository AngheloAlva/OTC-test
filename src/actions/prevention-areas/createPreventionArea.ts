"use server"

import { preventionArea } from "@/db/schemas/prevention-area"
import { db } from "@/db"

import type { preventionAreaSchema } from "@/lib/form-schemas/prevention-area.schema"
import type { z } from "zod"

export const createPreventionArea = async (values: z.infer<typeof preventionAreaSchema>) => {
	try {
		await db.insert(preventionArea).values({
			...values,
		})

		return {
			ok: true,
			message: "Área de prevención creada exitosamente",
		}
	} catch (error) {
		console.error(error)
		return {
			ok: false,
			message: "Error al crear el área de prevención",
		}
	}
}
