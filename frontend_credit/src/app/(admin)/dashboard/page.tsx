'use client';

import { useEffect, useState } from 'react';
import KpiCard from '@/components/admin/KpiCard';
import DistributionChart from '@/components/admin/DistributionChart';
import { metricsService } from '@/services/metricsService';
import type { DashboardMetrics } from '@/types/metrics';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    metricsService.get().then(setMetrics);
  }, []);

  if (!metrics) {
    return <p className="text-[var(--muted)]">Cargando métricas…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-[var(--ink)]">Resumen operativo</h1>
          <p className="text-sm text-[var(--muted)] mt-1">Métricas del perfilamiento de afiliados y del despacho multicanal.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Afiliados perfilados"
          value={String(metrics.afiliados_perfilados)}
          hint="activos en el motor"
        />
        <KpiCard
          label="Ofertas generadas"
          value={String(metrics.ofertas_generadas)}
          hint="3+ perfiles diferenciados"
        />
        <KpiCard
          label="Señales promedio"
          value={metrics.senales_promedio.toFixed(1)}
          hint="por afiliado"
        />
        <KpiCard
          label="Canal más usado"
          value={metrics.canal_mas_usado ?? '—'}
          hint="según selección del bot"
        />
      </div>

      <div className="rounded-2xl border border-[var(--border-2)] bg-white overflow-hidden shadow-sm">
        <div className="flex justify-between items-center p-5 border-b border-[var(--border-2)] flex-wrap gap-3">
          <div>
            <h2 className="font-display text-base font-semibold text-[var(--ink)]">Productos más recomendados</h2>
            <p className="text-xs text-[var(--muted)] mt-0.5">Distribución de ofertas por línea de crédito</p>
          </div>
        </div>
        <div className="p-5">
          <DistributionChart items={metrics.distribucion_productos} />
        </div>
      </div>
    </div>
  );
}
