# Deep Influent Backend

Backend API pour la plateforme Deep Influent - Une plateforme de mise en relation entre utilisateurs et experts dans différents domaines.

## Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma** - ORM pour la base de données
- **SQLite** - Base de données
- **JWT** - Authentification
- **bcryptjs** - Hachage des mots de passe
- **CORS** - Gestion des requêtes cross-origin

## Installation et configuration

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement**
   
   Le fichier `.env` est déjà configuré avec les valeurs par défaut :
   ```
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="deep_influent_super_secret_key_2024"
   JWT_EXPIRES_IN="7d"
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL="http://localhost:3000"
   ```

3. **Générer le client Prisma**
   ```bash
   npm run db:generate
   ```

4. **Créer et synchroniser la base de données**
   ```bash
   npm run db:push
   ```

5. **Peupler la base de données avec des données de test**
   ```bash
   npm run db:seed
   ```

6. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

Le serveur sera accessible sur `http://localhost:3001`

## Scripts disponibles

- `npm start` - Démarre le serveur en mode production
- `npm run dev` - Démarre le serveur en mode développement avec nodemon
- `npm run db:generate` - Génère le client Prisma
- `npm run db:push` - Synchronise le schéma avec la base de données
- `npm run db:seed` - Peuple la base de données avec des données de test
- `npm run db:reset` - Remet à zéro la base de données et la repeuple

## Structure du projet

```
backend/
├── prisma/
│   ├── schema.prisma      # Schéma de la base de données
│   └── seed.js           # Script de peuplement
├── src/
│   ├── controllers/      # Contrôleurs par domaine
│   │   ├── auth/
│   │   ├── users/
│   │   ├── experts/
│   │   ├── formations/
│   │   ├── videos/
│   │   ├── appointments/
│   │   └── messages/
│   ├── middleware/       # Middlewares (auth, etc.)
│   ├── routes/          # Routes API
│   ├── services/        # Services (database, etc.)
│   ├── utils/           # Utilitaires (JWT, response, etc.)
│   └── server.js        # Point d'entrée du serveur
├── .env                 # Variables d'environnement
└── package.json
```

## API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/me` - Profil utilisateur connecté
- `POST /api/auth/logout` - Déconnexion
- `POST /api/auth/refresh` - Rafraîchir le token

### Experts
- `GET /api/experts` - Liste des experts
- `GET /api/experts/:id` - Détail d'un expert
- `POST /api/experts` - Créer un profil expert (authentifié)
- `PUT /api/experts/:id` - Modifier un profil expert (authentifié)
- `GET /api/experts/categories` - Catégories d'experts

### Formations
- `GET /api/formations` - Liste des formations
- `GET /api/formations/:id` - Détail d'une formation
- `POST /api/formations` - Créer une formation (expert)
- `POST /api/formations/:id/enroll` - S'inscrire à une formation (authentifié)
- `GET /api/formations/my` - Mes formations (authentifié)

### Vidéos
- `GET /api/videos` - Liste des vidéos
- `GET /api/videos/:id` - Détail d'une vidéo
- `POST /api/videos/:id/like` - Liker une vidéo (authentifié)

### Rendez-vous
- `GET /api/appointments` - Mes rendez-vous (authentifié)
- `POST /api/appointments` - Créer un rendez-vous (authentifié)

### Utilisateurs
- `GET /api/users/profile` - Mon profil (authentifié)
- `PUT /api/users/profile` - Modifier mon profil (authentifié)
- `GET /api/users/stats` - Mes statistiques (authentifié)

### Messages
- `GET /api/messages/conversations` - Mes conversations (authentifié)
- `GET /api/messages/conversation/:id` - Messages d'une conversation (authentifié)
- `POST /api/messages/conversation/:id` - Envoyer un message (authentifié)

## Données de test

Le script de seeding crée automatiquement :
- 10 utilisateurs normaux
- 8 experts dans différents domaines
- 5 formations
- 6 vidéos
- Inscriptions, rendez-vous, avis et transactions

### Comptes de test

**Utilisateurs normaux :**
- Email : `user1@email.com` à `user10@email.com`
- Mot de passe : `password123`

**Experts :**
- Email : `sarah.martin@email.com` (Psychologue)
- Email : `marc.dubois@email.com` (Coach Business)
- Email : `sophie.laurent@email.com` (Développement Personnel)
- Email : `ahmed.hassan@email.com` (Marketing Digital)
- Email : `claire.rousseau@email.com` (Développeuse)
- Email : `thomas.bernard@email.com` (Conseiller Financier)
- Email : `emma.wilson@email.com` (Nutritionniste)
- Email : `julie.lambert@email.com` (Coach Fitness)
- Mot de passe : `password123`

## Sécurité

- Authentification JWT
- Hachage des mots de passe avec bcrypt
- Validation des données d'entrée
- Rate limiting
- Headers de sécurité avec Helmet
- CORS configuré

## Base de données

Le projet utilise SQLite avec Prisma ORM. Le fichier de base de données `dev.db` est créé automatiquement lors du premier lancement.

### Modèles principaux

- **User** - Utilisateurs de la plateforme
- **Expert** - Profils d'experts
- **Formation** - Formations proposées
- **Video** - Vidéos éducatives
- **Appointment** - Rendez-vous
- **Message** - Messages entre utilisateurs
- **Review** - Avis et évaluations
- **Transaction** - Historique des transactions

## Développement

Pour contribuer au projet :

1. Cloner le repository
2. Installer les dépendances
3. Configurer la base de données
4. Lancer les tests (à implémenter)
5. Créer une pull request

## Support

Pour toute question ou problème, veuillez créer une issue sur le repository du projet.

