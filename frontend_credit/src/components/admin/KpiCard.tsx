interface KpiCardProps {
  label: string;
  value: string;
  hint?: string;
}

export default function KpiCard({ label, value, hint }: KpiCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--border-2)] bg-white p-5 shadow-sm">
      <p className="eyebrow mb-2">{label}</p>
      <b className="block font-display text-3xl font-bold text-[var(--ink)]">{value}</b>
      {hint && <span className="mt-1 block text-xs font-semibold text-[var(--blue)]">▲ {hint}</span>}
    </div>
  );
}
