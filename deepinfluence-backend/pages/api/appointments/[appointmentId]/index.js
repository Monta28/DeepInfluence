// pages/api/appointments/[appointmentId]/index.js
import prisma from '../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../lib/auth.js';

/**
 * GET    /api/appointments/{appointmentId}  -> détail
 * PUT    /api/appointments/{appointmentId}  -> replanifier (si PENDING/CONFIRMED)
 * DELETE /api/appointments/{appointmentId}  -> annuler (remboursement si tx PENDING)
 */
export default async function handler(req, res) {
  const { appointmentId } = req.query;
  if (!appointmentId) return res.status(400).json({ message: 'appointmentId requis' });

  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const appt = await prisma.appointment.findUnique({
    where: { id: String(appointmentId) },
    include: { client: true, expert: { include: { user: true } }, transaction: true }
  });
  if (!appt) return res.status(404).json({ message: 'RDV introuvable' });

  const expert = appt.expert;
  const isOwner = appt.clientId === userId || (expert && expert.userId === userId);
  if (!isOwner) return res.status(403).json({ message: 'Accès interdit' });

  if (req.method === 'GET') {
    return res.status(200).json(appt);
  }

  if (req.method === 'PUT') {
    const { startTime, endTime } = req.body || {};
    if (!startTime || !endTime) return res.status(400).json({ message: 'startTime et endTime requis' });

    if (!['PENDING', 'CONFIRMED'].includes(appt.status)) {
      return res.status(400).json({ message: 'Replanification interdite (statut actuel)' });
    }

    const updated = await prisma.appointment.update({
      where: { id: appt.id },
      data: { startTime: new Date(startTime), endTime: new Date(endTime) }
    });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    // équivalent annulation
    const updated = await prisma.$transaction(async (tx) => {
      const u = await tx.appointment.update({ where: { id: appt.id }, data: { status: 'CANCELLED' } });
      if (appt.transaction?.status === 'PENDING') {
        // rembourser le client
        await tx.user.update({ where: { id: appt.clientId }, data: { coinsBalance: { increment: appt.priceInCoins } } });
        await tx.transaction.update({ where: { id: appt.transaction.id }, data: { status: 'FAILED' } });
      }
      return u;
    });
    return res.status(200).json(updated);
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}
