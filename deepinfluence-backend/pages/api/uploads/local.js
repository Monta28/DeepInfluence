// pages/api/uploads/local.js
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import formidable from 'formidable';
import { requireAuth } from '../../../lib/auth.js';

export const config = {
  api: { bodyParser: false },
};

const ALLOWED_TYPES = new Set([
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/quicktime',
]);

export default async function handler(req, res) {
  const user = await requireAuth(req, res);
  if (!user) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const outDir = path.join(process.cwd(), 'public', 'uploads', 'videos');
  await fsp.mkdir(outDir, { recursive: true });

  const form = formidable({
    multiples: false,
    maxFileSize: 500 * 1024 * 1024, // 500MB
    filter: ({ mimetype }) => ALLOWED_TYPES.has(mimetype || ''),
    keepExtensions: true,
  });

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const file = files.file || files.video;
    if (!file) return res.status(400).json({ message: 'Aucun fichier (champ "file")' });

    const f = Array.isArray(file) ? file[0] : file;
    const tmpPath = f.filepath || f.file?.filepath || f._writeStream?.path;
    if (!tmpPath) return res.status(400).json({ message: 'Fichier invalide' });

    const origName = (f.originalFilename || 'video').replace(/[^\w.\-]+/g, '_');
    const unique = `${user.id}_${Date.now()}_${origName}`;
    const destPath = path.join(outDir, unique);

    await fsp.rename(tmpPath, destPath);

    const publicUrl = `/uploads/videos/${unique}`;

    return res.status(201).json({
      message: 'Upload réussi',
      publicUrl,
      filename: unique,
      size: f.size,
      mime: f.mimetype,
      fields,
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(400).json({ message: 'Upload invalide ou type non autorisé' });
  }
}
