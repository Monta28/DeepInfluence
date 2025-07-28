// pages/api/experts/me/earnings.js
import prisma from '../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Méthode non autorisée' });
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const details = await prisma.expertDetails.findUnique({ where: { userId } });
  if (!details) return res.status(400).json({ message: 'Pas de profil expert' });

  const tx = await prisma.transaction.findMany({
    where: {
      OR: [
        { appointment: { expertId: details.id } },
        { formationEnrollment: { formation: { expertId: details.id } } },
        { type: 'WITHDRAWAL', userId } // retraits par l'expert
      ],
      status: { in: ['PENDING','COMPLETED'] }
    }
  });

  const totalCoins = tx.reduce((acc, t) => acc + (t.amountCoins || 0), 0);
  const completedCoins = tx.filter(t => t.status === 'COMPLETED').reduce((a, t) => a + (t.amountCoins || 0), 0);

  return res.status(200).json({ totalCoins, completedCoins, transactions: tx });
}
