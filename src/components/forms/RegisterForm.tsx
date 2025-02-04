"use client"

import { registerSchema } from "@/lib/form-schemas/register-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "@/lib/auth-client"
import { useToast } from "@/hooks/use-toast"
import { formatRut } from "@/lib/formatRut"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useState } from "react"
import Link from "next/link"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Form,
	FormItem,
	FormLabel,
	FormField,
	FormControl,
	FormMessage,
} from "@/components/ui/form"

export default function RegisterForm(): React.ReactElement {
	const [loading, setLoading] = useState(false)

	const { toast } = useToast()
	const router = useRouter()

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			rut: "",
			name: "",
			email: "",
			password: "",
		},
	})

	async function onSubmit(values: z.infer<typeof registerSchema>) {
		await authClient.signUp.email(
			{
				email: values.email,
				password: values.password,
				name: values.name,
				rut: values.rut,
			},
			{
				onRequest: () => {
					setLoading(true)
				},
				onSuccess: () => {
					setLoading(false)

					toast({
						title: "Cuenta creada",
						description: "Tu cuenta ha sido creada exitosamente",
						duration: 3000,
					})

					router.push("/dashboard/permiso-trabajo")
				},
				onError: (ctx) => {
					setLoading(false)
					toast({
						title: "Error",
						description: ctx.error.message,
						variant: "destructive",
						duration: 4000,
					})
				},
			}
		)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3 md:grid-cols-2">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Nombre de la empresa</FormLabel>
							<FormControl>
								<Input
									className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
									placeholder="Nombre de la empresa"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Email</FormLabel>
							<FormControl>
								<Input
									className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
									placeholder="Email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-gray-700">Contaseña</FormLabel>
							<FormControl>
								<Input
									type="password"
									className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
									placeholder="Contraseña"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="rut"
					render={({ field }) => {
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						const { onChange, ...restFieldProps } = field

						return (
							<FormItem>
								<FormLabel className="text-gray-700">RUT de la empresa</FormLabel>
								<FormControl>
									<Input
										className="w-full rounded-md border-gray-200 bg-white text-sm text-gray-700"
										onChange={(e) => {
											field.onChange(formatRut(e.target.value))
										}}
										placeholder="RUT de la empresa"
										{...restFieldProps}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)
					}}
				/>

				<Button className="mt-4 md:col-span-2" type="submit" disabled={loading}>
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
						"Crear cuenta"
					)}
				</Button>

				<p className="mt-4 text-sm text-gray-500 sm:mt-0">
					¿Ya tienes una cuenta?{" "}
					<Link href="/auth/login" className="text-gray-700 underline">
						Inicia sesión
					</Link>
				</p>
			</form>
		</Form>
	)
}
