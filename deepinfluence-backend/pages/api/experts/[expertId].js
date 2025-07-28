// pages/api/experts/[expertId].js
import prisma from '../../../lib/prisma.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Méthode non autorisée' });
  const { expertId } = req.query;
  const expert = await prisma.expertDetails.findUnique({
    where: { id: String(expertId) },
    include: { user: true, services: true, formations: true, experioVideos: true }
  });
  if (!expert) return res.status(404).json({ message: 'Expert introuvable' });
  return res.status(200).json(expert);
}
