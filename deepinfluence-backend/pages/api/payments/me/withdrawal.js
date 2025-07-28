// pages/api/payments/me/withdrawal.js
import prisma from '../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Méthode non autorisée' });
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const { amountReal } = req.body || {};
  if (!amountReal) return res.status(400).json({ message: 'amountReal requis' });

  const tx = await prisma.transaction.create({
    data: { userId, type: 'WITHDRAWAL', amountCoins: 0, amountReal, status: 'PENDING' }
  });
  return res.status(201).json(tx);
}
