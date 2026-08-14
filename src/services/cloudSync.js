// Cloud Persistence & Real-time Cross-Device Sync for Akshaya Glow Naturals
// Cloud Master Data takes priority over stale mobile local cache.

const ENDPOINT = "https://api.npoint.io/469df8b420556f8f53a8";

export async function fetchCloudStore() {
  try {
    const res = await fetch(ENDPOINT, {
      method: "GET",
      headers: { "Cache-Control": "no-cache", "Pragma": "no-cache" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object") {
        return data;
      }
    }
  } catch (e) {
    console.warn("Cloud sync fetch error:", e);
  }
  return null;
}

export async function saveCloudStore(fullData) {
  try {
    // Save to local storage cache
    localStorage.setItem("agni_cloud_backup", JSON.stringify(fullData));

    // Save to global Cloud Master
    await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullData),
    });
  } catch (e) {
    console.warn("Cloud sync save error:", e);
  }
}
