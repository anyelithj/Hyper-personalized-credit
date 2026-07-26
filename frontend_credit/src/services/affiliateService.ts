import { api } from '@/services/api';
import type { Affiliate, AffiliateFormValues } from '@/types/affiliate';


export const affiliateService = {
  list: (search?: string) =>
    api.get<Affiliate[]>('/affiliates', { params: search ? { search } : undefined }).then((res) => res.data),

  get: (id: number) => api.get<Affiliate>(`/affiliates/${id}`).then((res) => res.data),

  create: (payload: AffiliateFormValues) =>
    api.post<Affiliate>('/affiliates', payload).then((res) => res.data),

  update: (id: number, payload: AffiliateFormValues) =>
    api.put<Affiliate>(`/affiliates/${id}`, payload).then((res) => res.data),

  remove: (id: number) => api.delete(`/affiliates/${id}`),
};
