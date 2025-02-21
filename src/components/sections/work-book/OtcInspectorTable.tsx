import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableHeader,
	TableCell,
} from "@/components/ui/table"
import { otcInspector } from "@/db/schemas/otc-inspector"
import { format } from "date-fns"

interface WorksTrackersTableProps {
	otcInspectorData: (typeof otcInspector.$inferSelect)[]
}

export default function OtcInspectorTable({
	otcInspectorData,
}: WorksTrackersTableProps): React.ReactElement {
	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow>
					<TableHead className="text-nowrap">ID</TableHead>
					<TableHead className="text-nowrap">Nombre del Inspector</TableHead>
					<TableHead className="text-nowrap">Fecha de Ejecución</TableHead>
					<TableHead className="text-nowrap">Hora de Inicio</TableHead>
					<TableHead className="text-nowrap">Hora de Fin</TableHead>
					<TableHead className="text-nowrap">Comentarios de Supervisión</TableHead>
					<TableHead className="text-nowrap">Observaciones de Seguridad</TableHead>
					<TableHead className="text-nowrap">No Conformidades</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{otcInspectorData.length === 0 && (
					<TableRow>
						<TableCell colSpan={8} className="text-center">
							No hay registros de inspección
						</TableCell>
					</TableRow>
				)}

				{otcInspectorData.map((inspection) => (
					<TableRow key={inspection.id}>
						<TableCell>{inspection.id}</TableCell>
						<TableCell>{inspection.inspectorName}</TableCell>
						<TableCell>{format(inspection.dateOfExecution, "dd/MM/yyyy")}</TableCell>
						<TableCell>{inspection.activityStartTime}</TableCell>
						<TableCell>{inspection.activityEndTime}</TableCell>
						<TableCell>{inspection.supervisionComments}</TableCell>
						<TableCell>{inspection.safetyObservations}</TableCell>
						<TableCell>{inspection.nonConformities || "-"}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
