import { PageShell } from "../components/layout/PageShell";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function RegisterPage() {
  return (
    <PageShell title="Crear cuenta" subtitle="Regístrate para guardar tus comparaciones y seguimiento">
      <div className="mx-auto max-w-xl">
        <Card title="Registro rápido" subtitle="Diseñado para una integración posterior con backend">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Nombre</label>
                <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Ana" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Apellido</label>
                <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="García" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Correo</label>
              <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="ana@correo.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Contraseña</label>
              <input type="password" className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="••••••••" />
            </div>
            <Button className="w-full" href="/dashboard/user">
              Crear cuenta
            </Button>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
