// pages/api/users/me/become-expert.js
import prisma from '../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Méthode non autorisée' });
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const exists = await prisma.expertDetails.findUnique({ where: { userId } });
  if (exists) return res.status(200).json({ message: 'Demande déjà existante', status: exists.validationStatus });

  const created = await prisma.expertDetails.create({
    data: { userId, validationStatus: 'PENDING', expertiseFields: [] }
  });
  return res.status(201).json({ message: 'Demande enregistrée', expertDetailsId: created.id });
}
