import { clearRefreshCookie } from '../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Méthode non autorisée' });
  clearRefreshCookie(res);
  return res.status(200).json({ message: 'Déconnecté' });
}
