'use client';

import { useState } from 'react';
import Groups from '@mui/icons-material/Groups';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import TrendingUp from '@mui/icons-material/TrendingUp';
import WhatsApp from '@mui/icons-material/WhatsApp';
import Email from '@mui/icons-material/Email';
import Sms from '@mui/icons-material/Sms';
import Language from '@mui/icons-material/Language';
import Search from '@mui/icons-material/Search';
import Badge from '@mui/icons-material/Badge';
import CheckCircle from '@mui/icons-material/CheckCircle';
import ChatbotWidget from '@/components/public/ChatbotWidget';
import Triangles from '@/components/ui/Triangles';
import { CREDIT_PRODUCTS_SEED, SEED_AFFILIATES } from '@/lib/constants';

const fmt = (n: number) => '$' + Number(n).toLocaleString('es-CO');

export default function LandingPage() {
  const [searchCedula, setSearchCedula] = useState('');
  const [activeProfile, setActiveProfile] = useState<(typeof SEED_AFFILIATES)[0] | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = SEED_AFFILIATES.find((a) => a.cedula.includes(searchCedula.trim()));
    if (found) {
      setActiveProfile(found);
    } else if (searchCedula.trim()) {
      // Default to first profile if demo query
      setActiveProfile(SEED_AFFILIATES[0]);
    }
  };

  const selectDemoCedula = (ced: string) => {
    setSearchCedula(ced);
    const found = SEED_AFFILIATES.find((a) => a.cedula === ced);
    if (found) setActiveProfile(found);
  };

  const timelineSteps = [
    { n: '01', t: 'Ingesta', d: 'Carga individual o por lote de cédula, nombre, correo y categoría.' },
    { n: '02', t: 'Enriquecimiento', d: 'Se consultan señales exógenas: correo, redes y hábitos digitales.' },
    { n: '03', t: 'Encoder', d: 'Se codifican al menos 3 señales de comportamiento por afiliado.' },
    { n: '04', t: 'Segmentación', d: 'Se asocia el perfil con una línea de crédito y un monto viable.' },
    { n: '05', t: 'Despacho', d: 'El bot elige canal y horario; el worker entrega la oferta.' },
  ];

  const channelCards = [
    { n: 'WhatsApp', d: 'Prioritario para afiliados jóvenes con alta interacción en redes', Icon: WhatsApp },
    { n: 'Correo electrónico', d: 'Ideal para categorías B/C con perfiles formales', Icon: Email },
    { n: 'SMS', d: 'Respaldo cuando no hay correo verificado', Icon: Sms },
    { n: 'Portal Web', d: 'Notificaciones para sesiones activas recientes', Icon: Language },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION (IMAGEN 1) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F4F6F9] to-white pt-12 pb-20 md:pt-16 md:pb-24">
        <Triangles variant="yellow-soft" className="right-0 top-0 w-[420px] opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Hero Main Copy */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-display text-4xl font-extrabold leading-tight text-[var(--ink)] md:text-5xl lg:text-[54px] tracking-tight">
                Crédito <span className="text-[var(--blue)] font-extrabold">hiperpersonalizado</span> para cada afiliado, con datos que hoy no están en la base
              </h1>

              <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed max-w-2xl font-medium">
                Credix enriquece el perfil del afiliado con variables exógenas del mercado, detecta señales de comportamiento y arma la oferta correcta: producto, monto, plazo, canal y momento. Sin burós de crédito tradicionales.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#servicios"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--blue)] px-7 py-3.5 text-sm font-bold text-white no-underline shadow-md hover:bg-[var(--blue-hover)] transition-all"
                >
                  Simular mi oferta
                </a>
                <a
                  href="#proceso"
                  className="inline-flex items-center justify-center rounded-full border-2 border-[var(--blue)] bg-transparent px-7 py-3.5 text-sm font-bold text-[var(--blue)] no-underline hover:bg-[var(--blue-light)] transition-all"
                >
                  Ver cómo funciona
                </a>
              </div>

              {/* 3 Bottom Stat Cards */}
              <div className="pt-6 grid grid-cols-3 gap-4 max-w-lg">
                <div className="rounded-xl border border-[var(--border-2)] bg-white p-4 shadow-sm text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF2FA] text-[var(--blue)]">
                    <Groups fontSize="small" />
                  </div>
                  <b className="block font-display text-xl font-extrabold text-[var(--ink)]">11.100</b>
                  <span className="text-[11px] text-[var(--muted)] font-medium">Afiliados perfilados</span>
                </div>

                <div className="rounded-xl border border-[var(--border-2)] bg-white p-4 shadow-sm text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF2FA] text-[var(--blue)]">
                    <AutoAwesome fontSize="small" />
                  </div>
                  <b className="block font-display text-xl font-extrabold text-[var(--ink)]">7</b>
                  <span className="text-[11px] text-[var(--muted)] font-medium">Líneas de crédito</span>
                </div>

                <div className="rounded-xl border border-[var(--border-2)] bg-white p-4 shadow-sm text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF2FA] text-[var(--blue)]">
                    <TrendingUp fontSize="small" />
                  </div>
                  <b className="block font-display text-xl font-extrabold text-[var(--ink)]">33.6%</b>
                  <span className="text-[11px] text-[var(--muted)] font-medium">Tasa de aceptación</span>
                </div>
              </div>
            </div>

            {/* Right Hero Radar Widget Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[var(--border-2)] bg-white p-6 shadow-xl relative">
                <div className="mb-4">
                  <span className="inline-flex items-center rounded-full bg-[var(--blue)] px-3 py-1 text-[11px] font-bold text-white uppercase tracking-wider">
                    Radar de señales - Demo
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-[var(--ink)] mb-1">
                  Consultar tu oferta hiperpersonalizada
                </h3>
                <p className="text-xs text-[var(--muted)] mb-5 leading-relaxed">
                  Ingresa tu número de cédula y el motor enriquece tu perfil con variables exógenas para recomendarte el crédito adecuado.
                </p>

                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-gray-400">
                      <Badge fontSize="small" />
                    </span>
                    <input
                      type="text"
                      placeholder="Número de cédula"
                      value={searchCedula}
                      onChange={(e) => setSearchCedula(e.target.value)}
                      className="w-full rounded-xl border border-[var(--border)] bg-[#F8FAFC] py-3 pl-10 pr-28 text-xs font-medium text-[var(--ink)] focus:border-[var(--blue)] focus:bg-white focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="absolute right-1.5 rounded-lg bg-[var(--blue)] px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-[var(--blue-hover)] flex items-center gap-1"
                    >
                      <Search fontSize="inherit" /> Consultar
                    </button>
                  </div>
                </form>

                <div className="mt-3 text-[11px] text-[var(--muted)] flex flex-wrap items-center gap-1.5">
                  <span>Cédulas de prueba:</span>
                  <button
                    type="button"
                    onClick={() => selectDemoCedula('1023456789')}
                    className="text-[var(--blue)] font-semibold underline hover:text-[var(--blue-hover)] cursor-pointer bg-transparent border-0 p-0"
                  >
                    1023456789
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => selectDemoCedula('80234567')}
                    className="text-[var(--blue)] font-semibold underline hover:text-[var(--blue-hover)] cursor-pointer bg-transparent border-0 p-0"
                  >
                    80234567
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => selectDemoCedula('1008765432')}
                    className="text-[var(--blue)] font-semibold underline hover:text-[var(--blue-hover)] cursor-pointer bg-transparent border-0 p-0"
                  >
                    1008765432
                  </button>
                </div>

                {/* Profile result if active */}
                {activeProfile && (
                  <div className="mt-5 rounded-xl border border-[var(--blue)]/30 bg-[var(--blue-light)] p-4 space-y-3 animate-chip-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="cat-badge">Categoría {activeProfile.categoria}</span>
                        <b className="text-xs font-bold text-[var(--ink)]">{activeProfile.nombre}</b>
                      </div>
                      <span className="text-[10px] font-bold uppercase text-[var(--blue)] bg-white px-2 py-0.5 rounded-full border border-[var(--blue)]/20">
                        {activeProfile.canal}
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <div className="text-[var(--muted)] text-[11px]">Oferta recomendada:</div>
                      <b className="font-display text-sm font-bold text-[var(--blue)] block">
                        {activeProfile.oferta}
                      </b>
                      <div className="font-mono text-base font-extrabold text-[var(--ink)]">
                        {fmt(activeProfile.monto)}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[var(--blue)]/20">
                      <span className="text-[10px] uppercase font-bold text-[var(--muted)] block mb-1">
                        Señales exógenas detectadas:
                      </span>
                      <ul className="space-y-1 text-[11px] text-[var(--ink)]">
                        {activeProfile.senales.map((s, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle fontSize="inherit" className="text-[var(--green)] shrink-0" />
                            <span>{s.n} ({s.p}%)</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PORTAFOLIO DE CRÉDITO SECTION (IMAGEN 2) */}
      <section className="relative overflow-hidden py-20 bg-[#ECEEF2]" id="servicios">
        <Triangles variant="blue-on-yellow" className="right-0 top-0 w-[450px] opacity-10 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <div className="max-w-3xl mb-12">
            <span className="eyebrow">Portafolio de crédito</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-[var(--ink)] md:text-4xl">
              Siete líneas, una sola decisión <span className="text-[var(--blue)]">hiperpersonalizada</span>
            </h2>
            <p className="mt-3 text-sm md:text-base text-[var(--muted)] leading-relaxed">
              El motor de segmentación asocia el perfil enriquecido de cada afiliado con la línea, el monto y el plazo que mejor calzan con su capacidad de pago y su categoría de afiliación.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
            {CREDIT_PRODUCTS_SEED.map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-white/60 bg-white p-4 shadow-sm transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block rounded-full bg-[var(--blue)] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase mb-2">
                    {p.tag}
                  </span>
                  <h3 className="font-display text-xs font-bold text-[var(--ink)] mb-1.5 leading-snug">
                    {p.nombre}
                  </h3>
                  <p className="text-[11px] text-[var(--muted)] mb-3">{p.requisito}</p>
                </div>
                <div className="border-t border-[var(--border-2)] pt-2.5">
                  <div className="font-mono text-xs font-extrabold text-[var(--blue)]">
                    {fmt(p.montoMin)} – {fmt(p.montoMax)}
                  </div>
                  <div className="text-[10.5px] text-[var(--muted-2)] mt-0.5">
                    Plazo: {p.plazo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OFERTAS HIPERPERSONALIZADAS SECTION (IMAGEN 3) */}
      <section className="relative overflow-hidden py-20 bg-[var(--yellow)]" id="ofertas">
        <Triangles variant="yellow" className="right-0 top-0 w-[500px] opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              Ofertas hiperpersonalizadas
            </span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-[var(--blue)] md:text-4xl">
              Ninguna oferta es igual a otra
            </h2>
            <p className="mt-3 text-sm md:text-base text-[var(--ink)] leading-relaxed font-medium">
              Esto es lo que el motor ya generó para afiliados reales del sistema: mismo portafolio, condiciones distintas según el perfil enriquecido de cada uno.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SEED_AFFILIATES.map((a, idx) => {
              const statusLabel = idx % 3 === 0 ? 'Enviada' : idx % 3 === 1 ? 'Aceptada' : 'Pendiente';
              return (
                <div
                  key={a.id}
                  className="rounded-2xl border border-black/10 bg-white p-6 shadow-md transition-all hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="cat-badge">Categoría {a.categoria}</span>
                    <span className="status-badge status-enviada">{statusLabel}</span>
                  </div>

                  <div className="text-xs text-[var(--muted)] mb-1">Para {a.nombre}</div>
                  <h3 className="font-display text-sm font-extrabold text-[var(--ink)] mb-2">
                    {a.oferta}
                  </h3>
                  <div className="text-xs text-[var(--muted)] mb-4">Canal de entrega: {a.canal}</div>

                  <div className="border-t border-[var(--border-2)] pt-3">
                    <div className="font-mono text-lg font-extrabold text-[var(--blue)]">
                      {fmt(a.monto)}
                    </div>
                    <div className="text-[11px] text-[var(--muted-2)] mt-0.5">
                      Monto sugerido para este perfil
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. DE LA CÉDULA A LA OFERTA SECTION (IMAGEN 4) */}
      <section className="relative overflow-hidden py-20 bg-[var(--blue)] text-white" id="proceso">
        <Triangles variant="white-on-blue" className="right-0 top-0 w-[450px] opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-sm font-extrabold uppercase tracking-wider text-[var(--yellow)]">
                De la cédula a la oferta
              </span>
              <h2 className="font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
                Un flujo de <span className="text-[var(--yellow)]">cinco pasos</span>, de punta a punta
              </h2>
              <p className="text-sm text-white/80 leading-relaxed font-normal">
                Cada perfil recorre el mismo pipeline: se carga, se enriquece, se segmenta, se decide el canal y se despacha — en ese orden, siempre.
              </p>
            </div>

            {/* Right 5 Step Stacked Cards */}
            <div className="lg:col-span-7 space-y-3">
              {timelineSteps.map((step) => (
                <div
                  key={step.n}
                  className="flex items-center gap-5 rounded-2xl bg-white p-4 text-[var(--ink)] shadow-md transition-all hover:translate-x-1"
                >
                  <div className="font-display text-3xl font-extrabold text-[var(--yellow)] shrink-0 w-12 text-center">
                    {step.n}
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-[var(--ink)]">{step.t}</h3>
                    <p className="text-xs text-[var(--muted)] mt-0.5">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOT DE CANALES SECTION (IMAGEN 5) */}
      <section className="relative overflow-hidden py-20 bg-white" id="bot">
        <Triangles variant="yellow-soft" className="right-0 top-0 w-[350px] opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content & Channel Cards */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="eyebrow text-[var(--yellow-dark)]">Bot de canales</span>
                <h2 className="mt-2 font-display text-3xl font-extrabold text-[var(--ink)] md:text-4xl">
                  La oferta llega por donde el <span className="text-[var(--blue)]">afiliado ya está</span>
                </h2>
                <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
                  El bot analiza edad, actividad en redes y horarios de interacción para elegir el canal y el momento de envío, luego el worker despacha la oferta en segundo plano.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {channelCards.map((ch, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl border border-[var(--border-2)] bg-[#F8FAFC] p-4 shadow-sm"
                  >
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--blue)] text-white">
                      <ch.Icon fontSize="small" />
                    </div>
                    <div>
                      <b className="font-display text-xs font-bold text-[var(--ink)] block">{ch.n}</b>
                      <span className="text-[11px] text-[var(--muted)] block mt-0.5">{ch.d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Live Bot Box Simulation */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-[var(--blue)] p-6 text-white shadow-xl space-y-4 relative overflow-hidden">
                <div className="text-xs font-bold text-[var(--yellow)] uppercase tracking-wider">
                  Bot de canales • selección automática
                </div>

                <div className="rounded-xl bg-white/10 p-3.5 text-xs text-white leading-relaxed border border-white/15">
                  Hola Camila. Analizamos tu actividad reciente: mayor apertura de mensajes por WhatsApp entre 6:00 p.m. y 8:00 p.m.
                </div>

                <div className="inline-block rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-white">
                  Canal seleccionado: WhatsApp • Ventana: 18:00–20:00
                </div>

                <div className="text-[11px] italic text-white/70">Worker despachando oferta...</div>

                <div className="rounded-xl bg-white p-4 text-[var(--ink)] shadow-md text-xs space-y-1">
                  <b className="font-bold block">Tu cupo rotativo de $2.400.000 ya está listo para activar.</b>
                  <p className="text-[11px] text-[var(--muted)]">¿Quieres ver el detalle?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CATEGORÍAS DE AFILIACIÓN SECTION (IMAGEN 6) */}
      <section className="relative overflow-hidden py-20 bg-[#F4F6F9]" id="categorias">
        <Triangles variant="yellow" className="right-0 top-0 w-[400px] opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-6 md:px-10">
          <div className="max-w-3xl mb-10">
            <span className="eyebrow">Categorías de afiliación</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-[var(--blue)] md:text-4xl">
              La categoría determina tarifas, beneficios y tope de crédito
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[var(--border-2)] bg-white shadow-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#4A4A4A] text-white uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Categoría</th>
                  <th className="px-6 py-4">Ingreso mensual reportado</th>
                  <th className="px-6 py-4">Ejemplo de tope orientativo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-2)] text-[var(--ink)] font-medium">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-display font-extrabold text-sm text-[var(--ink)]">A</td>
                  <td className="px-6 py-4">Hasta 2 SMMLV</td>
                  <td className="px-6 py-4">Libranza hasta $1.500.000</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-display font-extrabold text-sm text-[var(--ink)]">B</td>
                  <td className="px-6 py-4">Más de 2 y hasta 4 SMMLV</td>
                  <td className="px-6 py-4">Hasta 2× salario reportado</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-display font-extrabold text-sm text-[var(--ink)]">C</td>
                  <td className="px-6 py-4">Más de 4 SMMLV</td>
                  <td className="px-6 py-4">Hasta 3× salario reportado</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-display font-extrabold text-sm text-[var(--ink)]">D</td>
                  <td className="px-6 py-4">No afiliado</td>
                  <td className="px-6 py-4">Condiciones diferenciadas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FLOATING CHATBOT WIDGET */}
      <ChatbotWidget />
    </div>
  );
}
