"use client"

import { saveDocument } from "@/actions/documents/upload-document"
import { useEffect, useState } from "react"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { documentSchema } from "@/lib/form-schemas/document.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"

interface DocumentFormProps {
	subgroupId: number
	groupId: number
}

export function DocumentForm({ subgroupId, groupId }: DocumentFormProps) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [uploading, setUploading] = useState(false)
	const [message, setMessage] = useState("")

	const { toast } = useToast()
	const router = useRouter()

	const onSubmit = async (values: z.infer<typeof documentSchema>) => {
		if (!selectedFile) return

		setUploading(true)
		setMessage("Subiendo documento...")

		try {
			// Generate a unique filename
			const fileExtension = selectedFile.name.split(".").pop()
			const uniqueFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`

			// Get presigned URL
			const response = await fetch("/api/media", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ filenames: [uniqueFilename] }),
			})
			const data = await response.json()

			if (data.urls) {
				// Upload file to S3
				const uploadResponse = await fetch(data.urls[0], {
					method: "PUT",
					body: selectedFile,
				})

				if (uploadResponse.ok) {
					// Save document metadata to database
					const saveResult = await saveDocument(
						values,
						`${process.env.NEXT_PUBLIC_S3_URL}/${uniqueFilename}`
					)
					if (!saveResult.ok) {
						throw new Error("Error al guardar el documento en la base de datos")
					}

					// Here you would call another server action to save to the database
					// await saveDocument(documentData)

					setMessage("Documento subido correctamente")
					setSelectedFile(null)

					toast({
						title: "Documento subido correctamente",
						description: "El documento se ha subido correctamente",
						duration: 3000,
					})
					router.push(`/dashboard/documentacion/${groupId}/${subgroupId}`)
				}
			}
		} catch (error) {
			console.error(error)
			setMessage("Error al subir el documento")

			toast({
				title: "Error al subir el documento",
				description: "Ha ocurrido un error al subir el documento",
				variant: "destructive",
				duration: 5000,
			})
		} finally {
			setUploading(false)
		}
	}

	const form = useForm<z.infer<typeof documentSchema>>({
		resolver: zodResolver(documentSchema),
		defaultValues: {
			subgroupId,
			name: "",
			type: "",
			description: "",
			expirationDate: new Date(),
		},
	})

	useEffect(() => {
		console.log(form.getValues())
	}, [form])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Nombre del documento</FormLabel>
							<FormControl>
								<Input
									className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
									placeholder="Nombre del documento"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Tipo de documento</FormLabel>
							<FormControl>
								<Input
									className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
									placeholder="Tipo de documento"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Descripción</FormLabel>
							<FormControl>
								<Textarea
									className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
									placeholder="Descripción"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormItem>
					<FormLabel className="text-gray-700">Archivo</FormLabel>
					<FormControl>
						<Input
							type="file"
							accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .jpg, .jpeg, .png, .webp, .avif"
							className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
							onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>

				<FormField
					control={form.control}
					name="expirationDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Fecha de Expiracion (opcional)</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-full rounded-md border-gray-200 bg-white pl-3 text-left text-sm font-normal text-gray-700",
												!field.value && "text-muted-foreground"
											)}
										>
											{field.value ? (
												format(field.value, "PPP", { locale: es })
											) : (
												<span>Selecciona la fecha</span>
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

				<Button type="submit" disabled={uploading || !selectedFile}>
					{uploading ? "Subiendo..." : "Subir documento"}
				</Button>

				{message && <p className="text-sm text-muted-foreground">{message}</p>}
			</form>
		</Form>
	)
}
