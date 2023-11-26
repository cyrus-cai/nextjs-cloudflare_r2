import { NextRequest } from 'next/server'
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'

const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com` || '',
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
});


export async function GET(request: NextRequest) {
    const data = await S3.send(
        new GetObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: 'example.png',
        })
    );

    if (!data) {
        throw new Error('target not found.')
    }

    return new Response(data.Body?.transformToWebStream(), {
        headers: {
            'Content-Type': 'image/png',
        },
    })
}
