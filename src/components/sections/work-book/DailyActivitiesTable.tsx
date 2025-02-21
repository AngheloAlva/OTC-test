import { dailyActivity } from "@/db/schemas/daily-activity"

import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	TableHeader,
} from "@/components/ui/table"
import { format } from "date-fns"

interface WorksTrackersTableProps {
	dailyActivities: (typeof dailyActivity.$inferSelect)[]
}

export default function DailyActivitiesTable({
	dailyActivities,
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
					<TableHead className="text-nowrap">Personal</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{dailyActivities.length === 0 && (
					<TableRow>
						<TableCell colSpan={7} className="text-center">
							No hay actividades diarias
						</TableCell>
					</TableRow>
				)}

				{dailyActivities.map((dailyActivity) => (
					<TableRow key={dailyActivity.id}>
						<TableCell>{dailyActivity.id}</TableCell>
						<TableCell className="max-w-96">{dailyActivity.comments}</TableCell>
						<TableCell>{format(new Date(dailyActivity.executionDate), "dd/MM/yyyy")}</TableCell>
						<TableCell>{dailyActivity.activityStartTime}</TableCell>
						<TableCell>{dailyActivity.activityEndTime}</TableCell>
						<TableCell>{dailyActivity.activityName}</TableCell>
						<TableCell>
							{dailyActivity.personnel.map((person, index) => (
								<div key={index}>
									{person.name} - {person.position}
								</div>
							))}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
