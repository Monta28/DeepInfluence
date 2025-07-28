// pages/api/formations/[formationId]/sessions/index.js
import prisma from '../../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../../lib/auth.js';

/**
 * GET  /api/formations/{formationId}/sessions  -> liste des sessions
 * POST /api/formations/{formationId}/sessions  -> créer une session (expert propriétaire)
 */
export default async function handler(req, res) {
  const { formationId } = req.query;
  if (!formationId) return res.status(400).json({ message: 'formationId requis' });

  if (req.method === 'GET') {
    const sessions = await prisma.formationSession.findMany({
      where: { formationId: String(formationId) },
      orderBy: { startTime: 'asc' }
    });
    return res.status(200).json(sessions);
  }

  if (req.method === 'POST') {
    const userId = getUserIdFromReq(req);
    if (!userId) return res.status(401).json({ message: 'Non authentifié' });

    const formation = await prisma.formation.findUnique({ where: { id: String(formationId) } });
    if (!formation) return res.status(404).json({ message: 'Formation introuvable' });

    const expert = await prisma.expertDetails.findUnique({ where: { id: formation.expertId } });
    if (!expert || expert.userId !== userId) return res.status(403).json({ message: 'Accès interdit' });

    const { title, startTime, endTime, location } = req.body || {};
    if (!title || !startTime || !endTime) {
      return res.status(400).json({ message: 'title, startTime et endTime requis' });
    }

    const created = await prisma.formationSession.create({
      data: {
        formationId: formation.id,
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        location: location || null,
      }
    });
    return res.status(201).json(created);
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}
