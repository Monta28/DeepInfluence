# Upload vidéo local (Next.js)

1) Installer la dépendance :
   ```bash
   npm i formidable
   ```

2) Déposer les fichiers du patch à la racine du backend (écraser `lib/swaggerSpec.js` si demandé).

3) Démarrer :
   ```bash
   npm run dev
   ```

4) Tester via Swagger :
   - Ouvrir `/api-docs`
   - S'authentifier (Authorize → Bearer)
   - `POST /uploads/local` avec `multipart/form-data` (champ `file`).
   - La réponse renvoie `publicUrl` (ex: `/uploads/videos/xxx.mp4`).

> Le dossier d'écriture est `public/uploads/videos`.
> En production serverless (Vercel), l'écriture disque n'est pas persistante : préférer S3/Cloudinary.
