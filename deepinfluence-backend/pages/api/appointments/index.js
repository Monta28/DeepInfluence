// pages/api/appointments/index.js
import prisma from '../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Méthode non autorisée' });
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const { expertId, startTime, endTime, priceInCoins } = req.body || {};
  if (!expertId || !startTime || !endTime || !priceInCoins) {
    return res.status(400).json({ message: 'expertId, startTime, endTime, priceInCoins requis' });
  }

  // Vérifier solde
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.coinsBalance < Number(priceInCoins)) {
    return res.status(400).json({ message: 'Solde insuffisant' });
  }

  const appt = await prisma.$transaction(async (tx) => {
    const created = await tx.appointment.create({
      data: {
        clientId: userId,
        expertId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        priceInCoins: Number(priceInCoins),
        status: 'PENDING'
      }
    });
    // Réserver coins (débit immédiat)
    await tx.user.update({
      where: { id: userId },
      data: { coinsBalance: { decrement: Number(priceInCoins) } }
    });
    // Créer transaction liée
    await tx.transaction.create({
      data: {
        userId,
        type: 'PAYMENT',
        amountCoins: Number(priceInCoins),
        status: 'PENDING',
        appointmentId: created.id
      }
    });
    return created;
  });

  return res.status(201).json(appt);
}
