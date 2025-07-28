// pages/api/experts/me/index.js
import prisma from '../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ message: 'Méthode non autorisée' });
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const { headline, expertiseFields, linkedinUrl, instagramUrl, bio, profilePictureUrl } = req.body || {};

  const user = await prisma.user.update({
    where: { id: userId },
    data: { bio, profilePictureUrl }
  });

  const details = await prisma.expertDetails.upsert({
    where: { userId },
    update: { headline, expertiseFields, linkedinUrl, instagramUrl },
    create: { userId, headline, expertiseFields: expertiseFields || [] }
  });

  return res.status(200).json({ user, details });
}
