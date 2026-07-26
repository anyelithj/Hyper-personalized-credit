
export interface CreditProduct {
  id: number;
  nombre: string;
  monto_min: number;
  monto_max: number;
  plazo: string;
  requisito_clave: string;
  created_at: string;
  updated_at: string;
}


export interface CreditProductFormValues {
  nombre: string;
  monto_min: number;
  monto_max: number;
  plazo: string;
  requisito_clave: string;
}
