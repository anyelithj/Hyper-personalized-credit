export function IntroSection() {
  return (
    <section id="introduccion" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-10 rounded-[2rem] bg-white p-12 shadow-xl shadow-slate-900/5 md:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600">Introducción</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Crédito Inteligente reúne las mejores alternativas en un solo lugar.
            </h2>
            <p className="text-slate-600 leading-8">
              Nuestra plataforma compara opciones de crédito de forma clara, con datos relevantes y sin terminología confusa. Te ayuda a entender tasas, plazos y condiciones para que tu decisión sea más segura.
            </p>
          </div>

          <div className="space-y-6 rounded-[1.75rem] bg-slate-950 p-8 text-white shadow-lg shadow-slate-950/10">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">¿Por qué elegirnos?</p>
            <ul className="space-y-4 text-slate-200">
              <li className="rounded-3xl bg-white/5 p-5">
                <p className="font-semibold text-white">Transparencia total</p>
                <p className="mt-2 text-sm text-slate-300">Compara tasas y condiciones sin sorpresas.</p>
              </li>
              <li className="rounded-3xl bg-white/5 p-5">
                <p className="font-semibold text-white">Decisión respaldada</p>
                <p className="mt-2 text-sm text-slate-300">Recomendaciones basadas en tus prioridades financieras.</p>
              </li>
              <li className="rounded-3xl bg-white/5 p-5">
                <p className="font-semibold text-white">Proceso ágil</p>
                <p className="mt-2 text-sm text-slate-300">Encuentra opciones en minutos sin perder claridad.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
