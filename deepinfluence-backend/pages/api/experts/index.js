// pages/api/experts/index.js
import prisma from '../../../lib/prisma.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Méthode non autorisée' });

  const { q, field, limit = 20, offset = 0 } = req.query;
  const where = {
    validationStatus: 'APPROVED',
    ...(field ? { expertiseFields: { has: String(field) } } : {}),
    ...(q ? { user: { OR: [
      { firstName: { contains: String(q), mode: 'insensitive' } },
      { lastName: { contains: String(q), mode: 'insensitive' } },
      { bio: { contains: String(q), mode: 'insensitive' } }
    ] } } : {})
  };

  const [items, total] = await Promise.all([
    prisma.expertDetails.findMany({
      where,
      include: { user: true, services: true, formations: true },
      skip: Number(offset) || 0,
      take: Math.min(100, Math.max(1, Number(limit) || 20))
    }),
    prisma.expertDetails.count({ where })
  ]);

  return res.status(200).json({ data: items, meta: { total } });
}
