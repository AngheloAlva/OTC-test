import { getWorkBooks } from "@/actions/work-books/getWorkBook"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { DataTable } from "./DataTable"
import { columns } from "./columns"

export default async function WorkBooksPage() {
	const res = await auth.api.getSession({
		headers: await headers(),
	})

	if (!res) {
		return (
			<main className="flex h-screen items-center justify-center">
				<p>Acceso denegado</p>
			</main>
		)
	}

	const data = await getWorkBooks(res.user.id)

	if (!data.ok || !data.data) {
		return (
			<main className="flex h-screen items-center justify-center">
				<p>{data.message}</p>
			</main>
		)
	}

	return (
		<main className="flex h-full flex-col items-center justify-between gap-8 p-8">
			<div className="w-full space-y-10 text-center">
				<h1 className="text-3xl font-bold">Libro de Obras</h1>
				<DataTable columns={columns} data={data.data} />
			</div>

			<Link href="/dashboard/libro-de-obras/agregar">
				<Button size={"lg"}>Agregar Obra</Button>
			</Link>
		</main>
	)
}
