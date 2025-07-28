// lib/swaggerSpec.js
const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'DeepInfluence API',
    version: '1.4.0',
    description:
      'Documentation complète avec JWT (Bearer), Upload local (multipart/form-data) et l’ensemble des endpoints.'
  },
  servers: [{ url: '/api', description: 'Base path (Next.js)' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
    }
  },
  security: [{ bearerAuth: [] }],
  tags: [
    { name: 'Auth', description: 'Authentification (JWT) & sessions' },
    { name: 'Users', description: 'Gestion des comptes utilisateurs' },
    { name: 'Experts', description: 'Profils experts & services' },
    { name: 'Appointments', description: 'Rendez-vous (client/expert)' },
    { name: 'Chats', description: 'Messagerie et conversations' },
    { name: 'Formations', description: 'Formations & sessions' },
    { name: 'Payments', description: 'Coins, retraits, transactions' },
    { name: 'Admin', description: 'Administration' },
    { name: 'Videos', description: 'Vidéos Experio' },
    { name: 'Uploads', description: 'Upload de vidéos' },
  ],
  paths: {
    // AUTH
    '/auth/register': { post: { tags: ['Auth'], summary: 'Inscription (local ou social)', security: [], responses: { 201: { description: 'OK' } } } },
    '/auth/login':    { post: { tags: ['Auth'], summary: 'Connexion (local ou social)',  security: [], responses: { 200: { description: 'OK' } } } },
    '/auth/refresh-token': { post: { tags: ['Auth'], summary: 'Refresh token', security: [], responses: { 200: { description: 'OK' } } } },
    '/auth/logout':   { post: { tags: ['Auth'], summary: 'Déconnexion', responses: { 200: { description: 'OK' } } } },

    // USERS
    '/users/me': {
      get: { tags: ['Users'], summary: 'Mon profil', responses: { 200: { description: 'OK' } } },
      put: { tags: ['Users'], summary: 'MAJ profil', responses: { 200: { description: 'OK' } } },
    },
    '/users/me/become-expert': { post: { tags: ['Users'], summary: 'Devenir expert', responses: { 201: { description: 'OK' } } } },

    // EXPERTS
    '/experts': { get: { tags: ['Experts'], summary: 'Liste des experts', responses: { 200: { description: 'OK' } } } },
    '/experts/{expertId}': {
      get: { tags: ['Experts'], summary: 'Détail expert', parameters: [{ name: 'expertId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } }
    },
    '/experts/me': { put: { tags: ['Experts'], summary: 'MAJ profil expert', responses: { 200: { description: 'OK' } } } },
    '/experts/me/availability': { put: { tags: ['Experts'], summary: 'MAJ disponibilités', responses: { 200: { description: 'OK' } } } },
    '/experts/me/services': { post: { tags: ['Experts'], summary: 'MAJ tarifs', responses: { 200: { description: 'OK' } } } },
    '/experts/me/services/{serviceType}': {
      delete: { tags: ['Experts'], summary: 'Supprimer service', parameters: [{ name: 'serviceType', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } }
    },
    '/experts/me/earnings': { get: { tags: ['Experts'], summary: 'Revenus expert', responses: { 200: { description: 'OK' } } } },

    // APPOINTMENTS
    '/appointments': { post: { tags: ['Appointments'], summary: 'Créer RDV', responses: { 201: { description: 'OK' } } } },
    '/appointments/me': { get: { tags: ['Appointments'], summary: 'Mes RDV', responses: { 200: { description: 'OK' } } } },
    '/appointments/{appointmentId}': {
      get: { tags: ['Appointments'], summary: 'Détail RDV', parameters: [{ name: 'appointmentId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } },
      put: { tags: ['Appointments'], summary: 'Replanifier RDV', parameters: [{ name: 'appointmentId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } },
      delete: { tags: ['Appointments'], summary: 'Annuler RDV', parameters: [{ name: 'appointmentId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } },
    },
    '/appointments/{appointmentId}/status': {
      put: { tags: ['Appointments'], summary: 'MAJ statut RDV', parameters: [{ name: 'appointmentId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } }
    },

    // CHATS
    '/chats': {
      get: { tags: ['Chats'], summary: 'Mes chats', responses: { 200: { description: 'OK' } } },
      post:{ tags: ['Chats'], summary: 'Créer chat', responses: { 201: { description: 'OK' } } }
    },
    '/chats/{chatId}': {
      get: { tags: ['Chats'], summary: 'Détail chat', parameters: [{ name: 'chatId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } },
      delete:{ tags: ['Chats'], summary: 'Supprimer chat', parameters: [{ name: 'chatId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } }
    },
    '/chats/{chatId}/messages': {
      get: { tags: ['Chats'], summary: 'Messages', parameters: [{ name: 'chatId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } },
      post:{ tags: ['Chats'], summary: 'Envoyer message', parameters: [{ name: 'chatId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 201: { description: 'OK' } } }
    },
    '/chats/{chatId}/messages/{messageId}': {
      put: { tags: ['Chats'], summary: 'Modifier message', parameters: [{ name: 'chatId', in: 'path', required: true, schema: { type: 'string' } }, { name: 'messageId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } },
      delete:{ tags: ['Chats'], summary: 'Supprimer message', parameters: [{ name: 'chatId', in: 'path', required: true, schema: { type: 'string' } }, { name: 'messageId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } }
    },

    // FORMATIONS
    '/formations': {
      get: { tags: ['Formations'], summary: 'Liste formations', responses: { 200: { description: 'OK' } } },
      post:{ tags: ['Formations'], summary: 'Créer formation', responses: { 201: { description: 'OK' } } }
    },
    '/formations/{formationId}': {
      get: { tags: ['Formations'], summary: 'Détail formation', parameters: [{ name: 'formationId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } },
      put: { tags: ['Formations'], summary: 'MAJ formation', parameters: [{ name: 'formationId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } },
      delete:{ tags: ['Formations'], summary: 'Supprimer formation', parameters: [{ name: 'formationId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } }
    },
    '/formations/{formationId}/enroll': {
      post:{ tags: ['Formations'], summary: 'Inscription formation', parameters: [{ name: 'formationId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 201: { description: 'OK' } } }
    },
    '/formations/{formationId}/sessions': {
      get: { tags: ['Formations'], summary: 'Liste sessions', parameters: [{ name: 'formationId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } },
      post:{ tags: ['Formations'], summary: 'Créer session', parameters: [{ name: 'formationId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 201: { description: 'OK' } } }
    },
    '/formations/sessions/{sessionId}': {
      put: { tags: ['Formations'], summary: 'MAJ session', parameters: [{ name: 'sessionId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } },
      delete:{ tags: ['Formations'], summary: 'Supprimer session', parameters: [{ name: 'sessionId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } }
    },

    // PAYMENTS
    '/payments/purchase-coins': { post:{ tags: ['Payments'], summary: 'Achat coins (intent)', responses: { 201: { description: 'OK' } } } },
    '/payments/me/transactions': { get:{ tags: ['Payments'], summary: 'Mes transactions', responses: { 200: { description: 'OK' } } } },
    '/payments/me/withdrawal': { post:{ tags: ['Payments'], summary: 'Demande retrait', responses: { 201: { description: 'OK' } } } },

    // ADMIN
    '/admin/users': { get:{ tags: ['Admin'], summary: 'Tous les utilisateurs', responses: { 200: { description: 'OK' } } } },
    '/admin/experts/pending-validation': { get:{ tags: ['Admin'], summary: 'Experts en attente', responses: { 200: { description: 'OK' } } } },
    '/admin/experts/{expertId}/validate': {
      put:{ tags: ['Admin'], summary: 'Valider/Rejeter expert', parameters: [{ name: 'expertId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } }
    },
    '/admin/transactions': { get:{ tags: ['Admin'], summary: 'Transactions globales', responses: { 200: { description: 'OK' } } } },

    // VIDEOS
    '/videos': {
      get:{ tags: ['Videos'], summary: 'Liste vidéos', responses: { 200: { description: 'OK' } } },
      post:{ tags: ['Videos'], summary: 'Créer vidéo', responses: { 201: { description: 'OK' } } }
    },
    '/videos/{videoId}': {
      get:{ tags: ['Videos'], summary: 'Détail vidéo', parameters: [{ name: 'videoId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } },
      put:{ tags: ['Videos'], summary: 'MAJ vidéo', parameters: [{ name: 'videoId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } },
      delete:{ tags: ['Videos'], summary: 'Supprimer vidéo', parameters: [{ name: 'videoId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } }
    },
    '/videos/{videoId}/view': {
      patch:{ tags: ['Videos'], summary: 'Incrémenter vues', parameters: [{ name: 'videoId', in: 'path', required: true, schema: { type: 'string' } }], responses: { 200: { description: 'OK' } } }
    },

    // UPLOADS (LOCAL DISK)
    '/uploads/local': {
      post: {
        tags: ['Uploads'],
        summary: 'Uploader une vidéo en local (multipart/form-data)',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: { file: { type: 'string', format: 'binary' } },
                required: ['file']
              }
            }
          }
        },
        responses: {
          201: { description: 'Upload réussi' },
          400: { description: 'Requête invalide' },
          401: { description: 'Non authentifié' }
        }
      }
    }
  }
};

export default swaggerSpec;
