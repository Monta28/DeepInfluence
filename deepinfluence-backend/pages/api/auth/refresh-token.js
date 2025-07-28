import { verifyRefreshToken, signAccessToken, signRefreshToken, setRefreshCookie } from '../../../lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Méthode non autorisée' });

  const cookies = req.headers.cookie || '';
  const refreshCookie = cookies.split(';').map(s=>s.trim()).find(s=>s.startsWith('refreshToken='));
  if (!refreshCookie) return res.status(401).json({ message: 'Aucun refresh token' });
  const token = decodeURIComponent(refreshCookie.split('=')[1]);

  try {
    const decoded = verifyRefreshToken(token);
    // Rotate refresh token (stateless)
    const user = { id: decoded.sub, role: decoded.role || 'USER', email: decoded.email };
    const newAccess = signAccessToken(user);
    const newRefresh = signRefreshToken(user);
    setRefreshCookie(res, newRefresh);
    return res.status(200).json({ accessToken: newAccess });
  } catch (e) {
    return res.status(401).json({ message: 'Refresh token invalide / expiré' });
  }
}
