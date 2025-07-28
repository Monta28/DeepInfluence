// pages/api/experts/me/services/[serviceType].js
import prisma from '../../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../../lib/auth.js';

/**
 * DELETE /api/experts/me/services/{serviceType}
 * Supprime un tarif/service pour l'expert connecté.
 */
export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).json({ message: 'Méthode non autorisée' });
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const { serviceType } = req.query;

  const expert = await prisma.expertDetails.findUnique({ where: { userId } });
  if (!expert) return res.status(400).json({ message: 'Profil expert manquant' });

  try {
    await prisma.service.delete({
      where: { expertId_type: { expertId: expert.id, type: String(serviceType) } }
    });
    return res.status(200).json({ message: 'Service supprimé' });
  } catch (e) {
    return res.status(404).json({ message: 'Service introuvable' });
  }
}
