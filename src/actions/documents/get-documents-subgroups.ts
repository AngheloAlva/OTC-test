"use server"

import { documentsSubgroup } from "@/db/schemas/documents-subgroup"
import { eq } from "drizzle-orm"
import { db } from "@/db"

export const getDocumentsSubgroups = async (groupId: number) => {
	try {
		const documentsSubgroups = await db
			.select()
			.from(documentsSubgroup)
			.where(eq(documentsSubgroup.documentsGroup, groupId))

		return {
			ok: true,
			data: documentsSubgroups,
		}
	} catch (error) {
		console.error("Error fetching documents subgroups:", error)

		return {
			ok: false,
			error,
		}
	}
}
