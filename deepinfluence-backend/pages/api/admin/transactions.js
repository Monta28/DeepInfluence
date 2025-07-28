// pages/api/admin/transactions.js
import prisma from '../../../lib/prisma.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Méthode non autorisée' });
  const items = await prisma.transaction.findMany({ orderBy: { createdAt: 'desc' } });
  return res.status(200).json(items);
}
