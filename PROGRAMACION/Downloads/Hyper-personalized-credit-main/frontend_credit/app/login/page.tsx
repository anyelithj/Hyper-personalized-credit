import { PageShell } from "../components/layout/PageShell";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export default function LoginPage() {
  return (
    <PageShell title="Iniciar sesión" subtitle="Accede a tu panel y revisa tus productos">
      <div className="mx-auto max-w-xl">
        <Card title="Bienvenido de nuevo" subtitle="Solo por ahora con datos mock de ejemplo">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Correo</label>
              <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="usuario@correo.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Contraseña</label>
              <input type="password" className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="••••••••" />
            </div>
            <Button className="w-full" href="/dashboard/user">
              Entrar
            </Button>
            <p className="text-center text-sm text-slate-500">
              ¿No tienes cuenta? <a href="/register" className="font-semibold text-sky-700">Regístrate aquí</a>
            </p>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
