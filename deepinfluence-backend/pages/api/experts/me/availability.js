// pages/api/experts/me/availability.js
import prisma from '../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ message: 'Méthode non autorisée' });
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const { availability } = req.body || {};
  const expert = await prisma.expertDetails.update({
    where: { userId },
    data: { availabilitySchedule: availability || {} }
  });
  return res.status(200).json(expert);
}
