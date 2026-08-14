// Global Cloud Persistence Service for Akshaya Glow Naturals (AGNI)
// Enables real-time synchronization between Laptop, Mobile, and all devices.

const SYNC_KEY = "agni_global_store_v1";
const CLOUD_API_URL = "https://api.jsonbin.io/v3/b"; 
// We use a free, robust key-value cloud store or public endpoint fallback
const MASTER_BIN_ID = "66bdc58de41b4d34e4209a80"; // Shared master cloud container ID

export async function fetchCloudStore() {
  try {
    const res = await fetch(`https://api.npoint.io/469df8b420556f8f53a8`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.products) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Cloud sync fetch fallback:", e);
  }
  return null;
}

export async function saveCloudStore(fullData) {
  try {
    // Save to local cache first
    localStorage.setItem(SYNC_KEY, JSON.stringify(fullData));

    // Async push to public cloud bin for cross-device sync
    await fetch(`https://api.npoint.io/469df8b420556f8f53a8`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullData),
    });
  } catch (e) {
    console.warn("Cloud sync save fallback:", e);
  }
}
