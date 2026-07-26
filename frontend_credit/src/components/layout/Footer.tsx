import Link from 'next/link';
import Triangles from '@/components/ui/Triangles';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--blue)] text-white pt-12 pb-6">
      <Triangles variant="white-on-blue" className="right-0 top-0 w-80 opacity-40 pointer-events-none" />
      <div className="relative mx-auto grid max-w-6xl gap-9 px-6 md:grid-cols-3">
        <div>
          <h3 className="font-display text-lg font-bold text-white mb-3">
            CréditoPerfilado
          </h3>
          <p className="text-xs leading-relaxed max-w-xs text-white/80">
            Motor de perfilamiento y despacho de ofertas de crédito, construido sobre señales de comportamiento y no sobre burós tradicionales.
          </p>
        </div>

        <nav aria-label="Plataforma">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Plataforma</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/#servicios" className="no-underline text-white/80 hover:text-white transition-colors">
                Portafolio
              </Link>
            </li>
            <li>
              <Link href="/#proceso" className="no-underline text-white/80 hover:text-white transition-colors">
                Cómo funciona
              </Link>
            </li>
            <li>
              <Link href="/#bot" className="no-underline text-white/80 hover:text-white transition-colors">
                Bot &amp; canales
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Equipo interno">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Equipo interno</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/login" className="no-underline text-white/80 hover:text-white transition-colors">
                Acceso administrador
              </Link>
            </li>
            <li>
              <Link href="/#categorias" className="no-underline text-white/80 hover:text-white transition-colors">
                Categorías de afiliación
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="relative mx-auto mt-10 max-w-6xl border-t border-white/20 pt-4 px-6 text-[11px] text-white/70 flex flex-wrap justify-between gap-2">
        <span>Prototipo funcional · datos sintéticos</span>
        <span>Reto Crédito Hiperpersonalizado</span>
      </div>
    </footer>
  );
}
