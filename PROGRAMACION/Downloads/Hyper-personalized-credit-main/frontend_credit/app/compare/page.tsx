import { PageShell } from "../components/layout/PageShell";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { creditOptions } from "../lib/mock-data";

export default function ComparePage() {
  return (
    <PageShell title="Comparador de créditos" subtitle="Elige la opción más conveniente para tu perfil">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Card title="Opciones disponibles" subtitle="Datos mock para validar la experiencia de comparación">
            <div className="space-y-4">
              {creditOptions.map((option) => (
                <div key={option.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{option.name}</h3>
                      <p className="mt-2 text-sm text-slate-600">{option.description}</p>
                    </div>
                    <div className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
                      {option.eligibility}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
                    <span className="rounded-full bg-white px-3 py-1">Tasa: {option.rate}</span>
                    <span className="rounded-full bg-white px-3 py-1">Cuota: {option.monthlyPayment}</span>
                    <span className="rounded-full bg-white px-3 py-1">Plazo: {option.term}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card title="Tu perfil" subtitle="Ajusta los criterios para ver comparaciones reales">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Monto deseado</label>
              <input className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="$5,000" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Plazo</label>
              <select className="w-full rounded-2xl border border-slate-300 px-4 py-3">
                <option>12 meses</option>
                <option>24 meses</option>
                <option>36 meses</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Objetivo</label>
              <select className="w-full rounded-2xl border border-slate-300 px-4 py-3">
                <option>Consolidar deudas</option>
                <option>Negocio</option>
                <option>Educación</option>
              </select>
            </div>
            <Button className="w-full">Comparar ahora</Button>
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
