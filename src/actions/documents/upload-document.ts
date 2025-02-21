"use server"

import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { S3, S3_BUCKET } from "@/lib/s3-client"

export async function uploadDocument(filenames: string[]) {
	try {
		const urls = await Promise.all(
			filenames.map(async (filename) => {
				const url = await getSignedUrl(
					S3,
					new PutObjectCommand({
						Bucket: S3_BUCKET,
						Key: filename,
					}),
					{
						expiresIn: 600,
					}
				)

				return url
			})
		)

		return Response.json({ urls })
	} catch (error: unknown) {
		console.log(error)
		return Response.json({ error: (error as Error).message })
	}
}
