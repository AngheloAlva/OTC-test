import { getAdditionalActivities } from "@/actions/additional-activities/getAdditionalActivities"
import { getDailyActivities } from "@/actions/daily-activities/getDailyActivities"
import { getPreventionAreas } from "@/actions/prevention-areas/getPreventionAreas"
import { getOtcInspectors } from "@/actions/otc-inspectors/getOtcInspectors"
import { getWorkBook } from "@/actions/work-books/getWorkBook"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import Link from "next/link"

import AdditionalActivitiesTable from "@/components/sections/work-book/AdditionalActivitiesTable"
import DailyActivitiesTable from "@/components/sections/work-book/DailyActivitiesTable"
import PreventionAreasTable from "@/components/sections/work-book/PreventionAreasTable"
import OtcInspectorTable from "@/components/sections/work-book/OtcInspectorTable"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function WorkBooksPage({ params }: { params: Promise<{ id: string }> }) {
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

	const { id } = await params

	const [
		workBookData,
		dailyActivitiesData,
		additionalActivitiesData,
		otcInspectorsData,
		preventionAreasData,
	] = await Promise.all([
		getWorkBook(res.user.id, +id),
		getDailyActivities(+id),
		getAdditionalActivities(+id),
		getOtcInspectors(+id),
		getPreventionAreas(+id),
	])

	if (!workBookData.ok || !workBookData.data) {
		return (
			<main className="flex h-screen items-center justify-center">
				<p>{workBookData.message}</p>
			</main>
		)
	}

	return (
		<main className="flex h-full flex-col gap-16 p-8 pb-40">
			<h1 className="text-3xl font-bold">
				{workBookData.data.workName} - OT: {workBookData.data.otNumber}
			</h1>

			<div className="flex flex-col gap-2">
				<div className="flex justify-between">
					<h2 className="text-2xl font-bold">Actividades Diarias</h2>
					<Link href={`/dashboard/libro-de-obras/${id}/actividades-diarias`}>
						<Button size={"lg"}>
							Agregar
							<Plus />
						</Button>
					</Link>
				</div>

				<DailyActivitiesTable dailyActivities={dailyActivitiesData.data as any} />
			</div>

			<div className="flex flex-col gap-2">
				<div className="flex justify-between">
					<h2 className="text-2xl font-bold">Actividades Adicionales</h2>
					<Link href={`/dashboard/libro-de-obras/${id}/actividades-adicionales`}>
						<Button size={"lg"}>
							Agregar
							<Plus />
						</Button>
					</Link>
				</div>

				<AdditionalActivitiesTable additionalActivities={additionalActivitiesData.data as any} />
			</div>

			<div className="flex flex-col gap-2">
				<div className="flex justify-between">
					<h2 className="text-2xl font-bold">Inspector OTC</h2>
					<Link href={`/dashboard/libro-de-obras/${id}/inspector-otc`}>
						<Button size={"lg"}>
							Agregar
							<Plus />
						</Button>
					</Link>
				</div>

				<OtcInspectorTable otcInspectorData={otcInspectorsData.data as any} />
			</div>

			<div className="flex flex-col gap-2">
				<div className="flex justify-between">
					<h2 className="text-2xl font-bold">Áreas de Prevención</h2>
					<Link href={`/dashboard/libro-de-obras/${id}/prevencion`}>
						<Button size={"lg"}>
							Agregar
							<Plus />
						</Button>
					</Link>
				</div>

				<PreventionAreasTable preventionAreas={preventionAreasData.data as any} />
			</div>
		</main>
	)
}
