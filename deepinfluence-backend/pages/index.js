// pages/index.js
import dynamic from 'next/dynamic';
import swaggerSpec from '../lib/swaggerSpec.js';

// importation dynamique pour éviter un rendu côté serveur
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

// Import des styles Swagger (pris en charge par Next.js)
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocs() {
  return <SwaggerUI spec={swaggerSpec} />;
}
