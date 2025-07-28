// pages/api/payments/me/transactions.js
import prisma from '../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Méthode non autorisée' });
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const items = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
  return res.status(200).json(items);
}
