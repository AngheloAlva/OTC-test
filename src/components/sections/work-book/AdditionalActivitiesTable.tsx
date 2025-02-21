import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	TableHeader,
} from "@/components/ui/table"
import { aditionalActivity } from "@/db/schemas/aditional-activity"
import { format } from "date-fns"

interface WorksTrackersTableProps {
	additionalActivities: (typeof aditionalActivity.$inferSelect)[]
}

export default function AdditionalActivitiesTable({
	additionalActivities,
}: WorksTrackersTableProps): React.ReactElement {
	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow>
					<TableHead className="text-nowrap">ID</TableHead>
					<TableHead className="text-nowrap">Comentarios</TableHead>
					<TableHead className="text-nowrap">Fecha de Ejecución</TableHead>
					<TableHead className="text-nowrap">Hora de Inicio</TableHead>
					<TableHead className="text-nowrap">Hora de Fin</TableHead>
					<TableHead className="text-nowrap">Nombre de Actividad</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{additionalActivities.length === 0 && (
					<TableRow>
						<TableCell colSpan={6} className="text-center">
							No hay actividades diarias
						</TableCell>
					</TableRow>
				)}

				{additionalActivities.map((dailyActivity) => (
					<TableRow key={dailyActivity.id}>
						<TableCell>{dailyActivity.id}</TableCell>
						<TableCell>{dailyActivity.comments}</TableCell>
						<TableCell>{format(new Date(dailyActivity.executionDate), "dd/MM/yyyy")}</TableCell>
						<TableCell>{dailyActivity.activityStartTime}</TableCell>
						<TableCell>{dailyActivity.activityEndTime}</TableCell>
						<TableCell>{dailyActivity.activityName}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
