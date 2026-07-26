import { create } from 'zustand';
import { affiliateService } from '@/services/affiliateService';
import type { Affiliate, AffiliateFormValues } from '@/types/affiliate';


interface AffiliatesState {
  affiliates: Affiliate[];
  isLoading: boolean;
  error: string | null;
  search: string;
  setSearch: (value: string) => void;
  fetchAll: () => Promise<void>;
  create: (values: AffiliateFormValues) => Promise<void>;
  update: (id: number, values: AffiliateFormValues) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export const useAffiliatesStore = create<AffiliatesState>((set, get) => ({
  affiliates: [],
  isLoading: false,
  error: null,
  search: '',

  setSearch: (value) => set({ search: value }),

  fetchAll: async () => {
    set({ isLoading: true, error: null });
    try {
      const affiliates = await affiliateService.list(get().search || undefined);
      set({ affiliates, isLoading: false });
    } catch {
      set({ error: 'No se pudo cargar la lista de afiliados.', isLoading: false });
    }
  },

  create: async (values) => {
    await affiliateService.create(values);
    await get().fetchAll();
  },

  update: async (id, values) => {
    await affiliateService.update(id, values);
    await get().fetchAll();
  },

  remove: async (id) => {
    await affiliateService.remove(id);
    await get().fetchAll();
  },
}));
