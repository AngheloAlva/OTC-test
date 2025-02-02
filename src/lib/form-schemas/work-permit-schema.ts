import { z } from "zod"
// import { MutualityOptions, ToolsOptions, WorkWillBeOptions } from "../consts/work-permit-options"

export const workPermitSchema = z.object({
	aplicant: z
		.string()
		.min(2, { message: "El nombre del postulante debe tener al menos 2 caracteres" }),
	responsible: z
		.string()
		.min(2, { message: "El nombre del responsable debe tener al menos 2 caracteres" }),
	company: z
		.string()
		.min(2, { message: "El nombre de la empresa debe tener al menos 2 caracteres" }),
	mutuality: z
		// 	.array(z.enum(MutualityOptions, { message: "Debe seleccionar una opción" }))
		.string()
		.nonempty({ message: "Debe seleccionar al menos una opción" }),
	initDate: z.date(),
	hour: z
		.string()
		.regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Debe ingresar una hora válida" }),
	otNumber: z.string().nonempty({ message: "Debe ingresar un número de OT" }),
	workersNumber: z.string().regex(/^[0-9]*$/, { message: "Debe ingresar un número válido" }),
	workDescription: z
		.string()
		.min(2, { message: "La descripción del trabajo debe tener al menos 2 caracteres" }),
	exactPlace: z.string().nonempty({ message: "Debe ingresar un lugar exacto" }),
	workWillBe: z
		// .array(z.enum(WorkWillBeOptions, { message: "Debe seleccionar una opción" }))
		.string()
		.nonempty({ message: "Debe seleccionar al menos una opción" }),
	workWillBeOther: z.string().optional(),
	tools: z
		// .array(z.enum(ToolsOptions, { message: "Debe seleccionar una opción" }))
		.string()
		.nonempty({ message: "Debe seleccionar al menos una opción" }),
	toolsOther: z.string().optional(),
})
