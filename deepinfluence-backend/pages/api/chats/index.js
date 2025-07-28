// pages/api/chats/index.js
import prisma from '../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../lib/auth.js';

/**
 * GET  /api/chats          -> liste des chats de l'utilisateur
 * POST /api/chats          -> créer un chat avec un ou plusieurs participants (ids)
 *   body: { participantIds: string[] }
 */
export default async function handler(req, res) {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  if (req.method === 'GET') {
    const chats = await prisma.chat.findMany({
      where: { participants: { some: { id: userId } } },
      include: {
        participants: true,
        messages: { orderBy: { createdAt: 'desc' }, take: 1 }
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(chats);
  }

  if (req.method === 'POST') {
    const { participantIds } = req.body || {};
    if (!Array.isArray(participantIds) || participantIds.length === 0) {
      return res.status(400).json({ message: 'participantIds[] requis' });
    }

    const participantsConnect = [{ id: userId }, *[...new Set(participantIds)].filter(pid => pid !== userId).map(id => ({ id }))];

    const created = await prisma.chat.create({
      data: {
        participants: { connect: participantsConnect }
      },
      include: { participants: true }
    });
    return res.status(201).json(created);
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}
