"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import Link from "next/link"

import { document } from "@/db/schemas/document"

export const columns: ColumnDef<typeof document.$inferSelect>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Nombre",
	},
	{
		accessorKey: "description",
		header: "Descripción",
	},
	{
		accessorKey: "type",
		header: "Tipo de Documento",
	},
	{
		accessorKey: "expirationDate",
		header: "Fecha de Expiración",
		cell: ({ row }) => {
			const date = row.getValue("expirationDate")
			const formattedDate = date ? format(date as Date, "dd/MM/yyyy") : "N/A"
			return <div className="text-right font-medium">{formattedDate}</div>
		},
	},
	{
		accessorKey: "createdAt",
		header: "Fecha de Creación",
		cell: ({ row }) => {
			const date = row.getValue("createdAt")
			const formattedDate = format(date as Date, "dd/MM/yyyy")
			return <div className="text-right font-medium">{formattedDate}</div>
		},
	},
	{
		accessorKey: "fileUrl",
		header: "URL",
		cell: ({ row }) => {
			const url = row.getValue("fileUrl")
			return (
				<Link
					href={url as string}
					className="text-blue-500 hover:underline"
					passHref
					aria-label="Ver Documento"
					target="_blank"
				>
					Ver Documento
				</Link>
			)
		},
	},
]
