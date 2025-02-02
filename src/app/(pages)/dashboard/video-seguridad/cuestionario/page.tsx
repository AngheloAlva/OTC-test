import SafetyTestForm from "@/components/forms/SafetyTestForm"

export default function SafetyTestPage() {
	return (
		<main className="flex flex-col items-center gap-8 p-8">
			<h1 className="text-2xl font-bold">Cuestionario de seguridad y salud en el trabajo</h1>

			<SafetyTestForm />
		</main>
	)
}
