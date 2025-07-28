// pages/api/admin/users.js
import prisma from '../../../lib/prisma.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Méthode non autorisée' });
  const users = await prisma.user.findMany({ include: { expertDetails: true } });
  return res.status(200).json(users);
}
