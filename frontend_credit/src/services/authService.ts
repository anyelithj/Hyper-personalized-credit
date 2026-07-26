import { api } from '@/services/api';
import type { LoginPayload, TokenResponse } from '@/types/auth';


export const authService = {
  login: (payload: LoginPayload) =>
    api.post<TokenResponse>('/auth/login', payload).then((res) => res.data),

  me: () => api.get<TokenResponse['user']>('/auth/me').then((res) => res.data),
};
