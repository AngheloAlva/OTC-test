"use client"

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	SortingState,
	useReactTable,
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { Input } from "@/components/ui/input"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [sorting, setSorting] = useState<SortingState>([])

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	})

	return (
		<section className="flex flex-col items-start gap-4 overflow-x-auto">
			<div className="flex items-center gap-2 py-4">
				<Input
					placeholder="Filtrar por Numero de OT..."
					value={(table.getColumn("otNumber")?.getFilterValue() as string) ?? ""}
					onChange={(event) => table.getColumn("otNumber")?.setFilterValue(event.target.value)}
					className="w-96"
				/>

				<Input
					placeholder="Filtrar por Empresa Contratista..."
					value={(table.getColumn("contractingCopany")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("contractingCopany")?.setFilterValue(event.target.value)
					}
					className="w-96"
				/>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No hay datos
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</section>
	)
}
