import Video from "@/components/sections/video/Video"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SafetyVideoPage() {
	return (
		<main className="flex flex-col items-center gap-8 p-8">
			<Video />

			<Link href={"/dashboard/video-seguridad/cuestionario"}>
				<Button size={"lg"}>Comenzar cuestionario</Button>
			</Link>
		</main>
	)
}
