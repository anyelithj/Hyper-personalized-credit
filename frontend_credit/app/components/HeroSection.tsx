import { Button } from "./Button";

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-slate-900/90 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
        <div className="max-w-2xl space-y-8">
          <span className="inline-flex rounded-full bg-cyan-500/15 px-4 py-1.5 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-300/20">
            Plataforma creada para decisiones financieras seguras
          </span>
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Encuentra el crédito ideal sin perder tiempo ni confianza.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-300">
              Compara diferentes opciones de crédito de forma rápida, clara y segura para tomar mejores decisiones financieras.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a href="#beneficios" className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
              Comparar opciones
            </a>
            <a href="#beneficios" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Ver beneficios
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/10 backdrop-blur-xl lg:p-8">
          <div className="flex items-center justify-between text-sm text-slate-200">
            <span className="font-medium">Créditos recomendados</span>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">Top 3</span>
          </div>
          <div className="mt-8 space-y-5">
            {[
              { name: "Crédito Pyme", rate: "11.5%", term: "12-36 meses" },
              { name: "Crédito Personal", rate: "13.2%", term: "6-24 meses" },
              { name: "Crédito Vehicular", rate: "10.9%", term: "24-48 meses" },
            ].map((item) => (
              <div key={item.name} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                <p className="font-semibold text-white">{item.name}</p>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-300">
                  <span className="rounded-full bg-white/5 px-3 py-1">Tasa {item.rate}</span>
                  <span className="rounded-full bg-white/5 px-3 py-1">{item.term}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-3xl bg-slate-900/70 p-5 text-sm text-slate-300">
            <p className="font-medium text-white">Comparación con claridad</p>
            <p className="mt-2 leading-6">
              Ve las mejores alternativas de crédito en un solo lugar y elige con tranquilidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
