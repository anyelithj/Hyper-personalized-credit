export function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Comparte tu necesidad",
      description: "Cuéntanos tu objetivo y el tipo de crédito que buscas para mostrar opciones relevantes.",
    },
    {
      number: "2",
      title: "Compara opciones reales",
      description: "Revisa tasas, plazos y condiciones en un formato simple y directo.",
    },
    {
      number: "3",
      title: "Elige con tranquilidad",
      description: "Toma una decisión informada apoyada en datos claros y recomendaciones confiables.",
    },
  ];

  return (
    <section id="como-funciona" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600">Cómo funciona</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Un proceso claro para comparar créditos sin complicaciones.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.number} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8 text-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-lg font-semibold text-white">
                {step.number}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-4 text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
