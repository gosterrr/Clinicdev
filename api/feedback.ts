import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST" || req.method === "GET") {
    return res.status(501).json({
      error: "database_not_configured",
      message: "Contacto, reclamos y seguimiento requieren DATABASE_URL y la capa PostgreSQL/Neon.",
    });
  }
  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "method_not_allowed" });
}
