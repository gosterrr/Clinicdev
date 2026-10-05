import type { VercelRequest, VercelResponse } from "@vercel/node";

type Method = "GET" | "POST" | "PATCH" | "DELETE";

function notReady(res: VercelResponse, operation: string) {
  return res.status(501).json({
    error: "database_not_configured",
    message: `La operación ${operation} requiere DATABASE_URL y la capa PostgreSQL/Neon.`,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const method = req.method as Method;
  if (method === "GET") return notReady(res, "consultar disponibilidad o citas");
  if (method === "POST") return notReady(res, "crear una reserva");
  if (method === "PATCH" || method === "DELETE") return notReady(res, "actualizar o anular una reserva");
  res.setHeader("Allow", "GET, POST, PATCH, DELETE");
  return res.status(405).json({ error: "method_not_allowed" });
}
