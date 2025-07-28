// pages/api/admin/experts/[expertId]/validate.js
import prisma from '../../../../../lib/prisma.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ message: 'Méthode non autorisée' });
  const { expertId } = req.query;
  const { status } = req.body || {};
  if (!['APPROVED','REJECTED'].includes(status)) return res.status(400).json({ message: 'status doit être APPROVED ou REJECTED' });

  const updated = await prisma.expertDetails.update({ where: { id: String(expertId) }, data: { validationStatus: status } });
  return res.status(200).json(updated);
}
