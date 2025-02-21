"use server"

import { workBook } from "@/db/schemas/work-book"
import { and, eq } from "drizzle-orm"
import { db } from "@/db"

export const getWorkBook = async (userId: string, workBookId: number) => {
	try {
		const [preventionAreas] = await db
			.select()
			.from(workBook)
			.where(and(eq(workBook.userId, userId), eq(workBook.id, workBookId)))

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

export const getWorkBooks = async (userId: string) => {
	try {
		const preventionAreas = await db.select().from(workBook).where(eq(workBook.userId, userId))

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
