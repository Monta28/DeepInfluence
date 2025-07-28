// pages/api/videos/index.js
import prisma from '../../../lib/prisma.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { expertId, search, limit = 20, offset = 0, order = 'newest' } = req.query;
    const where = {
      AND: [
        expertId ? { expertId: String(expertId) } : {},
        search ? { OR: [
          { title: { contains: String(search), mode: 'insensitive' } },
          { description: { contains: String(search), mode: 'insensitive' } }
        ] } : {}
      ]
    };
    const orderBy = order === 'oldest' ? { createdAt: 'asc' } : { createdAt: 'desc' };
    const [items, total] = await Promise.all([
      prisma.experioVideo.findMany({
        where, orderBy, skip: Number(offset)||0, take: Math.min(100, Math.max(1, Number(limit)||20)),
        include: { expert: { include: { user: true } } }
      }),
      prisma.experioVideo.count({ where })
    ]);
    return res.status(200).json({ data: items, meta: { total } });
  }

  if (req.method === 'POST') {
    const { expertId, videoUrl, title, description } = req.body || {};
    if (!expertId || !videoUrl || !title) return res.status(400).json({ message: 'expertId, videoUrl, title requis' });
    const created = await prisma.experioVideo.create({ data: { expertId, videoUrl, title, description } });
    return res.status(201).json(created);
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}
