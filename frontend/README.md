# Deep Influent Frontend

Interface utilisateur pour la plateforme Deep Influent - Une plateforme de mise en relation entre utilisateurs et experts dans différents domaines.

## Technologies utilisées

- **Next.js 15** - Framework React
- **React 19** - Bibliothèque UI
- **TypeScript** - Langage typé
- **Tailwind CSS** - Framework CSS
- **React Google Maps** - Intégration cartes
- **Recharts** - Graphiques et visualisations

## Installation et configuration

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn
- Backend Deep Influent en cours d'exécution

### Étapes d'installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement**
   
   Le fichier `.env.local` est déjà configuré :
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

L'application sera accessible sur `http://localhost:3000`

## Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run lint` - Vérifie le code avec ESLint

## Structure du projet

```
frontend-updated/
├── components/           # Composants réutilisables
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ExpertCard.tsx
│   ├── FormationCard.tsx
│   ├── VideoCard.tsx
│   └── ...
├── contexts/            # Contextes React
│   └── AuthContext.tsx  # Gestion de l'authentification
├── services/            # Services API
│   └── api.ts          # Client API pour le backend
├── app/                # Pages Next.js (App Router)
│   ├── page.tsx        # Page d'accueil
│   ├── layout.tsx      # Layout principal
│   ├── signin/         # Page de connexion
│   ├── signup/         # Page d'inscription
│   ├── dashboard/      # Pages du tableau de bord
│   ├── experts/        # Pages des experts
│   ├── formations/     # Pages des formations
│   └── videos/         # Pages des vidéos
├── .env.local          # Variables d'environnement
└── package.json
```

## Fonctionnalités

### Pages publiques
- **Accueil** - Présentation de la plateforme avec listes d'experts, formations et vidéos
- **Experts** - Liste complète des experts avec filtres
- **Formations** - Catalogue des formations disponibles
- **Vidéos** - Bibliothèque de vidéos éducatives
- **Connexion/Inscription** - Authentification des utilisateurs

### Pages authentifiées (Dashboard)
- **Tableau de bord** - Vue d'ensemble des activités
- **Profil** - Gestion du profil utilisateur
- **Rendez-vous** - Gestion des consultations
- **Messages** - Messagerie avec les experts
- **Formations** - Suivi des formations suivies
- **Favoris** - Experts et contenus favoris
- **Paramètres** - Configuration du compte

### Fonctionnalités d'authentification
- Inscription utilisateur/expert
- Connexion avec JWT
- Gestion de session persistante
- Déconnexion sécurisée

### Intégration API
- Récupération dynamique des données depuis le backend
- Gestion des états de chargement et d'erreur
- Authentification automatique des requêtes
- Cache et optimisation des performances

## Configuration de l'API

Le frontend communique avec le backend via le service API (`services/api.ts`) qui gère :

- **Authentification** - Login, register, profil utilisateur
- **Experts** - Liste, détails, création de profil
- **Formations** - Catalogue, inscription, suivi
- **Vidéos** - Bibliothèque, lecture, likes
- **Rendez-vous** - Création, gestion
- **Messages** - Conversations, envoi de messages
- **Profil** - Mise à jour des informations

### Exemple d'utilisation

```typescript
import ApiService from '../services/api';

// Récupérer la liste des experts
const experts = await ApiService.getExperts({
  category: 'business',
  page: 1,
  limit: 10
});

// Connexion utilisateur
const response = await ApiService.login(email, password);
```

## Authentification

Le système d'authentification utilise :

- **Context API** - Gestion globale de l'état utilisateur
- **JWT Tokens** - Stockage sécurisé dans localStorage
- **Guards** - Protection des routes authentifiées
- **Auto-refresh** - Vérification automatique du token

### Utilisation du contexte d'authentification

```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, isLoading } = useAuth();
  
  if (isLoading) return <div>Chargement...</div>;
  
  return (
    <div>
      {user ? (
        <p>Bonjour {user.firstName}!</p>
      ) : (
        <button onClick={() => login(email, password)}>
          Se connecter
        </button>
      )}
    </div>
  );
}
```

## Styling et UI

- **Tailwind CSS** - Framework CSS utilitaire
- **Mode sombre** - Support du thème sombre
- **Responsive** - Design adaptatif mobile/desktop
- **Animations** - Transitions fluides
- **Icons** - Remix Icons

### Classes Tailwind personnalisées

Le projet utilise des classes Tailwind personnalisées pour :
- Gradients de couleurs
- Animations de chargement
- Composants réutilisables
- Thème sombre/clair

## Déploiement

### Développement local

1. S'assurer que le backend est démarré sur le port 3001
2. Lancer le frontend avec `npm run dev`
3. Accéder à `http://localhost:3000`

### Production

1. Construire l'application : `npm run build`
2. Configurer les variables d'environnement de production
3. Déployer sur Vercel, Netlify ou autre plateforme

## Données de test

Le frontend fonctionne avec les données de test du backend :

### Comptes de test disponibles

**Utilisateurs normaux :**
- Email : `user1@email.com` à `user10@email.com`
- Mot de passe : `password123`

**Experts :**
- `sarah.martin@email.com` - Psychologue clinique
- `marc.dubois@email.com` - Coach en Business
- `sophie.laurent@email.com` - Coach en Développement Personnel
- `ahmed.hassan@email.com` - Expert en Marketing Digital
- `claire.rousseau@email.com` - Développeuse Full Stack
- `thomas.bernard@email.com` - Conseiller Financier
- Mot de passe : `password123`

## Développement

### Ajout de nouvelles fonctionnalités

1. Créer les composants dans `/components`
2. Ajouter les pages dans `/app`
3. Mettre à jour le service API si nécessaire
4. Tester l'intégration avec le backend

### Bonnes pratiques

- Utiliser TypeScript pour le typage
- Créer des composants réutilisables
- Gérer les états de chargement et d'erreur
- Optimiser les performances avec React
- Suivre les conventions Next.js

## Dépannage

### Problèmes courants

**Erreur de connexion API :**
- Vérifier que le backend est démarré
- Contrôler les variables d'environnement
- Vérifier la configuration CORS

**Problème d'authentification :**
- Effacer le localStorage
- Vérifier la validité du token JWT
- Contrôler les headers d'autorisation

**Erreur de build :**
- Vérifier les imports TypeScript
- Contrôler la syntaxe des composants
- Vérifier les dépendances

## Support

Pour toute question ou problème :
1. Vérifier la documentation
2. Consulter les logs du navigateur
3. Créer une issue sur le repository

