export type AffiliateCategory = 'A' | 'B' | 'C' | 'D';

export interface Affiliate {
  id: number;
  cedula: string;
  nombre: string;
  correo: string;
  direccion: string;
  categoria: AffiliateCategory;
  ingreso_mensual: number;
  created_at: string;
  updated_at: string;
  canal?: string;
  senales?: Array<{ n: string; v: string }>;
}

export interface AffiliateFormValues {
  cedula: string;
  nombre: string;
  correo: string;
  direccion: string;
  categoria: AffiliateCategory;
  ingreso_mensual: number;
}
