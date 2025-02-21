"use server"

import { preventionArea } from "@/db/schemas/prevention-area"
import { eq } from "drizzle-orm"
import { db } from "@/db"

export const getPreventionAreas = async (workBookId: number) => {
	try {
		const preventionAreas = await db
			.select()
			.from(preventionArea)
			.where(eq(preventionArea.workBookId, workBookId))

		return {
			ok: true,
			data: preventionAreas,
		}
	} catch (error) {
		console.error(error)
		return {
			ok: false,
			message: "Error al obtener las áreas de prevención",
		}
	}
}
