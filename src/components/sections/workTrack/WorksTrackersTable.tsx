import { workTracker } from "@/db/schemas/work-tracker"

import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	TableHeader,
} from "@/components/ui/table"

interface WorksTrackersTableProps {
	worksTrackers: (typeof workTracker.$inferSelect)[]
}

export default function WorksTrackersTable({
	worksTrackers,
}: WorksTrackersTableProps): React.ReactElement {
	return (
		<Table className="mx-auto max-w-screen-xl">
			<TableHeader>
				<TableRow>
					<TableHead className="text-nowrap">ID</TableHead>
					<TableHead className="text-nowrap">Estado</TableHead>
					<TableHead className="text-nowrap">Numero de OT</TableHead>
					<TableHead className="text-nowrap">Descripcion</TableHead>
					<TableHead className="text-nowrap">Horas Dedicadas</TableHead>
					<TableHead className="text-nowrap">Cantidad de Personas</TableHead>
					<TableHead className="text-nowrap">Ubicacion</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{worksTrackers.map((workTracker) => (
					<TableRow key={workTracker.id}>
						<TableCell>{workTracker.id}</TableCell>
						<TableCell>{workTracker.status}</TableCell>
						<TableCell>{workTracker.otNumber}</TableCell>
						<TableCell>{workTracker.description}</TableCell>
						<TableCell>{workTracker.dedicatedHours}</TableCell>
						<TableCell>{workTracker.quantityPersons}</TableCell>
						<TableCell>{workTracker.location}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
