// pages/api/chats/[chatId]/messages/[messageId].js
import prisma from '../../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../../lib/auth.js';

/**
 * PUT    /api/chats/{chatId}/messages/{messageId}    -> modifier contenu (sender uniquement)
 * DELETE /api/chats/{chatId}/messages/{messageId}    -> supprimer message (sender ou admin)
 */
export default async function handler(req, res) {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const { chatId, messageId } = req.query;
  if (!chatId || !messageId) return res.status(400).json({ message: 'chatId et messageId requis' });

  const message = await prisma.message.findUnique({ where: { id: String(messageId) } });
  if (!message || message.chatId !== chatId) return res.status(404).json({ message: 'Message introuvable' });

  if (req.method === 'PUT') {
    if (message.senderId !== userId) return res.status(403).json({ message: 'Seul l'expéditeur peut modifier' });
    const { content } = req.body || {};
    if (!content) return res.status(400).json({ message: 'content requis' });
    const updated = await prisma.message.update({ where: { id: message.id }, data: { content } });
    return res.status(200).json(updated);
  }

  if (req.method === 'DELETE') {
    if (message.senderId !== userId) return res.status(403).json({ message: 'Seul l'expéditeur peut supprimer' });
    await prisma.message.delete({ where: { id: message.id } });
    return res.status(200).json({ message: 'Message supprimé' });
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}
