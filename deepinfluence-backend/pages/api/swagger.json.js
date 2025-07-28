// Import du fichier de spécification OpenAPI.  L’emplacement correct est
// deux niveaux au-dessus du répertoire courant (pages/api). Sur
// certaines plateformes (Windows), l’utilisation d’un chemin incorrect
// provoque une erreur « Module not found ».
import swaggerSpec from '../../lib/swaggerSpec.js';

/**
 * Ce point de terminaison renvoie la spécification OpenAPI au format JSON.  
 * Il est utilisé par la page /api-docs pour alimenter l’interface Swagger UI.
 */
export default function handler(req, res) {
  res.status(200).json(swaggerSpec);
}