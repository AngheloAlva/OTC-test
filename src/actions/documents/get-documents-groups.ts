"use server"

import { documentsGroup } from "@/db/schemas/documents-group"
import { db } from "@/db"

export const getDocumentsGroups = async () => {
	try {
		const documentsGroups = await db.select().from(documentsGroup)
		return {
			ok: true,
			data: documentsGroups,
		}
	} catch (error) {
		console.error("Error fetching documents groups:", error)

		return {
			ok: false,
			error,
		}
	}
}
