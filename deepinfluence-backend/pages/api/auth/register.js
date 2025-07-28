import prisma from '../../../lib/prisma.js';
import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken, setRefreshCookie } from '../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Méthode non autorisée' });

  const { email, password, firstName, lastName, provider, socialId } = req.body || {};
  if (!email) return res.status(400).json({ message: 'email requis' });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ message: 'Email déjà utilisé' });

  let data = { email, firstName: firstName || '', lastName: lastName || '' };
  if (provider && socialId) {
    if (provider === 'google') data.googleId = socialId;
    if (provider === 'facebook') data.facebookId = socialId;
    data.password = '';
  } else {
    if (!password) return res.status(400).json({ message: 'password requis' });
    data.password = await bcrypt.hash(password, 10);
  }

  const user = await prisma.user.create({ data });
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  setRefreshCookie(res, refreshToken);

  return res.status(201).json({ accessToken, user: { id: user.id, role: user.role, email: user.email } });
}
