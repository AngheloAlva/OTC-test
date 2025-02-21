import { z } from "zod"

export const workBookSchema = z.object({
	userId: z.string().nonempty(),
	location: z.string().nonempty(),

	otNumber: z.string().nonempty({ message: "El número de OT no puede estar vacío" }),
	contractingCopany: z
		.string()
		.nonempty({ message: "La empresa contratante no puede estar vacía" }),
	workResponsibleName: z
		.string()
		.nonempty({ message: "El nombre del responsable de la obra no puede estar vacío" }),
	workResponsiblePhone: z
		.string()
		.nonempty({ message: "El teléfono del responsable de la obra no puede estar vacío" }),
	otcInspectorName: z
		.string()
		.nonempty({ message: "El nombre del inspector OTC no puede estar vacío" }),
	otcInspectorPhone: z
		.string()
		.nonempty({ message: "El teléfono del inspector OTC no puede estar vacío" }),
	workName: z.string().nonempty({ message: "El nombre de la obra no puede estar vacío" }),
	workType: z.enum(["construccion", "mantenimiento", "ampliacion"]),
	initialDate: z.date({ message: "La fecha de inicio no es válida" }),
	estimatedEndDate: z.date({ message: "La fecha estimada de fin no es válida" }),
	status: z.enum(["planificado", "ejecucion", "finalizado"]),
	progressStatus: z.enum(["pendiente", "proceso", "terminado", "postergado"]),
})
