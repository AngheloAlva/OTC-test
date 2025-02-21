"use server"

import { workTracker } from "@/db/schemas/work-tracker"
import { eq } from "drizzle-orm"
import { db } from "@/db"

export const getWorkTrackers = async (userId: string) => {
	try {
		const workTrackers = await db.select().from(workTracker).where(eq(workTracker.userId, userId))

		return {
			ok: true,
			data: workTrackers,
		}
	} catch (error) {
		console.error(error)
		return {
			ok: false,
			message: "Error al crear el registro",
		}
	}
}
