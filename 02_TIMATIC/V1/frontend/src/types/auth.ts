export interface Role {
  id: number;
  nomRole: string;
}

export interface Service {
  id: number;
  nomService: string;
}

export interface User {
  id: number;
  prenom: string;
  nom: string;
  contact: string;
  roleId: number;
  serviceId: number;
  username: string;
  active: boolean;
  passwordLastChanged: string;
  forcePasswordChange: boolean;
  role?: Role;
  service?: Service;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
  message?: string;
}

export interface AuthError {
  message: string;
  code?: string;
}
