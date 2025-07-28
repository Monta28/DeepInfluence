// pages/api/chats/[chatId]/index.js
import prisma from '../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../lib/auth.js';

/**
 * GET    /api/chats/{chatId}   -> détails du chat (participants, dernier message)
 * DELETE /api/chats/{chatId}   -> suppression du chat (si participant)
 */
export default async function handler(req, res) {
  const { chatId } = req.query;
  if (!chatId) return res.status(400).json({ message: 'chatId requis' });

  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const chat = await prisma.chat.findUnique({
    where: { id: String(chatId) },
    include: { participants: true }
  });
  if (!chat) return res.status(404).json({ message: 'Chat introuvable' });

  const isParticipant = chat.participants.some(p => p.id === userId);
  if (!isParticipant) return res.status(403).json({ message: 'Accès interdit' });

  if (req.method === 'GET') {
    const details = await prisma.chat.findUnique({
      where: { id: chat.id },
      include: {
        participants: true,
        messages: { orderBy: { createdAt: 'desc' }, take: 20 }
      }
    });
    return res.status(200).json(details);
  }

  if (req.method === 'DELETE') {
    // Supprime le chat et cascade messages (relation onDelete: Cascade côté Prisma sur Message.chat ?)
    // Dans votre schéma: Message -> chat (onDelete: Cascade), donc OK.
    await prisma.chat.delete({ where: { id: chat.id } });
    return res.status(200).json({ message: 'Chat supprimé' });
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}
