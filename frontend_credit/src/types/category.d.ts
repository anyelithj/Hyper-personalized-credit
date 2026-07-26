import type { AffiliateCategory } from '@/types/affiliate';


export interface CategoryDefinition {
  categoria: AffiliateCategory;
  etiqueta: string;
  smmlv_min: number;
  smmlv_max: number | null;
  descripcion: string;
}
