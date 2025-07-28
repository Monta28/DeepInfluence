// pages/api/users/me.js
import prisma from '../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../lib/auth.js';

export default async function handler(req, res) {
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié (x-user-id manquant)' });

  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { expertDetails: true }
    });
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    return res.status(200).json(user);
  }

  if (req.method === 'PUT') {
    const { firstName, lastName, bio, profilePictureUrl } = req.body || {};
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName, bio, profilePictureUrl }
    });
    return res.status(200).json(updated);
  }

  return res.status(405).json({ message: 'Méthode non autorisée' });
}
