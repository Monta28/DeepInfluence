// pages/api/formations/[formationId]/index.js
import prisma from '../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../lib/auth.js';

/**
 * GET /api/formations/{formationId}      -> détail
 * PUT /api/formations/{formationId}      -> mise à jour (expert propriétaire)
 * DELETE /api/formations/{formationId}   -> suppression si aucune inscription
 */
export default async function handler(req, res) {
  const { formationId } = req.query;
  if (!formationId) return res.status(400).json({ message: 'formationId requis' });

  if (req.method === 'GET') {
    const item = await prisma.formation.findUnique({
      where: { id: String(formationId) },
      include: { expert: { include: { user: true } }, sessions: true, enrollments: true }
    });
    if (!item) return res.status(404).json({ message: 'Formation introuvable' });
    return res.status(200).json(item);
  }

  if (req.method === 'PUT') {
    const userId = getUserIdFromReq(req);
    if (!userId) return res.status(401).json({ message: 'Non authentifié' });

    const form = await prisma.formation.findUnique({ where: { id: String(formationId) } });
    if (!form) return res.status(404).json({ message: 'Formation introuvable' });

    // Vérifier que l'utilisateur est l'expert propriétaire
    const expert = await prisma.expertDetails.findUnique({ where: { id: form.expertId } });
    if (!expert || expert.userId !== userId) return res.status(403).json({ message: 'Accès interdit' });

    const { title, description, type, priceInCoins } = req.body || {};
    const updated = await prisma.formation.update({
      where: { id: form.id },
      data: {
        ...(title ? { title } : {}),
        ...(typeof description !== 'undefined' ? { description } : {}),
        ...(type ? { type } : {}),
        ...(typeof priceInCoins !== 'undefined' ? { priceInCoins: Number(priceInCoins) } : {}),
      }
    });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    const userId = getUserIdFromReq(req);
    if (!userId) return res.status(401).json({ message: 'Non authentifié' });

    const form = await prisma.formation.findUnique({
      where: { id: String(formationId) },
      include: { enrollments: true }
    });
    if (!form) return res.status(404).json({ message: 'Formation introuvable' });

    const expert = await prisma.expertDetails.findUnique({ where: { id: form.expertId } });
    if (!expert || expert.userId !== userId) return res.status(403).json({ message: 'Accès interdit' });

    if (form.enrollments.length > 0) {
      return res.status(400).json({ message: 'Suppression refusée: des inscriptions existent' });
    }

    // Supprime aussi les sessions via onDelete: Cascade côté Prisma (déjà dans votre modèle Session)
    await prisma.formation.delete({ where: { id: form.id } });
    return res.status(200).json({ message: 'Formation supprimée' });
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}
