import { z } from "zod"

export const otcInspectorSchema = z.object({
	workBookId: z.number(),

	inspectorName: z.string().nonempty({ message: "El nombre del inspector no puede estar vacío" }),
	dateOfExecution: z.date({ message: "La fecha de ejecución no es válida" }),
	activityStartTime: z.string().nonempty({ message: "La hora de inicio no puede estar vacía" }),
	activityEndTime: z.string().nonempty({ message: "La hora de fin no puede estar vacía" }),
	supervisionComments: z
		.string()
		.nonempty({ message: "Los comentarios de supervisión no pueden estar vacíos" }),
	safetyObservations: z
		.string()
		.nonempty({ message: "Las observaciones de seguridad no pueden estar vacías" }),
	nonConformities: z.string().optional(),
})
