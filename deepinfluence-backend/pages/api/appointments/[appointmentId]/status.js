// pages/api/appointments/[appointmentId]/status.js
import prisma from '../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ message: 'Méthode non autorisée' });
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const { appointmentId } = req.query;
  const { status } = req.body || {};
  if (!status) return res.status(400).json({ message: 'status requis' });

  const appt = await prisma.appointment.findUnique({ where: { id: String(appointmentId) }, include: { transaction: true } });
  if (!appt) return res.status(404).json({ message: 'RDV introuvable' });

  // TODO: vérifier autorisations (client/expert)
  const updated = await prisma.$transaction(async (tx) => {
    const u = await tx.appointment.update({ where: { id: appt.id }, data: { status } });

    // Ajustements de transaction/solde simplifiés
    if (status === 'CANCELLED') {
      // Remboursement client si PENDING
      if (appt.transaction?.status === 'PENDING') {
        await tx.user.update({ where: { id: appt.clientId }, data: { coinsBalance: { increment: appt.priceInCoins } } });
        await tx.transaction.update({ where: { id: appt.transaction.id }, data: { status: 'FAILED' } });
      }
    }
    if (status === 'COMPLETED') {
      if (appt.transaction && appt.transaction.status === 'PENDING') {
        await tx.transaction.update({ where: { id: appt.transaction.id }, data: { status: 'COMPLETED' } });
      }
    }

    return u;
  });

  return res.status(200).json(updated);
}
