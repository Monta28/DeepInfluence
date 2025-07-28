// pages/api/appointments/me.js
import prisma from '../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Méthode non autorisée' });
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const expert = await prisma.expertDetails.findUnique({ where: { userId } });

  const items = await prisma.appointment.findMany({
    where: {
      OR: [
        { clientId: userId },
        ...(expert ? [{ expertId: expert.id }] : [])
      ]
    },
    include: { client: true, expert: { include: { user: true } }, transaction: true },
    orderBy: { startTime: 'desc' }
  });
  return res.status(200).json(items);
}
