import { PageShell } from "../../components/layout/PageShell";
import { Card } from "../../components/ui/Card";
import { StatCard } from "../../components/ui/StatCard";
import { userStats, creditOptions } from "../../lib/mock-data";

export default function UserDashboardPage() {
  return (
    <PageShell title="Dashboard del usuario" subtitle="Resumen personal y seguimiento de tus opciones">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {userStats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card title="Tus opciones favoritas" subtitle="Aquí se integrarán las decisiones del usuario">
            <div className="space-y-4">
              {creditOptions.slice(0, 2).map((option) => (
                <div key={option.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">{option.name}</h3>
                    <span className="text-sm text-slate-500">{option.rate}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{option.description}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Próximos pasos" subtitle="Flujo guiado para el usuario">
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• Revisar condiciones y plazo.</li>
              <li>• Confirmar documentos requeridos.</li>
              <li>• Programar seguimiento con asesor.</li>
            </ul>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
