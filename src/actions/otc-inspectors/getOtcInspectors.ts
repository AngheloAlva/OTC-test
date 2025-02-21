"use server"

import { otcInspector } from "@/db/schemas/otc-inspector"
import { eq } from "drizzle-orm"
import { db } from "@/db"

export const getOtcInspectors = async (workBookId: number) => {
	try {
		const inspectors = await db
			.select()
			.from(otcInspector)
			.where(eq(otcInspector.workBookId, workBookId))

		return {
			ok: true,
			data: inspectors,
		}
	} catch (error) {
		console.error(error)
		return {
			ok: false,
			message: "Error fetching inspectors",
		}
	}
}
