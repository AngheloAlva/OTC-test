import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

//! Uncomment the following line if you need to use local environment variables - Probably to seed the database
// import { config } from "dotenv"
// config({ path: ".env.local" })

const client = createClient({
	url: process.env.TURSO_DATABASE_URL!,
	authToken: process.env.TURSO_AUTH_TOKEN!,
})

export const db = drizzle(client)
