import { FileVideo } from "lucide-react"

export default function Video(): React.ReactElement {
	return (
		<div className="relative mx-auto aspect-video h-full w-full max-w-screen-xl rounded-md bg-neutral-300 shadow">
			<FileVideo className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform text-neutral-600" />
		</div>
	)
}
