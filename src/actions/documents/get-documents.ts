"use server"

import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { S3, S3_BUCKET } from "@/lib/s3-client"

import { document } from "@/db/schemas/document"
import { eq } from "drizzle-orm"
import { db } from "@/db"

export async function getDocument(filename: string) {
	try {
		const url = await getSignedUrl(
			S3,
			new GetObjectCommand({
				Bucket: S3_BUCKET,
				Key: filename,
			}),
			{
				expiresIn: 600,
			}
		)

		return Response.json({ url })
	} catch (error: unknown) {
		return Response.json({ error: (error as Error).message })
	}
}

export const getDocuments = async (subgroupId: number) => {
	try {
		const documents = await db.select().from(document).where(eq(document.subgroupId, subgroupId))

		return {
			ok: true,
			data: documents,
		}
	} catch (error) {
		console.log(error)

		return {
			ok: false,
			error: (error as Error).message,
		}
	}
}
