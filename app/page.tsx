import { basePath } from "@/lib/paths";
import { restaurantConfig } from "@/config/restaurant";
export default function Root() {
  return (
    <html lang="cs">
      <head>
        <meta httpEquiv="refresh" content={`0;url=${basePath}/cs/`} />
        <title>Sluneční Dvůr</title>
        <link rel="canonical" href={`${restaurantConfig.url}/cs/`} />
      </head>
      <body>
        <a href={`${basePath}/cs/`}>Restaurace Sluneční Dvůr</a>
      </body>
    </html>
  );
}
