'use client';

import { useAuthStore } from '@/store/useAuthStore';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-bold text-[var(--ink)]">Mi Perfil</h1>
      <p className="mb-6 text-sm text-[var(--muted)]">Información del usuario autenticado.</p>

      <div className="rounded-xl border border-[var(--border-2)] bg-white p-6 shadow-sm space-y-4">
        <div>
          <label className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider block mb-1">
            Nombre
          </label>
          <p className="text-sm font-medium text-[var(--ink)]">{user?.nombre || 'Administrador'}</p>
        </div>
        <div>
          <label className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider block mb-1">
            Correo electrónico
          </label>
          <p className="text-sm font-medium text-[var(--ink)]">{user?.email || 'admin@credito.com'}</p>
        </div>
      </div>
    </div>
  );
}
