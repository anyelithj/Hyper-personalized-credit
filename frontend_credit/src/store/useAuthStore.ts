import Cookies from 'js-cookie';
import { create } from 'zustand';
import { authService } from '@/services/authService';
import type { AuthUser, LoginPayload } from '@/types/auth';


interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const { access_token, user } = await authService.login(payload);
      Cookies.set('auth_token', access_token, { expires: 1 / 3 }); 
      set({ user, isLoading: false });
    } catch {
      set({ error: 'Usuario o contraseña incorrectos.', isLoading: false });
    }
  },

  logout: () => {
    Cookies.remove('auth_token');
    set({ user: null });
  },
}));
