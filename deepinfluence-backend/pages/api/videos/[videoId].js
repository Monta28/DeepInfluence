// pages/api/videos/[videoId].js
import prisma from '../../../lib/prisma.js';

export default async function handler(req, res) {
  const { videoId } = req.query;
  if (!videoId) return res.status(400).json({ message: 'videoId requis' });

  if (req.method === 'GET') {
    const item = await prisma.experioVideo.findUnique({ where: { id: String(videoId) }, include: { expert: { include: { user: true } } } });
    if (!item) return res.status(404).json({ message: 'Vidéo introuvable' });
    return res.status(200).json(item);
  }

  if (req.method === 'PUT') {
    const { videoUrl, title, description } = req.body || {};
    try {
      const updated = await prisma.experioVideo.update({
        where: { id: String(videoId) },
        data: {
          ...(videoUrl ? { videoUrl } : {}),
          ...(title ? { title } : {}),
          ...(typeof description !== 'undefined' ? { description } : {})
        }
      });
      return res.status(200).json(updated);
    } catch (e) {
      return res.status(404).json({ message: 'Vidéo introuvable' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.experioVideo.delete({ where: { id: String(videoId) } });
      return res.status(200).json({ message: 'Vidéo supprimée' });
    } catch (e) {
      return res.status(404).json({ message: 'Vidéo introuvable' });
    }
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}
