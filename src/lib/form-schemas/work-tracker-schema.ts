import { z } from "zod"

export const workTrackerSchema = z.object({
	location: z.string(),
	userId: z.string().nonempty(),
	otNumber: z.string().nonempty({ message: "Debe ingresar un número de OT" }),
	description: z.string().nonempty({ message: "Debe ingresar una descripción" }),
	date: z.date({ message: "Debe ingresar una fecha" }),
	dedicatedHours: z.string().nonempty({ message: "Debe ingresar un número de horas" }),
	quantityPersons: z.string().nonempty({ message: "Debe ingresar un número de personas" }),
	status: z.enum(["pendiente", "aprobado", "rechazado"], { message: "Debe seleccionar un estado" }),
	patrolType: z.string().nonempty({ message: "Debe seleccionar un tipo de patrulla" }),
	// attachments: z.instanceof(FileList).optional(),
	// .refine(
	// 	(files) => {
	// 		if (!files) return true
	// 		return Array.from(files).every((file) => file.size <= 5 * 1024 * 1024)
	// 	},
	// 	{
	// 		message: "Cada archivo no puede pesar más de 5MB",
	// 	}
	// ),
})
