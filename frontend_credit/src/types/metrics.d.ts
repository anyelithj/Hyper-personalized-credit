
export interface ProductDistributionItem {
  producto: string;
  total: number;
}

export interface DashboardMetrics {
  afiliados_perfilados: number;
  ofertas_generadas: number;
  senales_promedio: number;
  canal_mas_usado: string | null;
  distribucion_productos: ProductDistributionItem[];
}
