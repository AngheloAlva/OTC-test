import { getWorkTrackers } from "@/actions/getWorkTrackers"
import WorksTrackersTable from "@/components/sections/workTrack/WorksTrackersTable"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"

export default async function ActivityLogPage() {
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

	const workTrackers = await getWorkTrackers(res.user.id)

	if (!workTrackers.ok || !workTrackers.data) {
		return (
			<main className="flex h-screen items-center justify-center">
				<p>{workTrackers.message}</p>
			</main>
		)
	}

	return (
		<main className="flex h-full flex-col items-center justify-between gap-8 p-8">
			<div className="w-full space-y-10 text-center">
				<h1 className="text-3xl font-bold">Registro de Actividades</h1>
				<WorksTrackersTable worksTrackers={workTrackers.data} />
			</div>

			<Link href="/dashboard/registro-actividades/agregar">
				<Button size={"lg"}>Agregar Actividad</Button>
			</Link>
		</main>
	)
}
