'use client';

import Link from 'next/link';
import Menu from '@mui/icons-material/Menu';
import Close from '@mui/icons-material/Close';
import Toggle from '@/components/ui/Toggle';
import { useActivePath } from '@/hooks/useActivePath';
import { cn } from '@/lib/cn';
import { PUBLIC_NAV_LINKS } from '@/lib/constants';

function NavbarBrand() {
  return (
    <Link href="/" className="flex items-center gap-2 font-display text-2xl font-bold text-white no-underline tracking-tight">
      <div className="flex items-center gap-1">
        <span className="font-extrabold text-3xl tracking-tighter">sidio</span>
      </div>
    </Link>
  );
}

function NavbarLinks({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const { isActive } = useActivePath();

  return (
    <nav
      id="navbar-mobile-links"
      aria-label="Principal"
      className={cn(
        'md:static md:flex md:items-center md:gap-7 md:bg-transparent md:p-0 md:shadow-none',
        'absolute inset-x-0 top-16 flex-col gap-2 border-b border-[var(--blue-dark)] bg-[var(--blue)] p-4 shadow-md',
        open ? 'flex' : 'hidden',
      )}
    >
      {PUBLIC_NAV_LINKS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          aria-current={isActive(item.href) ? 'page' : undefined}
          className={cn(
            'text-[14px] font-medium text-white/90 no-underline hover:text-white transition-colors',
            isActive(item.href) && 'text-white font-semibold',
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

function NavbarCTA() {
  return (
    <Link
      href="/login"
      className="hidden md:inline-flex items-center justify-center rounded-full bg-[var(--yellow)] px-5 py-2.5 text-xs font-extrabold text-[var(--ink)] no-underline hover:bg-[var(--yellow-hover)] transition-all shadow-sm"
    >
      Acceso Administrador
    </Link>
  );
}

function Navbar() {
  return (
    <Toggle initial={false}>
      {({ isOn: open, toggle, setOn }) => (
        <header className="sticky top-0 z-50 bg-[var(--blue)] shadow-md">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 md:px-10">
            <Navbar.Brand />
            <Navbar.Links open={open} onNavigate={() => setOn(false)} />
            <div className="flex items-center gap-3">
              <Navbar.CTA />
              <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-controls="navbar-mobile-links"
                aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
                className="grid h-9 w-9 place-items-center rounded-lg text-white hover:bg-white/10 md:hidden"
              >
                {open ? <Close aria-hidden="true" /> : <Menu aria-hidden="true" />}
              </button>
            </div>
          </div>
        </header>
      )}
    </Toggle>
  );
}

Navbar.Brand = NavbarBrand;
Navbar.Links = NavbarLinks;
Navbar.CTA = NavbarCTA;

export default Navbar;
