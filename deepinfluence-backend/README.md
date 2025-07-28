# DeepInfluence Backend (Next.js)

Ce projet constitue un squelette de backend RESTful basé sur **Next.js** qui expose des points de terminaison décrits dans le cahier des charges. Il utilise **Prisma** comme ORM pour PostgreSQL et fournit une interface **Swagger** pour explorer et tester l’API.

## Pré‑requis

* [Node.js](https://nodejs.org/) (v18 ou plus récent). Les versions plus récentes sont compatibles avec Next 13.
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/) pour gérer les dépendances.
* Une base de données PostgreSQL. Vous devrez fournir une chaîne de connexion dans le fichier `.env`.

## Installation

1. **Cloner le dépôt** ou copier ces fichiers dans le dossier de votre choix.
2. **Se placer dans le dossier du backend** :

   ```bash
   cd deepinfluence-backend
   ```

3. **Créer un fichier `.env`** en s’inspirant de `.env.example` :

   ```bash
   cp .env.example .env
   # puis éditez .env pour renseigner votre URL PostgreSQL
   ```

4. **Installer les dépendances** :

   ```bash
   npm install
   # ou yarn install
   ```

5. **Générer le client Prisma** et appliquer les migrations** :

   ```bash
   npm run prisma:gencode
   npm run prisma:migrate
   ```

6. **Démarrer le serveur de développement** :

   ```bash
   npm run dev
   ```

L’API sera disponible par défaut sur [http://localhost:3000/api](http://localhost:3000/api). L’interface Swagger est exposée à l’adresse [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Structure des dossiers

```
deepinfluence-backend
├── prisma/                # Contient le fichier schema.prisma
├── lib/
│   ├── prisma.js         # Instancie un client Prisma
│   └── swaggerSpec.js    # Spécification OpenAPI de l’API
├── pages/
│   ├── api/              # Tous les points de terminaison API REST
│   │   ├── auth/
│   │   ├── users/
│   │   ├── experts/
│   │   ├── appointments/
│   │   ├── chats/
│   │   ├── formations/
│   │   ├── payments/
│   │   └── admin/
│   ├── api-docs.js       # Page Next.js qui affiche Swagger UI
│   └── ...
├── .env.example
├── package.json
├── next.config.js
└── README.md
```

## Utilisation de Swagger

Lorsque le serveur tourne en mode développement, rendez‑vous sur `/api-docs` pour accéder à l’interface Swagger. Cette page charge dynamiquement la spécification OpenAPI à partir de `/api/swagger.json` et vous permet de tester tous les endpoints.

## Notes

* Ce projet fournit une **implémentation minimale** pour chacun des endpoints décrits. Ils retournent pour l’instant des objets JSON de base afin de vous donner un squelette fonctionnel.
* Pour les besoins réels, vous devrez ajouter la logique d’authentification (JWT, sessions), l’intégration Stripe/PayPal, la gestion des rôles, ainsi que la validation/serialisation des données d’entrée.
* Les schémas Prisma définissent la structure de la base de données; n’oubliez pas d’exécuter `npm run prisma:migrate` lorsque vous modifiez ce fichier.

Bon développement !