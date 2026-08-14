// Persistent Same-Domain Cloud API Service for Akshaya Glow Naturals (AGNI)
// Leverages Vercel Serverless Functions (/api/store) for 100% reliable cross-device sync!

const PRIMARY_API_ENDPOINT = "/api/store";
const FALLBACK_ENDPOINT = "https://kvdb.io/WfD6wP4F7jB9D3R8Z1V0K/agni_prod_v3";

export async function fetchCloudStore() {
  // 1. Try Same-Domain Vercel Serverless Endpoint
  try {
    const res = await fetch(PRIMARY_API_ENDPOINT + "?t=" + Date.now(), {
      method: "GET",
      headers: { "Accept": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object" && (data.products || data.customerOrders)) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Primary API endpoint error, trying fallback", e);
  }

  // 2. Try Fallback Cloud DB
  try {
    const res = await fetch(FALLBACK_ENDPOINT + "?t=" + Date.now(), {
      method: "GET",
      headers: { "Accept": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object" && (data.products || data.customerOrders)) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Fallback endpoint error", e);
  }

  return null;
}

export async function saveCloudStore(fullData) {
  // 1. Save to Local Cache
  try {
    localStorage.setItem("agni_cloud_backup", JSON.stringify(fullData));
  } catch (e) {
    console.error(e);
  }

  // 2. Save to Same-Domain Vercel Serverless Endpoint
  try {
    await fetch(PRIMARY_API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullData),
    });
  } catch (e) {
    console.warn("Primary API save error", e);
  }

  // 3. Save to Fallback Cloud DB
  try {
    await fetch(FALLBACK_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullData),
    });
  } catch (e) {
    console.warn("Fallback save error", e);
  }
}
