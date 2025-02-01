import type { auth } from "@/lib/auth"
import { NextResponse, type NextRequest } from "next/server"

type Session = typeof auth.$Infer.Session

export default async function authMiddleware(request: NextRequest) {
	const { data: session }: { data: Session } = await fetch("/api/auth/get-session", {
		method: "POST",
		body: JSON.stringify({
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: request.headers.get("cookie") || "",
			},
		}),
	}).then((res) => res.json())

	if (!session) {
		return NextResponse.redirect(new URL("/sign-in", request.url))
	}
	return NextResponse.next()
}

export const config = {
	matcher: ["/dashboard/*"],
}
