import Link from "next/link"

export default function Hero(): React.ReactElement {
	return (
		<section className="relative flex min-h-screen w-full items-center justify-center bg-[url('/images/home-hero.jpg')] bg-cover bg-center bg-no-repeat sm:items-center sm:justify-start">
			<div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:bg-gradient-to-r sm:from-gray-900/95 sm:to-gray-900/25"></div>

			<div className="relative mx-auto max-w-screen-xl px-4 sm:mx-0 sm:px-6 md:px-10 lg:flex lg:h-screen lg:items-center lg:px-16">
				<div className="max-w-xl text-center sm:text-left">
					<h1 className="text-3xl font-extrabold text-white sm:text-5xl">
						Operaciones de
						<strong className="block font-extrabold text-rose-500">Ordenes de Trabajo</strong>
					</h1>

					<p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
						Aca podras gestionar todas las ordenes de trabajo que fueron asignadas a tu empresa
					</p>

					<div className="mt-8 flex flex-wrap gap-4 text-center">
						<Link
							href="/auth/register"
							className="focus:ring-3 focus:outline-hidden block w-full rounded-sm bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-rose-700 sm:w-auto"
						>
							Registrarse
						</Link>

						<a
							href="/auth/login"
							className="focus:ring-3 focus:outline-hidden block w-full rounded-sm bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow-sm hover:text-rose-700 sm:w-auto"
						>
							Iniciar Sesión
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}
