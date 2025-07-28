// pages/api/formations/sessions/[sessionId].js
import prisma from '../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../lib/auth.js';

/**
 * PUT    /api/formations/sessions/{sessionId}   -> update
 * DELETE /api/formations/sessions/{sessionId}   -> delete
 */
export default async function handler(req, res) {
  const { sessionId } = req.query;
  if (!sessionId) return res.status(400).json({ message: 'sessionId requis' });

  const session = await prisma.formationSession.findUnique({ where: { id: String(sessionId) } });
  if (!session) return res.status(404).json({ message: 'Session introuvable' });

  if (req.method === 'PUT') {
    const userId = getUserIdFromReq(req);
    if (!userId) return res.status(401).json({ message: 'Non authentifié' });

    const formation = await prisma.formation.findUnique({ where: { id: session.formationId } });
    const expert = formation ? await prisma.expertDetails.findUnique({ where: { id: formation.expertId } }) : null;
    if (!expert || expert.userId !== userId) return res.status(403).json({ message: 'Accès interdit' });

    const { title, startTime, endTime, location } = req.body || {};
    const updated = await prisma.formationSession.update({
      where: { id: session.id },
      data: {
        ...(title ? { title } : {}),
        ...(startTime ? { startTime: new Date(startTime) } : {}),
        ...(endTime ? { endTime: new Date(endTime) } : {}),
        ...(typeof location !== 'undefined' ? { location } : {}),
      }
    });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    const userId = getUserIdFromReq(req);
    if (!userId) return res.status(401).json({ message: 'Non authentifié' });

    const formation = await prisma.formation.findUnique({ where: { id: session.formationId } });
    const expert = formation ? await prisma.expertDetails.findUnique({ where: { id: formation.expertId } }) : null;
    if (!expert || expert.userId !== userId) return res.status(403).json({ message: 'Accès interdit' });

    await prisma.formationSession.delete({ where: { id: session.id } });
    return res.status(200).json({ message: 'Session supprimée' });
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}
