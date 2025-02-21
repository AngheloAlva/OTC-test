import { z } from "zod"

export const documentSchema = z.object({
	subgroupId: z.number(),

	name: z.string().min(1, { message: "El nombre del documento es obligatorio" }),
	description: z.string().optional(),
	type: z.string(),
	expirationDate: z.date().optional(),
})
