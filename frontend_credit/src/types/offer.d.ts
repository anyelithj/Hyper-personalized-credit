export type OfferChannel = 'WhatsApp' | 'Correo electrónico' | 'SMS' | 'Portal Web' | 'Instagram';
export type OfferStatus = 'Pendiente' | 'Enviada' | 'Aceptada' | 'Rechazada';

export interface Offer {
  id: number;
  affiliate_id: number;
  credit_product_id: number;
  monto: number;
  canal: OfferChannel;
  estado: OfferStatus;
  affiliate_nombre: string;
  credit_product_nombre: string;
  explicacion?: string | null;
  created_at: string;
  updated_at: string;
}


export interface OfferFormValues {
  affiliate_id: number;
  credit_product_id: number;
  monto: number;
  canal: OfferChannel;
  estado: OfferStatus;
}
