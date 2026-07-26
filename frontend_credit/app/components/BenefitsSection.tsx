export function BenefitsSection() {
  const benefits = [
    {
      title: "Comparación clara",
      description: "Visualiza las mejores alternativas de crédito en tarjetas con tasas, plazos y recomendaciones claras.",
    },
    {
      title: "Seguridad reforzada",
      description: "Protegemos tus datos y te ofrecemos una navegación confiable para que tomes decisiones financieras seguras.",
    },
    {
      title: "Recomendaciones inteligentes",
      description: "Analizamos tus necesidades para mostrar opciones de crédito relevantes y ajustadas a tu perfil.",
    },
  ];

  return (
    <section id="beneficios" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl space-y-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600">Beneficios</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Todo lo que necesitas para comparar y elegir con confianza.
          </h2>
          <p className="text-slate-600">
            Crédito Inteligente convierte la búsqueda de crédito en un proceso simple y transparente, desde la comparación hasta la decisión final.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-slate-950">{benefit.title}</h3>
              <p className="mt-4 text-slate-600">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
