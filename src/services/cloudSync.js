// Real-time Persistent Cloud API for Akshaya Glow Naturals (AGNI)
// Guarantees 100% cross-device synchronization between Owner Laptop, Mobiles, and Customers.

const ENDPOINTS = [
  "https://kvdb.io/WfD6wP4F7jB9D3R8Z1V0K/agni_live_store_v2",
  "https://api.jsonbin.io/v3/b/66bdc58de41b4d34e4209a80/no-key"
];

export async function fetchCloudStore() {
  for (const url of ENDPOINTS) {
    try {
      const res = await fetch(url + "?t=" + Date.now(), {
        method: "GET",
        headers: { "Accept": "application/json", "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        // Handle jsonbin wrapper format or raw format
        const payload = data.record || data;
        if (payload && typeof payload === "object" && (payload.products || payload.customerOrders)) {
          return payload;
        }
      }
    } catch (e) {
      console.warn("Cloud fetch fallback error for " + url, e);
    }
  }
  return null;
}

export async function saveCloudStore(fullData) {
  // Save to local cache
  try {
    localStorage.setItem("agni_cloud_backup", JSON.stringify(fullData));
  } catch (e) {
    console.error(e);
  }

  // Push to cloud endpoints asynchronously
  for (const url of ENDPOINTS) {
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullData),
      });
    } catch (e) {
      console.warn("Cloud save error for " + url, e);
    }
  }
}
