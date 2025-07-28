import prisma from '../../../../lib/prisma.js';

/**
 * GET /api/users/me
 * PUT /api/users/me
 *
 * Récupère ou met à jour le profil de l’utilisateur connecté. Pour
 * l’instant nous simulons un utilisateur fixe. Dans le cadre d’une
 * application réelle, un middleware d’authentification fournirait
 * l’identifiant de l’utilisateur à partir du JWT.
 */
export default async function handler(req, res) {
  // Simuler un identifiant d’utilisateur (à remplacer par l’auth réelle)
  const userId = req.headers['x-user-id'] || '00000000-0000-0000-0000-000000000000';

  if (req.method === 'GET') {
    return res.status(200).json({ message: 'Profil utilisateur récupéré', userId });
  }

  if (req.method === 'PUT') {
    return res.status(200).json({ message: 'Profil utilisateur mis à jour', userId });
  }
  return res.status(405).json({ message: 'Méthode non autorisée' });
}