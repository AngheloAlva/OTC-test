"use server"

import { db } from "@/db"
import { document } from "@/db/schemas/document"
import { z } from "zod"
import { documentSchema } from "@/lib/form-schemas/document.schema"

export const saveDocument = async (data: z.infer<typeof documentSchema>, fileUrl: string) => {
	try {
		const result = await db.insert(document).values({
			...data,
			expirationDate: data.expirationDate?.toISOString(),
			fileUrl,
		})

		return {
			ok: true,
			data: result,
		}
	} catch (error) {
		console.error(error)
		return {
			ok: false,
			error: (error as Error).message,
		}
	}
}
