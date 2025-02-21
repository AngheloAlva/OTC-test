import { getDocumentsSubgroups } from "@/actions/documents/get-documents-subgroups"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export default async function GroupDocumentationPage({
	params,
}: {
	params: Promise<{ groupId: string }>
}): Promise<React.ReactElement> {
	const { groupId } = await params

	const documentsGroups = await getDocumentsSubgroups(+groupId)

	if (!documentsGroups.ok || !documentsGroups.data) {
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
				{documentsGroups.data.map((group) => (
					<div
						key={group.id}
						className="flex w-full items-center justify-between rounded-md border border-gray-300 p-4"
					>
						<h2 className="text-xl font-bold">{group.name}</h2>
						{/* <p className="mt-2 text-muted-foreground">{group.description}</p> */}

						{/* <div className="flex w-full justify-end"> */}
						<Link
							href={`/dashboard/documentacion/${group.documentsGroup}/${group.id}`}
							className="flex items-center justify-center text-blue-500 hover:underline"
						>
							Ver documentos
							<ChevronRight className="-mb-0.5 ml-2 h-4 w-4" />
						</Link>
						{/* </div> */}
					</div>
				))}
			</section>
		</main>
	)
}
