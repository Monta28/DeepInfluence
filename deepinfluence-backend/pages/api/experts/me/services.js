// pages/api/experts/me/services.js
import prisma from '../../../../lib/prisma.js';
import { getUserIdFromReq } from '../../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Méthode non autorisée' });
  const userId = getUserIdFromReq(req);
  if (!userId) return res.status(401).json({ message: 'Non authentifié' });

  const { services } = req.body || {}; // [{ type: 'TEXT_MESSAGE', priceInCoins: 100 }, ...]
  const expert = await prisma.expertDetails.findUnique({ where: { userId } });
  if (!expert) return res.status(400).json({ message: 'ExpertDetails inexistant (demandez la validation)' });

  const ops = (services || []).map(s =>
    prisma.service.upsert({
      where: { expertId_type: { expertId: expert.id, type: s.type } },
      create: { expertId: expert.id, type: s.type, priceInCoins: s.priceInCoins || 0 },
      update: { priceInCoins: s.priceInCoins || 0 }
    })
  );
  await prisma.$transaction(ops);
  const list = await prisma.service.findMany({ where: { expertId: expert.id } });
  return res.status(200).json({ message: 'Tarifs mis à jour', services: list });
}
