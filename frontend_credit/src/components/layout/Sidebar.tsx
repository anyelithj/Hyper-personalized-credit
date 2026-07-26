'use client';

import Link from 'next/link';
import Dashboard from '@mui/icons-material/Dashboard';
import People from '@mui/icons-material/People';
import Campaign from '@mui/icons-material/Campaign';
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWallet';
import Category from '@mui/icons-material/Category';
import Chat from '@mui/icons-material/Chat';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Logout from '@mui/icons-material/Logout';
import Toggle from '@/components/ui/Toggle';
import { useActivePath } from '@/hooks/useActivePath';
import { cn } from '@/lib/cn';
import { ADMIN_NAV_LINKS } from '@/lib/constants';
import type { NavItem } from '@/types/nav';

const ICONS: Record<string, typeof Dashboard> = {
  Dashboard,
  People,
  Campaign,
  AccountBalanceWallet,
  Category,
  Chat,
};

function SidebarItem({ item, expanded }: { item: NavItem; expanded: boolean }) {
  const { isActive } = useActivePath();
  const Icon = (item.icon && ICONS[item.icon]) || Dashboard;
  const active = isActive(item.href);

  return (
    <li>
      <Link
        href={item.href}
        aria-current={active ? 'page' : undefined}
        title={!expanded ? item.label : undefined}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.8px] font-medium no-underline transition-colors',
          active
            ? 'bg-white/15 text-white font-bold border-l-4 border-[var(--yellow)]'
            : 'text-white/80 hover:bg-white/10 hover:text-white',
        )}
      >
        <Icon fontSize="small" aria-hidden="true" />
        <span className={cn('whitespace-nowrap', !expanded && 'sr-only')}>{item.label}</span>
      </Link>
    </li>
  );
}

function Sidebar() {
  return (
    <Toggle initial>
      {({ isOn: expanded, toggle }) => (
        <aside
          className={cn(
            'flex shrink-0 flex-col bg-[var(--blue)] text-white transition-[width] duration-200 shadow-lg',
            expanded ? 'w-64' : 'w-[72px]',
          )}
        >
          <div className="flex h-16 items-center gap-2.5 border-b border-white/15 px-6">
            {expanded ? (
              <span className="truncate font-display text-[18px] font-bold text-white">
                Crédito perfilado
              </span>
            ) : (
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/15 font-display text-sm font-bold text-[var(--yellow)]">
                CP
              </span>
            )}
          </div>

          <nav aria-label="Panel administrador" className="flex-1 space-y-1 px-3 py-4">
            <ul className="space-y-1">
              {ADMIN_NAV_LINKS.map((item) => (
                <Sidebar.Item key={item.href} item={item} expanded={expanded} />
              ))}
            </ul>
          </nav>

          <div className="border-t border-white/15 p-4 space-y-3">
            <div className="flex items-center gap-3 px-1">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--yellow)] font-bold text-[var(--ink)] text-xs shadow-sm">
                AD
              </div>
              {expanded && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-white">Admin operativo</p>
                  <p className="truncate text-[11px] text-white/70">Analista de negocio</p>
                </div>
              )}
            </div>

            <Link
              href="/"
              className={cn(
                'flex items-center gap-2 rounded-lg border border-white/30 px-3 py-2 text-xs font-semibold text-white no-underline hover:bg-white/10 transition-colors',
                !expanded && 'justify-center',
              )}
            >
              <Logout fontSize="small" />
              {expanded && <span>Cerrar sesión</span>}
            </Link>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-label={expanded ? 'Contraer menú' : 'Expandir menú'}
            className="m-2 grid h-8 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
          >
            {expanded ? <ChevronLeft aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
          </button>
        </aside>
      )}
    </Toggle>
  );
}

Sidebar.Item = SidebarItem;

export default Sidebar;
