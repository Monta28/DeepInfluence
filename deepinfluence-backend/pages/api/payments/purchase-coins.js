// pages/api/payments/purchase-coins.js
import prisma from '../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Méthode non autorisée' });
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const { amountCoins, amountReal } = req.body || {};
  if (!amountCoins || !amountReal) return res.status(400).json({ message: 'amountCoins et amountReal requis' });

  const tx = await prisma.transaction.create({
    data: {
      userId,
      type: 'PURCHASE',
      amountCoins: Number(amountCoins),
      amountReal: amountReal,
      status: 'PENDING'
    }
  });
  return res.status(201).json({ message: 'Intent de paiement créée', transactionId: tx.id, checkoutUrl: 'https://example.com/checkout/' + tx.id });
}
