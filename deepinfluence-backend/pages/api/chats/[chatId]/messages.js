// pages/api/chats/[chatId]/messages.js
import prisma from '../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../lib/auth.js';

export default async function handler(req, res) {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });
  const { chatId } = req.query;

  if (req.method === 'GET') {
    const messages = await prisma.message.findMany({
      where: { chatId: String(chatId) },
      orderBy: { createdAt: 'asc' }
    });
    return res.status(200).json(messages);
  }

  if (req.method === 'POST') {
    const { contentType = 'TEXT', content } = req.body || {};
    // Vérifier que l'utilisateur est participant
    const chat = await prisma.chat.findUnique({
      where: { id: String(chatId) },
      include: { participants: { where: { id: userId } } }
    });
    if (!chat || chat.participants.length === 0) {
      return res.status(403).json({ message: 'Accès interdit' });
    }
    const msg = await prisma.message.create({
      data: { chatId: String(chatId), senderId: userId, contentType, content }
    });
    return res.status(201).json(msg);
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}
