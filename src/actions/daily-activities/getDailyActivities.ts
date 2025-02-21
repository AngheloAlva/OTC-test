"use server"

import { eq } from "drizzle-orm"
import { db } from "@/db"
import { dailyActivity } from "@/db/schemas/daily-activity"

export const getDailyActivities = async (workBookId: number) => {
	try {
		const dailyActivities = await db
			.select()
			.from(dailyActivity)
			.where(eq(dailyActivity.workBookId, workBookId))

		return {
			ok: true,
			data: dailyActivities,
		}
	} catch (error) {
		console.error(error)
		return {
			ok: false,
			message: "Error fetching daily activities",
		}
	}
}
