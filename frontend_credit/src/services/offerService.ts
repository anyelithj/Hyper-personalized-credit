import { api } from '@/services/api';
import type { Offer, OfferFormValues } from '@/types/offer';


export const offerService = {
  list: (search?: string) =>
    api.get<Offer[]>('/offers', { params: search ? { search } : undefined }).then((res) => res.data),

  get: (id: number) => api.get<Offer>(`/offers/${id}`).then((res) => res.data),

  create: (payload: OfferFormValues) => api.post<Offer>('/offers', payload).then((res) => res.data),

  update: (id: number, payload: OfferFormValues) =>
    api.put<Offer>(`/offers/${id}`, payload).then((res) => res.data),

  remove: (id: number) => api.delete(`/offers/${id}`),

 
  recommend: (affiliateId: number) =>
    api.post<Offer>(`/offers/recommend/${affiliateId}`).then((res) => res.data),


  dispatch: (offerId: number) =>
    api.post<Offer>(`/offers/${offerId}/dispatch`).then((res) => res.data),
};
