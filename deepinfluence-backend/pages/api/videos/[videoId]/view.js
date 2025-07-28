// pages/api/videos/[videoId]/view.js
import prisma from '../../../../lib/prisma.js';

export default async function handler(req, res) {
  if (req.method !== 'PATCH') return res.status(405).json({ message: 'Méthode non autorisée' });
  const { videoId } = req.query;
  try {
    const updated = await prisma.experioVideo.update({ where: { id: String(videoId) }, data: { viewCount: { increment: 1 } } });
    return res.status(200).json(updated);
  } catch (e) {
    return res.status(404).json({ message: 'Vidéo introuvable' });
  }
}
