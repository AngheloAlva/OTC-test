"use client"

import { workPermitSchema } from "@/lib/form-schemas/work-permit-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { es } from "date-fns/locale"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { z } from "zod"

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"
import {
	Form,
	FormItem,
	FormLabel,
	FormField,
	FormControl,
	FormMessage,
} from "@/components/ui/form"
import { Calendar } from "../ui/calendar"
import { MutualityOptions, WorkWillBeOptions } from "@/lib/consts/work-permit-options"
import { Textarea } from "../ui/textarea"

export default function WorkPermitForm(): React.ReactElement {
	const { toast } = useToast()

	const form = useForm<z.infer<typeof workPermitSchema>>({
		resolver: zodResolver(workPermitSchema),
		defaultValues: {
			aplicant: "",
			responsible: "",
			company: "",
			exactPlace: "",
			hour: "",
			initDate: new Date(),
			mutuality: "",
			otNumber: "",
			tools: "",
			toolsOther: "",
			workDescription: "",
			workersNumber: "",
			workWillBe: "",
			workWillBeOther: "",
		},
	})

	async function onSubmit(values: z.infer<typeof workPermitSchema>) {
		console.log(values)

		toast({
			title: "Permiso de trabajo",
			description: "Permiso de trabajo enviado exitosamente | Datos: " + JSON.stringify(values),
			duration: 3000,
		})
	}

	const workWillBeAreOther = form.watch("workWillBe").includes("Otro")
	const toolsAreOther = form.watch("tools").includes("Otros")

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-4 md:grid-cols-2"
			>
				<FormField
					control={form.control}
					name="aplicant"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Solicitante</FormLabel>
							<FormControl>
								<Input
									className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
									placeholder="Solicitante"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="responsible"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Responsable</FormLabel>
							<FormControl>
								<Input
									className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
									placeholder="Responsable"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="company"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Empresa</FormLabel>
							<FormControl>
								<Input
									className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
									placeholder="Empresa"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="mutuality"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel className="text-gray-700">Mutualidad</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									className="flex flex-col space-y-1 text-gray-700"
								>
									{MutualityOptions.map((option) => (
										<FormItem key={option} className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value={option} />
											</FormControl>
											<FormLabel className="font-normal">{option}</FormLabel>
										</FormItem>
									))}
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="initDate"
					render={({ field }) => (
						<FormItem className="flex flex-col pt-2.5">
							<FormLabel className="text-gray-700">Fecha de inicio</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-full border-gray-200 bg-white pl-3 text-left font-normal text-gray-700",
												!field.value && "text-muted-foreground"
											)}
										>
											{field.value ? (
												format(field.value, "PPP", { locale: es })
											) : (
												<span>Pick a date</span>
											)}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date < new Date("1900-01-01")}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="hour"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Hora</FormLabel>
							<FormControl>
								<Input
									className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
									placeholder="Hora"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="otNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Número de OT</FormLabel>
							<FormControl>
								<Input
									className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
									placeholder="Número de OT"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="workersNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Número de trabajadores</FormLabel>
							<FormControl>
								<Input
									className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
									placeholder="Número de trabajadores"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="workDescription"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Descripción del trabajo</FormLabel>
							<FormControl>
								<Textarea
									className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
									placeholder="Descripción del trabajo"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="exactPlace"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Lugar exacto</FormLabel>
							<FormControl>
								<Input
									className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
									placeholder="Lugar exacto"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="workWillBe"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel className="text-gray-700">El trabajo se realizará</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									className="flex flex-col space-y-1 text-gray-700"
								>
									{WorkWillBeOptions.map((option) => (
										<FormItem key={option} className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value={option} />
											</FormControl>
											<FormLabel className="font-normal">{option}</FormLabel>
										</FormItem>
									))}
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{workWillBeAreOther && (
					<FormField
						control={form.control}
						name="workWillBeOther"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-700">Otro</FormLabel>
								<FormControl>
									<Input
										className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
										placeholder="Otro"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<FormField
					control={form.control}
					name="tools"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel className="text-gray-700">Herramientas</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									className="flex flex-col space-y-1 text-gray-700"
								>
									{["Herramientas", "EPI", "Otro"].map((option) => (
										<FormItem key={option} className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value={option} />
											</FormControl>
											<FormLabel className="font-normal">{option}</FormLabel>
										</FormItem>
									))}
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{toolsAreOther && (
					<FormField
						control={form.control}
						name="toolsOther"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-gray-700">Otro</FormLabel>
								<FormControl>
									<Input
										className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
										placeholder="Otro"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<Button className="mt-4 md:col-span-2" type="submit">
					Enviar solicitud
				</Button>
			</form>
		</Form>
	)
}
