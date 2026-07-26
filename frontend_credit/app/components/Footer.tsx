export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <p className="text-xl font-semibold text-white">Crédito Inteligente</p>
            <p className="max-w-md text-sm leading-6 text-slate-400">
              La forma más clara y segura de comparar opciones de crédito para personas y empresas.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Contacto</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>hola@creditointeligente.com</li>
              <li>+51 900 123 456</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Enlaces</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <a href="#beneficios" className="transition hover:text-white">
                  Beneficios
                </a>
              </li>
              <li>
                <a href="#como-funciona" className="transition hover:text-white">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#contacto" className="transition hover:text-white">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Crédito Inteligente. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
