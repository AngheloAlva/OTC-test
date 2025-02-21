"use server"

import { workBook } from "@/db/schemas/work-book"
import { db } from "@/db"

import type { workBookSchema } from "@/lib/form-schemas/work-book.schema"
import type { z } from "zod"

export const createWorkBook = async (values: z.infer<typeof workBookSchema>) => {
	try {
		const { workType, ...rest } = values
		await db.insert(workBook).values({
			...rest,
			workType:
				workType === "mantenimiento"
					? "Mantenimiento"
					: workType === "ampliacion"
						? "Ampliacion"
						: "construccion",
			initialDate: values.initialDate.toISOString(),
			estimatedEndDate: values.estimatedEndDate.toISOString(),
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
