import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from './prisma.js';

/**
 * Issue a short-lived access token (JWT) and a long-lived refresh token.
 * NOTE: For simplicity we do not persist refresh tokens in DB here.
 * You can extend by storing hashed refresh token per user.
 */
const ACCESS_TTL = process.env.ACCESS_TOKEN_EXPIRES || '15m';
const REFRESH_TTL = process.env.REFRESH_TOKEN_EXPIRES || '30d';
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'dev_access_secret_change_me';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret_change_me';

/** Sign tokens */
export function signAccessToken(user) {
  const payload = { sub: user.id, role: user.role, email: user.email };
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_TTL });
}
export function signRefreshToken(user) {
  const payload = { sub: user.id, type: 'refresh' };
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_TTL });
}

/** Verify tokens */
export function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}
export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}

/** Set/Clear refresh cookie */
export function setRefreshCookie(res, refreshToken) {
  const c = cookie.serialize('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30d
  });
  res.setHeader('Set-Cookie', c);
}
export function clearRefreshCookie(res) {
  const c = cookie.serialize('refreshToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  res.setHeader('Set-Cookie', c);
}

/** Extract Bearer token */
export function getBearerToken(req) {
  const auth = req.headers['authorization'] || req.headers['Authorization'];
  if (!auth || typeof auth !== 'string') return null;
  const parts = auth.split(' ');
  if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
  return null;
}

/**
 * Return current user (id, role) from Authorization: Bearer <token>.
 * Falls back to x-user-id (dev mode) if no JWT is provided.
 */
export async function getAuthUser(req) {
  try {
    const token = getBearerToken(req);
    if (token) {
      const decoded = verifyAccessToken(token);
      return { id: decoded.sub, role: decoded.role || 'USER', email: decoded.email };
    }
  } catch {}
  // Fallback DEV header (optional)
  const id = req.headers['x-user-id'];
  if (typeof id === 'string') {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) return { id: user.id, role: user.role, email: user.email };
  }
  return null;
}

/** Require auth helper; optionally enforce roles */
export async function requireAuth(req, res, roles = null) {
  const u = await getAuthUser(req);
  if (!u) {
    res.status(401).json({ message: 'Non authentifié' });
    return null;
  }
  if (Array.isArray(roles) && roles.length > 0 && !roles.includes(u.role)) {
    res.status(403).json({ message: 'Accès interdit (rôle)' });
    return null;
  }
  return u;
}
