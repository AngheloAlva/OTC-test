"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import Link from "next/link"

import type { workBook } from "@/db/schemas/work-book"

export const columns: ColumnDef<typeof workBook.$inferSelect>[] = [
	{
		accessorKey: "id",
		header: "ID",
		cell: ({ row }) => {
			const id = row.getValue("id")
			return (
				<Link
					href={`/dashboard/libro-de-obras/${id}`}
					className="text-right font-medium text-blue-600 hover:underline"
				>
					{id as string}
				</Link>
			)
		},
	},
	{
		accessorKey: "otNumber",
		header: "OT",
	},
	{
		accessorKey: "contractingCopany",
		header: "Contratante",
	},
	{
		accessorKey: "workResponsibleName",
		header: "Responsable de obra",
	},
	{
		accessorKey: "workName",
		header: "Nombre de obra",
	},
	{
		accessorKey: "location",
		header: "Ubicación",
	},
	{
		accessorKey: "workType",
		header: "Tipo de obra",
	},
	{
		accessorKey: "initialDate",
		header: "Fecha de inicio",
		cell: ({ row }) => {
			const date = row.getValue("initialDate")
			const formattedDate = format(date as Date, "dd/MM/yyyy")
			return <div className="text-right font-medium">{formattedDate}</div>
		},
	},
	{
		accessorKey: "estimatedEndDate",
		header: "Fecha estimada de fin",
		cell: ({ row }) => {
			const date = row.getValue("estimatedEndDate")
			const formattedDate = format(date as Date, "dd/MM/yyyy")
			return <div className="text-right font-medium">{formattedDate}</div>
		},
	},
	{
		accessorKey: "status",
		header: "Estado",
	},
	{
		accessorKey: "progressStatus",
		header: "Estado de avance",
	},
]
