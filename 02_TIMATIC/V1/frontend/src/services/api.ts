const API_BASE = "http://localhost:5000/api";

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  // const token = localStorage.getItem("auth_token");
  const token = localStorage.getItem("accessToken");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${url}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw { status: res.status, message: data.message || "Erreur serveur", data };
  return data as T;
}

// Auth
export const authApi = {
  login: (username: string, password: string) =>
    request<any>("/auth/login", { method: "POST", body: JSON.stringify({ username, password }) }),
  register: (userData: any) =>
    request<any>("/auth/register", { method: "POST", body: JSON.stringify(userData) }),
  refresh: (refreshToken: string) =>
    request<any>("/auth/refresh", { method: "POST", body: JSON.stringify({ refreshToken }) }),
};

export const usersApi = {
  getAll: () => request<any[]>("/users"),

  getById: (id: number) =>
    request<any>(`/users/${id}`),

  create: (data: any) =>
    request<any>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: any) =>
    request<any>(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    request<any>(`/users/${id}`, {
      method: "DELETE",
    }),

  deleteMultiple: (ids: number[]) =>
    request<any>("/users", {
      method: "DELETE",
      body: JSON.stringify({ ids }),
    }),

  // 🔐 RESET PASSWORD (AJOUT ICI)
  resetPassword: (id: number, newPassword: string) =>
    request<any>(`/users/${id}/reset-password`, {
      method: "PUT",
      body: JSON.stringify({ newPassword }),
    }),
};

// Roles
export const rolesApi = {
  getAll: () => request<any[]>("/roles"),
};

// Services
export const servicesApi = {
  getAll: () => request<any[]>("/services"),
};

// ######################################  ##############################################
// ============================================================
// Mock API – Simulates backend entirely in the browser
// ============================================================

const ROLES = [
  { id: 1, nomRole: "ADMIN" },
  { id: 2, nomRole: "EDITOR" },
  { id: 3, nomRole: "USER" },
];

const SERVICES = [
  { id: 1, nomService: "Direction Générale", serviceParentId: null },
  { id: 2, nomService: "Service des Visas", serviceParentId: 1 },
  { id: 3, nomService: "Service Accueil", serviceParentId: 1 },
  { id: 4, nomService: "Service Informatique", serviceParentId: 1 },
  { id: 5, nomService: "Bureau des Passeports", serviceParentId: 2 },
  { id: 6, nomService: "Bureau des Titres de Séjour", serviceParentId: 2 },
];

const SERVICE_PARENTS = [
  { id: 1, nom: "Direction Générale" },
  { id: 2, nom: "Service des Visas" },
];

// Seed users – passwords stored in plain text for mock purposes only
let USERS: any[] = [
  {
    id: 1, prenom: "Administrateur", nom: "Principal", contact: "+221770000001",
    username: "admin", password: "password", roleId: 1, serviceId: 1,
    active: true, forcePasswordChange: false,
    passwordLastChanged: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000).toISOString(),
    role: { id: 1, nomRole: "ADMIN" },
  },
  {
    id: 2, prenom: "Mamadou", nom: "Diallo", contact: "+221770000002",
    username: "user1", password: "password", roleId: 3, serviceId: 2,
    active: true, forcePasswordChange: false,
    passwordLastChanged: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    role: { id: 3, nomRole: "USER" },
  },
  {
    id: 3, prenom: "Fatou", nom: "Sow", contact: "+221770000003",
    username: "user2", password: "password", roleId: 3, serviceId: 3,
    active: true, forcePasswordChange: false,
    passwordLastChanged: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    role: { id: 3, nomRole: "USER" },
  },
  {
    id: 4, prenom: "Ousmane", nom: "Ba", contact: "+221770000004",
    username: "user3", password: "password", roleId: 2, serviceId: 4,
    active: true, forcePasswordChange: false,
    passwordLastChanged: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    role: { id: 2, nomRole: "EDITOR" },
  },
  {
    id: 5, prenom: "Aissatou", nom: "Ndiaye", contact: "+221770000005",
    username: "user4", password: "password", roleId: 3, serviceId: 5,
    active: false, forcePasswordChange: false,
    passwordLastChanged: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    role: { id: 3, nomRole: "USER" },
  },
  {
    id: 6, prenom: "Ibrahima", nom: "Fall", contact: "+221770000006",
    username: "user5", password: "password", roleId: 3, serviceId: 2,
    active: true, forcePasswordChange: false,
    passwordLastChanged: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    role: { id: 3, nomRole: "USER" },
  },
  {
    id: 7, prenom: "Mariama", nom: "Diop", contact: "+221770000007",
    username: "user6", password: "password", roleId: 3, serviceId: 6,
    active: true, forcePasswordChange: false,
    passwordLastChanged: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    role: { id: 3, nomRole: "USER" },
  },
];

let nextId = 8;

// ---- Personnels mock ----
let PERSONNELS: any[] = [
  { id: 1, matricule: "MAT001", prenom: "Cheikh", nom: "Mbaye", poste: "Chef de bureau", serviceId: 1, dateEntree: "2020-01-15" },
  { id: 2, matricule: "MAT002", prenom: "Aminata", nom: "Touré", poste: "Agent d'accueil", serviceId: 3, dateEntree: "2021-06-01" },
  { id: 3, matricule: "MAT003", prenom: "Moussa", nom: "Cissé", poste: "Développeur", serviceId: 4, dateEntree: "2022-03-10" },
  { id: 4, matricule: "MAT004", prenom: "Khady", nom: "Sarr", poste: "Agent de visa", serviceId: 2, dateEntree: "2019-09-20" },
  { id: 5, matricule: "MAT005", prenom: "Abdoulaye", nom: "Gueye", poste: "Secrétaire", serviceId: 1, dateEntree: "2023-01-05" },
  { id: 6, matricule: "MAT006", prenom: "Sokhna", nom: "Diouf", poste: "Agent passeport", serviceId: 5, dateEntree: "2021-11-12" },
  { id: 7, matricule: "MAT007", prenom: "Pape", nom: "Faye", poste: "Technicien", serviceId: 4, dateEntree: "2020-07-22" },
  { id: 8, matricule: "MAT008", prenom: "Rama", nom: "Sy", poste: "Agent titres", serviceId: 6, dateEntree: "2022-08-15" },
  { id: 9, matricule: "MAT009", prenom: "Modou", nom: "Dieng", poste: "Coordinateur", serviceId: 2, dateEntree: "2018-04-03" },
  { id: 10, matricule: "MAT010", prenom: "Ndèye", nom: "Kane", poste: "Assistante", serviceId: 3, dateEntree: "2023-05-18" },
];

function delay(ms = 300) {
  return new Promise((r) => setTimeout(r, ms));
}

function attachRole(u: any) {
  return { ...u, role: ROLES.find((r) => r.id === u.roleId) || null };
}

function safeUser(u: any) {
  const { password, ...rest } = u;
  return rest;
}

// ---- Auth API ----
// export const authApi = {
//   login: async (username: string, pwd: string) => {
//     await delay();
//     const user = USERS.find((u) => u.username === username);
//     if (!user || user.password !== pwd) throw new Error("Nom d'utilisateur ou mot de passe incorrect");
//     if (!user.active) throw new Error("Compte désactivé, veillez contacter l'administrateur");
//     if (user.forcePasswordChange) throw new Error("Delai expiré, changement de mot de passe obligatoire");
//     return {
//       token: "mock-jwt-token-" + user.id,
//       refreshToken: "mock-refresh-" + user.id,
//       user: safeUser(attachRole(user)),
//     };
//   },
//   register: async (data: any) => {
//     await delay();
//     if (USERS.find((u) => u.username === data.username)) throw new Error("Ce nom d'utilisateur existe déjà");
//     const newUser: any = {
//       id: nextId++,
//       prenom: data.prenom, nom: data.nom, contact: data.contact || "",
//       username: data.username, password: data.password,
//       roleId: data.roleId, serviceId: data.serviceId,
//       active: true, forcePasswordChange: false,
//       passwordLastChanged: new Date().toISOString(),
//       role: ROLES.find((r) => r.id === data.roleId) || null,
//     };
//     USERS.push(newUser);
//     return safeUser(newUser);
//   },
//   refresh: async (_refreshToken: string) => {
//     await delay(100);
//     return { token: "mock-jwt-refreshed" };
//   },
// };

// ---- Users API ----
// export const usersApi = {
//   getAll: async () => {
//     await delay();
//     return USERS.map((u) => safeUser(attachRole(u)));
//   },
//   getById: async (id: number) => {
//     await delay();
//     const u = USERS.find((x) => x.id === id);
//     if (!u) throw new Error("Utilisateur introuvable");
//     return safeUser(attachRole(u));
//   },
//   update: async (id: number, data: any) => {
//     await delay();
//     const idx = USERS.findIndex((x) => x.id === id);
//     if (idx === -1) throw new Error("Utilisateur introuvable");
//     USERS[idx] = { ...USERS[idx], ...data };
//     return safeUser(attachRole(USERS[idx]));
//   },
//   delete: async (id: number) => {
//     await delay();
//     USERS = USERS.filter((u) => u.id !== id);
//     return { success: true };
//   },
//   changePassword: async (id: number, password: string) => {
//     await delay();
//     const idx = USERS.findIndex((x) => x.id === id);
//     if (idx === -1) throw new Error("Utilisateur introuvable");
//     USERS[idx].password = password;
//     USERS[idx].forcePasswordChange = false;
//     USERS[idx].passwordLastChanged = new Date().toISOString();
//     return safeUser(attachRole(USERS[idx]));
//   },
//   toggleActive: async (id: number, active: boolean) => {
//     await delay();
//     const idx = USERS.findIndex((x) => x.id === id);
//     if (idx === -1) throw new Error("Utilisateur introuvable");
//     USERS[idx].active = active;
//     return safeUser(attachRole(USERS[idx]));
//   },
// };

// ---- Roles & Services API ----
// export const rolesApi = {
//   getAll: async () => {
//     await delay(100);
//     return [...ROLES];
//   },
// };

// export const servicesApi = {
//   getAll: async () => {
//     await delay(100);
//     return [...SERVICES];
//   },
// };

export const serviceParentsApi = {
  getAll: async () => {
    await delay(100);
    return [...SERVICE_PARENTS];
  },
};

// ---- Personnels API ----
export const personnelsApi = {
  getAll: async () => {
    await delay();
    return [...PERSONNELS];
  },
  getByService: async (serviceId: number) => {
    await delay();
    return PERSONNELS.filter((p) => p.serviceId === serviceId);
  },
  getTop10ByService: async () => {
    await delay();
    // Group by service and count
    const counts: Record<number, { serviceId: number; serviceName: string; count: number }> = {};
    for (const p of PERSONNELS) {
      if (!counts[p.serviceId]) {
        const svc = SERVICES.find((s) => s.id === p.serviceId);
        counts[p.serviceId] = { serviceId: p.serviceId, serviceName: svc?.nomService || "Inconnu", count: 0 };
      }
      counts[p.serviceId].count++;
    }
    return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 10);
  },
};

// ---- Dashboard Stats API ----
export const dashboardApi = {
  getStats: async () => {
    await delay(200);
    const totalUsers = USERS.length;
    const activeUsers = USERS.filter((u) => u.active).length;
    const inactiveUsers = totalUsers - activeUsers;
    const adminCount = USERS.filter((u) => u.roleId === 1).length;
    const totalPersonnels = PERSONNELS.length;
    const totalServices = SERVICES.length;
    const totalRoles = ROLES.length;
    const pendingRequests = 0;

    return { totalUsers, activeUsers, inactiveUsers, adminCount, totalPersonnels, totalServices, totalRoles, pendingRequests };
  },
  getDailyStats: async () => {
    await delay(200);
    return [
      { jour: "Lun", visites: 12000 },
      { jour: "Mar", visites: 19000 },
      { jour: "Mer", visites: 28000 },
      { jour: "Jeu", visites: 25000 },
      { jour: "Ven", visites: 18000 },
      { jour: "Sam", visites: 14000 },
      { jour: "Dim", visites: 10000 },
    ];
  },
};





