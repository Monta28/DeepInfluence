// pages/api/formations/index.js
import prisma from '../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const items = await prisma.formation.findMany({
      include: { expert: { include: { user: true } }, sessions: true }
    });
    return res.status(200).json(items);
  }
  if (req.method === 'POST') {
    const userId = getUserIdFromReq(req);
    if (!userId) return res.status(401).json({ message: 'Non authentifié' });
    const expert = await prisma.expertDetails.findUnique({ where: { userId } });
    if (!expert) return res.status(400).json({ message: 'Profil expert manquant' });

    const { title, description, type, priceInCoins } = req.body || {};
    if (!title || !type || typeof priceInCoins === 'undefined') return res.status(400).json({ message: 'title, type, priceInCoins requis' });

    const created = await prisma.formation.create({
      data: { expertId: expert.id, title, description, type, priceInCoins: Number(priceInCoins) }
    });
    return res.status(201).json(created);
  }
  return res.status(405).json({ message: 'Méthode non autorisée' });
}
