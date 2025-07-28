// pages/api/auth/forgot-password.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Méthode non autorisée' });
  return res.status(200).json({ message: 'Email de réinitialisation envoyé' });
}
