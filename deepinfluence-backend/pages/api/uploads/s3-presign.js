import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { requireAuth } from '../../../lib/auth.js';

const s3 = new S3Client({ region: process.env.AWS_REGION });

export default async function handler(req, res) {
  const user = await requireAuth(req, res); // any authenticated user
  if (!user) return;

  if (req.method !== 'POST') return res.status(405).json({ message: 'Méthode non autorisée' });

  const { fileName, fileType, folder } = req.body || {};
  if (!fileName || !fileType) return res.status(400).json({ message: 'fileName et fileType requis' });

  const Bucket = process.env.AWS_S3_BUCKET;
  const Key = `${folder ? folder.replace(/\/+$/,'')+'/' : ''}${user.id}/${Date.now()}_${fileName}`;

  const command = new PutObjectCommand({
    Bucket, Key, ContentType: fileType, ACL: 'public-read'
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // 5 minutes

  const publicBase = process.env.AWS_S3_PUBLIC_BASE || `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com`;
  const publicUrl = `${publicBase}/${Key}`;

  return res.status(200).json({ uploadUrl, publicUrl, bucket: Bucket, key: Key });
}
