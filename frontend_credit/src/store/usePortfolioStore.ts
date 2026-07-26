import { create } from 'zustand';
import { portfolioService } from '@/services/portfolioService';
import type { CreditProduct, CreditProductFormValues } from '@/types/credit-product';


interface PortfolioState {
  products: CreditProduct[];
  isLoading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  create: (values: CreditProductFormValues) => Promise<void>;
  update: (id: number, values: CreditProductFormValues) => Promise<void>;
  remove: (id: number) => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchAll: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await portfolioService.list();
      set({ products, isLoading: false });
    } catch {
      set({ error: 'No se pudo cargar el portafolio de crédito.', isLoading: false });
    }
  },

  create: async (values) => {
    await portfolioService.create(values);
    await get().fetchAll();
  },

  update: async (id, values) => {
    await portfolioService.update(id, values);
    await get().fetchAll();
  },

  remove: async (id) => {
    await portfolioService.remove(id);
    await get().fetchAll();
  },
}));
