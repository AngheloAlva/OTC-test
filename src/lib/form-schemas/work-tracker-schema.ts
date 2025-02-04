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
})
