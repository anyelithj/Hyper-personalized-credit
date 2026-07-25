import Link from "next/link";

const highlights = [
  {
    title: "Comparación clara",
    description:
      "Visualiza cuotas, plazos y costos en una sola vista para decidir con confianza.",
  },
  {
    title: "Seguridad reforzada",
    description:
      "Tus datos se manejan con protección y procesos transparentes en cada paso.",
  },
  {
    title: "Recomendaciones útiles",
    description:
      "Recibe sugerencias alineadas con tu perfil para encontrar la opción más conveniente.",
  },
];

const steps = [
  {
    number: "01",
    title: "Comparte tu necesidad",
    description: "Indica el monto, plazo y objetivo del crédito en minutos.",
  },
  {
    number: "02",
    title: "Revisa opciones reales",
    description: "Compara tasas, comisiones y beneficios sin complicaciones.",
  },
  {
    number: "03",
    title: "Elige con tranquilidad",
    description: "Selecciona la alternativa que mejor se adapte a tu situación.",
  },
];

const offers = [
  { name: "Préstamo personal", rate: "1.8%", term: "24 meses" },
  { name: "Crédito para negocio", rate: "1.5%", term: "36 meses" },
  { name: "Rotativo flexible", rate: "2.1%", term: "12 meses" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_35%),linear-gradient(135deg,#f8fbff_0%,#eef4ff_45%,#f8fafc_100%)] text-slate-900">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div>
          <p className="text-lg font-semibold tracking-[0.3em] text-sky-700 uppercase">
            Crédito Inteligente
          </p>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a href="#beneficios" className="transition hover:text-sky-700">
            Beneficios
          </a>
          <a href="#como-funciona" className="transition hover:text-sky-700">
            Cómo funciona
          </a>
          <Link href="/compare" className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700">
            Comenzar
          </Link>
        </nav>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-16 px-6 pb-20 lg:px-8">
        <section className="grid items-center gap-10 rounded-4xl border border-slate-200/80 bg-white/80 p-8 shadow-[0_25px_80px_-20px_rgba(15,23,42,0.25)] backdrop-blur xl:grid-cols-[1.2fr_0.8fr] xl:p-12">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-700">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
              Plataforma moderna para comparar créditos
            </div>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
                Encuentra el crédito ideal sin perder tiempo ni confianza.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Crédito Inteligente te ayuda a comparar opciones de forma rápida,
                clara y segura, para tomar decisiones más informadas.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/compare"
                className="rounded-full bg-sky-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-sky-700"
              >
                Comparar opciones
              </Link>
              <a
                href="#beneficios"
                className="rounded-full border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Ver beneficios
              </a>
            </div>
            <ul className="flex flex-wrap gap-4 text-sm font-medium text-slate-600">
              <li className="rounded-full bg-slate-100 px-3 py-2">✓ Datos protegidos</li>
              <li className="rounded-full bg-slate-100 px-3 py-2">✓ Proceso guiado</li>
              <li className="rounded-full bg-slate-100 px-3 py-2">✓ Resultados claros</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Resumen de comparación</p>
                <p className="mt-1 text-xl font-semibold">Tu opción más conveniente</p>
              </div>
              <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-300">
                Recomendado
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {offers.map((offer) => (
                <div key={offer.name} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{offer.name}</p>
                    <span className="text-sm text-slate-300">{offer.term}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    Tasa desde {offer.rate} mensual con condiciones transparentes.
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-sky-400/30 bg-sky-500/10 p-4">
              <p className="text-sm text-sky-200">Ahorro estimado</p>
              <p className="mt-2 text-3xl font-semibold text-white">Hasta 18% más claro</p>
            </div>
          </div>
        </section>

        <section id="beneficios" className="space-y-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
              Diseño pensado para usuarios
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
              Una experiencia simple, confiable y moderna.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item) => (
              <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="como-funciona" className="rounded-4xl border border-slate-200 bg-slate-950 px-6 py-10 text-white lg:px-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
              Cómo funciona
            </p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
              Tu próximo paso hacia una decisión más inteligente.
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="rounded-[1.25rem] border border-white/10 bg-white/10 p-6">
                <p className="text-sm font-semibold text-sky-300">{step.number}</p>
                <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="cta" className="rounded-4xl border border-sky-200 bg-sky-50 px-6 py-10 text-center shadow-sm lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
            Empieza hoy
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
            Descubre la mejor opción para tu próximo crédito.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            La decisión financiera merece claridad, simplicidad y acompañamiento.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/register" className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-700">
              Crear cuenta
            </Link>
            <Link href="/login" className="rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-400">
              Iniciar sesión
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
