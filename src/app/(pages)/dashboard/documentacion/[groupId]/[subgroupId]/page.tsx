import { getDocuments } from "@/actions/documents/get-documents"
import { DataTable } from "./DataTable"
import { columns } from "./columns"

export default async function SubgroupDocumentationPage({
	params,
}: {
	params: Promise<{ groupId: string; subgroupId: string }>
}): Promise<React.ReactElement> {
	const { subgroupId, groupId } = await params

	const documents = await getDocuments(+subgroupId)

	if (!documents.ok || !documents.data) {
		return (
			<main className="flex h-screen items-center justify-center">
				<p>Error al cargar la documentación</p>
			</main>
		)
	}

	return (
		<main className="flex flex-col items-center p-8">
			<h1 className="text-3xl font-bold">Documentación</h1>
			<p className="mt-2 text-center">
				Aca podras encontrar recursos importantes para determinados procesos.
			</p>

			<section className="mt-8 flex w-full flex-col gap-4">
				<DataTable
					columns={columns}
					groupId={groupId}
					data={documents.data}
					subgroupId={subgroupId}
				/>
			</section>
		</main>
	)
}
