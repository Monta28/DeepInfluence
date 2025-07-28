import prisma from '../../../lib/prisma.js';
import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken, setRefreshCookie } from '../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Méthode non autorisée' });

  const { email, password, provider, socialId } = req.body || {};
  if (!email) return res.status(400).json({ message: 'email requis' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

  if (provider) {
    const ok =
      (provider === 'google' && user.googleId && socialId === user.googleId) ||
      (provider === 'facebook' && user.facebookId && socialId === user.facebookId);
    if (!ok) return res.status(401).json({ message: 'Identifiants sociaux invalides' });
  } else {
    const ok = await bcrypt.compare(password || '', user.password || '');
    if (!ok) return res.status(401).json({ message: 'Mot de passe invalide' });
  }

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  setRefreshCookie(res, refreshToken);

  return res.status(200).json({ accessToken, user: { id: user.id, role: user.role, email: user.email } });
}
