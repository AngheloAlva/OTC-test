"use server"

import { otcInspector } from "@/db/schemas/otc-inspector"
import { db } from "@/db"

import type { otcInspectorSchema } from "@/lib/form-schemas/otc-inspector.schema"
import type { z } from "zod"

export const createOtcInspector = async (values: z.infer<typeof otcInspectorSchema>) => {
	try {
		await db.insert(otcInspector).values({
			...values,
			dateOfExecution: values.dateOfExecution.toISOString(),
		})

		return {
			ok: true,
			message: "Inspector creado exitosamente",
		}
	} catch (error) {
		console.error(error)
		return {
			ok: false,
			message: "Error al crear el inspector",
		}
	}
}
