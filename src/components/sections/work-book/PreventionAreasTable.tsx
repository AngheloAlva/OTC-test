import {
	Table,
	TableRow,
	TableBody,
	TableHead,
	TableCell,
	TableHeader,
} from "@/components/ui/table"
import { preventionArea } from "@/db/schemas/prevention-area"

interface WorksTrackersTableProps {
	preventionAreas: (typeof preventionArea.$inferSelect)[]
}

export default function PreventionAreasTable({
	preventionAreas,
}: WorksTrackersTableProps): React.ReactElement {
	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow>
					<TableHead className="text-nowrap">ID</TableHead>
					<TableHead className="text-nowrap">Nombre</TableHead>
					<TableHead className="text-nowrap">Recomendaciones</TableHead>
					<TableHead className="text-nowrap">Otros</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{preventionAreas.length === 0 && (
					<TableRow>
						<TableCell colSpan={4} className="text-center">
							No hay áreas de prevención
						</TableCell>
					</TableRow>
				)}

				{preventionAreas.map((area) => (
					<TableRow key={area.id}>
						<TableCell>{area.id}</TableCell>
						<TableCell>{area.name}</TableCell>
						<TableCell>{area.recommendations}</TableCell>
						<TableCell>{area.others}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
