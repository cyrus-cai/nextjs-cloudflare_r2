import { NextRequest, NextResponse } from 'next/server'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com` || '',
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
});

export async function POST(request: NextRequest) {
    const data = await request.formData();

    const file: File | null = data.get('file') as unknown as File;

    if (!file || file.size > 2000000) {
        return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await S3.send(
        new PutObjectCommand({
            Body: buffer,
            Bucket: process.env.R2_BUCKET_NAME || '',
            Key: file.name,
            ContentType: file.type,
        })
    );
    return NextResponse.json({ success: true });
}
