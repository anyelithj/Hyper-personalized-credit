import { create } from 'zustand';
import { offerService } from '@/services/offerService';
import type { Offer, OfferFormValues } from '@/types/offer';


interface OffersState {
  offers: Offer[];
  isLoading: boolean;
  error: string | null;
  search: string;
  setSearch: (value: string) => void;
  fetchAll: () => Promise<void>;
  create: (values: OfferFormValues) => Promise<void>;
  update: (id: number, values: OfferFormValues) => Promise<void>;
  remove: (id: number) => Promise<void>;
  recommend: (affiliateId: number) => Promise<Offer>;
  dispatch: (offerId: number) => Promise<void>;
}

export const useOffersStore = create<OffersState>((set, get) => ({
  offers: [],
  isLoading: false,
  error: null,
  search: '',

  setSearch: (value) => set({ search: value }),

  fetchAll: async () => {
    set({ isLoading: true, error: null });
    try {
      const offers = await offerService.list(get().search || undefined);
      set({ offers, isLoading: false });
    } catch {
      set({ error: 'No se pudo cargar la lista de ofertas.', isLoading: false });
    }
  },

  create: async (values) => {
    await offerService.create(values);
    await get().fetchAll();
  },

  update: async (id, values) => {
    await offerService.update(id, values);
    await get().fetchAll();
  },

  remove: async (id) => {
    await offerService.remove(id);
    await get().fetchAll();
  },

  recommend: async (affiliateId) => {
    const offer = await offerService.recommend(affiliateId);
    await get().fetchAll();
    return offer;
  },

  dispatch: async (offerId) => {
    await offerService.dispatch(offerId);
    await get().fetchAll();
  },
}));
