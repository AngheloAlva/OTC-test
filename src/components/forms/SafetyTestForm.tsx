"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"

const safetyAndSecurityQuestions: Array<{
	question: string
	answers: string[]
	correctAnswer: number
}> = [
	{
		question: "¿Qué hacer si un compañero de trabajo se desmaya?",
		answers: [
			"Intentar despertarlo con agua",
			"Llamar al 911",
			"Ponerlo en posición de recuperación",
			"Intentar despertarlo con un golpe en la espalda",
		],
		correctAnswer: 2,
	},
	{
		question: "¿Qué hacer si se incendia un equipo de trabajo?",
		answers: [
			"Intentar apagarlo con agua",
			"Llamar al 911",
			"Intentar apagarlo con un extintor",
			"Intentar apagarlo con un trapo",
		],
		correctAnswer: 2,
	},
	{
		question: "¿Cuál es el primer paso antes de comenzar cualquier trabajo en altura?",
		answers: [
			"Comenzar inmediatamente el trabajo",
			"Verificar el equipo de protección personal",
			"Llamar a un compañero",
			"Tomar un descanso",
		],
		correctAnswer: 1,
	},
	{
		question: "¿Qué documento es obligatorio antes de iniciar trabajos en espacios confinados?",
		answers: ["Permiso de trabajo", "Carta de renuncia", "Contrato laboral", "Certificado médico"],
		correctAnswer: 0,
	},
	{
		question: "En caso de emergencia, ¿cuál es el número a contactar?",
		answers: ["911", "Supervisor directo", "Número de emergencia interno", "Todas las anteriores"],
		correctAnswer: 2,
	},
	{
		question: "¿Qué hacer si un compañero de trabajo sufre una descarga eléctrica?",
		answers: [
			"Intentar desconectar el equipo",
			"Intentar desconectarlo con un palo de madera",
			"Intentar desconectarlo con las manos",
			"Intentar desconectarlo con un trapo",
		],
		correctAnswer: 0,
	},
	{
		question: "¿Qué hacer si un compañero de trabajo sufre una quemadura?",
		answers: [
			"Intentar enfriar la quemadura con agua",
			"Intentar enfriar la quemadura con hielo",
			"Intentar enfriar la quemadura con fuego",
			"Intentar enfriar la quemadura con un trapo",
		],
		correctAnswer: 0,
	},
]

export default function SafetyTestForm(): React.ReactElement {
	const [loading, setLoading] = useState(false)
	const [answers, setAnswers] = useState<number[]>([])
	const [correctInfo, setCorrectInfo] = useState<{
		correctAnswers: number
		totalQuestions: number
		correctPercentage: string
	} | null>(null)

	async function onSubmit() {
		setLoading(true)

		const correctAnswers = safetyAndSecurityQuestions.map((question) => question.correctAnswer)
		const correctAnswersCount = correctAnswers.reduce((acc, correctAnswer, index) => {
			if (correctAnswer === answers[index]) {
				return acc + 1
			}

			return acc
		}, 0)

		const totalQuestions = safetyAndSecurityQuestions.length
		const correctPercentage = ((correctAnswersCount / totalQuestions) * 100).toFixed(2)

		setCorrectInfo({
			correctAnswers: correctAnswersCount,
			totalQuestions,
			correctPercentage,
		})

		setLoading(false)
	}

	return (
		<section className="flex flex-col gap-8">
			{!correctInfo ? (
				<form onSubmit={onSubmit} className="grid gap-8 lg:grid-cols-2">
					{safetyAndSecurityQuestions.map((question, index) => (
						<fieldset key={index} className="flex flex-col gap-1.5">
							<legend className="mb-2 font-semibold">{question.question}</legend>

							{question.answers.map((answer, answerIndex) => (
								<label key={answerIndex} className="flex items-center gap-2 text-gray-700">
									<input
										type="radio"
										name={`question-${index}`}
										value={answerIndex}
										onChange={() => {
											const newAnswers = [...answers]
											newAnswers[index] = answerIndex
											setAnswers(newAnswers)
										}}
									/>

									<span>{answer}</span>
								</label>
							))}
						</fieldset>
					))}

					<Button
						className="mt-4 md:col-span-2"
						type="submit"
						disabled={loading || answers.length < safetyAndSecurityQuestions.length}
					>
						{loading ? (
							<div role="status" className="flex items-center justify-center">
								<svg
									aria-hidden="true"
									className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="currentColor"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentFill"
									/>
								</svg>
								<span className="sr-only">Cargando...</span>
							</div>
						) : (
							"Enviar cuesitonario"
						)}
					</Button>
				</form>
			) : (
				<div className="flex flex-col gap-4 rounded-lg bg-gray-100 p-4">
					<h2 className="text-xl font-bold">Resultados</h2>

					<p>
						Respuestas correctas: {correctInfo.correctAnswers} / {correctInfo.totalQuestions}
					</p>

					<p>Porcentaje de respuestas correctas: {correctInfo.correctPercentage}%</p>
				</div>
			)}
		</section>
	)
}
