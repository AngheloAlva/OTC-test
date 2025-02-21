"use server"

import { aditionalActivity } from "@/db/schemas/aditional-activity"
import { eq } from "drizzle-orm"
import { db } from "@/db"

export const getAdditionalActivities = async (workBookId: number) => {
	try {
		const additionalActivities = await db
			.select()
			.from(aditionalActivity)
			.where(eq(aditionalActivity.workBookId, workBookId))

		return {
			ok: true,
			data: additionalActivities,
		}
	} catch (error) {
		console.error(error)
		return {
			ok: false,
			message: "Error fetching additional activities",
		}
	}
}
