import { Button } from "./Button";

export function CallToActionSection() {
  return (
    <section className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-950/95 p-10 shadow-2xl shadow-slate-950/20 sm:p-12">
          <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Acción</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Empieza a comparar créditos con confianza hoy mismo.
              </h2>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="bg-white text-slate-950 hover:bg-slate-100">Crear cuenta</Button>
              <Button variant="secondary" className="text-white border-white/20 hover:bg-white/10">
                Iniciar sesión
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
