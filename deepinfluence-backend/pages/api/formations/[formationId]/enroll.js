// pages/api/formations/[formationId]/enroll.js
import prisma from '../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Méthode non autorisée' });
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const { formationId } = req.query;
  const formation = await prisma.formation.findUnique({ where: { id: String(formationId) } });
  if (!formation) return res.status(404).json({ message: 'Formation introuvable' });

  // Vérifier solde
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.coinsBalance < formation.priceInCoins) {
    return res.status(400).json({ message: 'Solde insuffisant' });
  }

  const enrollment = await prisma.$transaction(async (tx) => {
    const en = await tx.formationEnrollment.create({
      data: { userId, formationId: formation.id }
    });
    await tx.user.update({ where: { id: userId }, data: { coinsBalance: { decrement: formation.priceInCoins } } });
    await tx.transaction.create({
      data: {
        userId,
        type: 'PAYMENT',
        amountCoins: formation.priceInCoins,
        status: 'COMPLETED',
        formationEnrollmentId: en.id
      }
    });
    return en;
  });

  return res.status(201).json(enrollment);
}
