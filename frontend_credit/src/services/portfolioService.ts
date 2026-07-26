import { api } from '@/services/api';
import type { CreditProduct, CreditProductFormValues } from '@/types/credit-product';


export const portfolioService = {
  list: () => api.get<CreditProduct[]>('/portfolio').then((res) => res.data),

  get: (id: number) => api.get<CreditProduct>(`/portfolio/${id}`).then((res) => res.data),

  create: (payload: CreditProductFormValues) =>
    api.post<CreditProduct>('/portfolio', payload).then((res) => res.data),

  update: (id: number, payload: CreditProductFormValues) =>
    api.put<CreditProduct>(`/portfolio/${id}`, payload).then((res) => res.data),

  remove: (id: number) => api.delete(`/portfolio/${id}`),
};
