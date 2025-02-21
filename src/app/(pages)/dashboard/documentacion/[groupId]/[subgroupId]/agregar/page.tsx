import { DocumentForm } from "@/components/forms/DocumentForm"

export default async function page({
	params,
}: {
	params: Promise<{ subgroupId: string; groupId: string }>
}): Promise<React.ReactElement> {
	const { subgroupId, groupId } = await params

	return (
		<main className="flex flex-col items-center p-8">
			<h1 className="text-3xl font-bold">Subir Documento</h1>

			<section className="mt-8 flex w-full flex-col gap-4">
				<DocumentForm subgroupId={+subgroupId} groupId={+groupId} />
			</section>
		</main>
	)
}
