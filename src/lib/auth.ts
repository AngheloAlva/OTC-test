import { user, account, session, verification } from "@/db/schemas/auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { admin } from "better-auth/plugins"
import { betterAuth } from "better-auth"
import { db } from "@/db"

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: {
			user,
			account,
			session,
			verification,
		},
	}),
	emailAndPassword: {
		enabled: true,
	},
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60,
		},
	},
	user: {
		additionalFields: {
			rut: {
				type: "string",
				required: true,
				unique: true,
			},
			otNumber: {
				type: "string",
				required: true,
				unique: true,
			},
		},
	},
	plugins: [nextCookies(), admin()],
	baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
})
