// Vercel Serverless API Route: /api/store
// Same-domain persistent API endpoint for Akshaya Glow Naturals (AGNI)
// Eliminates all CORS, AdBlocker, and mobile Safari/Chrome cross-origin blocking!

let inMemoryStore = null;

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST" || req.method === "PUT") {
    try {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      if (body && typeof body === "object") {
        inMemoryStore = body;

        // Also push to persistent Cloud REST DB
        try {
          await fetch("https://kvdb.io/WfD6wP4F7jB9D3R8Z1V0K/agni_prod_v3", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
        } catch (e) {
          console.warn("Cloud persistence error:", e);
        }

        return res.status(200).json({ success: true, store: inMemoryStore });
      }
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON" });
    }
  }

  // GET Request: Return inMemoryStore or fetch from Cloud REST DB
  if (!inMemoryStore) {
    try {
      const fetchRes = await fetch("https://kvdb.io/WfD6wP4F7jB9D3R8Z1V0K/agni_prod_v3?t=" + Date.now());
      if (fetchRes.ok) {
        const cloudData = await fetchRes.json();
        if (cloudData && typeof cloudData === "object" && (cloudData.products || cloudData.customerOrders)) {
          inMemoryStore = cloudData;
        }
      }
    } catch (e) {
      console.warn("Cloud fetch error:", e);
    }
  }

  return res.status(200).json(inMemoryStore || {});
}
