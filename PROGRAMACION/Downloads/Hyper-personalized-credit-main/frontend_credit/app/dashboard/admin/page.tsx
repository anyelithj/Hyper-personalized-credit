import { PageShell } from "../../components/layout/PageShell";
import { Card } from "../../components/ui/Card";
import { StatCard } from "../../components/ui/StatCard";
import { adminStats, activityFeed } from "../../lib/mock-data";

export default function AdminDashboardPage() {
  return (
    <PageShell title="Dashboard del administrador" subtitle="Vista operativa y seguimiento de rendimiento">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {adminStats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Card title="Actividad reciente" subtitle="Panel preparado para integrar eventos reales">
            <div className="space-y-3">
              {activityFeed.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Herramientas rápidas" subtitle="Acciones administrativas de ejemplo">
            <ul className="space-y-3 text-sm text-slate-600">
              <li>• Revisar solicitudes pendientes</li>
              <li>• Gestionar usuarios activos</li>
              <li>• Ajustar reglas de aprobación</li>
            </ul>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
