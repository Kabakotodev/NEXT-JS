import { notifyError } from "../utils/toast";

const API_BASE = "http://localhost:4000";

let isRefreshing = false; // 🔥 évite refresh multiple simultané

export const api = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {

  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // 🔥 Ne pas forcer JSON si FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  /* ================================
     401 → Token expiré
  ================================= */

  if (response.status === 401) {

    const refreshToken = localStorage.getItem("refreshToken");

    // 🔥 éviter boucle infinie
    if (!isRefreshing && refreshToken) {
      try {
        isRefreshing = true;

        const refreshRes = await fetch(`${API_BASE}/api/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();

          localStorage.setItem("token", data.accessToken);

          isRefreshing = false;

          // 🔁 Retry original request avec nouveau token
          return api(endpoint, options);
        }

      } catch {
        // ignore
      } finally {
        isRefreshing = false;
      }
    }

    // ❌ Refresh impossible → logout
    localStorage.clear();
    notifyError("Session expirée. Veuillez vous reconnecter.");
    window.location.href = "/login";

    return response;
  }

  /* ================================
     403 → Accès refusé / Compte bloqué
  ================================= */

  if (response.status === 403) {

    let data: any = null;

    try {
      data = await response.clone().json();
    } catch {
      // réponse non JSON
    }

    if (data?.error === "Compte désactivé" || data?.error?.includes("désactivé")) {

      notifyError("Votre compte a été désactivé par un administrateur.");

      localStorage.clear();
      window.location.href = "/login";

      return response;
    }

    notifyError("Accès refusé");

    return response;
  }

  return response;
};
