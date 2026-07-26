import type { ProductDistributionItem } from '@/types/metrics';

interface DistributionChartProps {
  items: ProductDistributionItem[];
}

export default function DistributionChart({ items }: DistributionChartProps) {
  if (items.length === 0) {
    return <p className="text-sm text-[var(--muted)]">Aún no hay ofertas para graficar.</p>;
  }

  const max = Math.max(1, ...items.map((item) => item.total));

  return (
    <div className="flex items-end gap-3.5 h-[170px] pt-4 px-2">
      {items.map((item) => {
        const heightPx = (item.total / max) * 120 + 20;
        return (
          <div key={item.producto} className="flex-1 flex flex-col items-center gap-2">
            <b className="font-mono text-xs text-[var(--ink)]">{item.total}</b>
            <div
              className="w-full max-w-[40px] bg-gradient-to-t from-[var(--blue)] to-[var(--yellow)] rounded-t-md transition-all duration-500"
              style={{ height: `${heightPx}px` }}
              role="img"
              aria-label={`${item.producto}: ${item.total} ofertas`}
            />
            <span className="text-[11px] text-[var(--muted)] text-center line-clamp-2">
              {item.producto.split(' ').slice(0, 2).join(' ')}
            </span>
          </div>
        );
      })}
    </div>
  );
}
