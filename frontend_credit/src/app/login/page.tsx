'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/public/LoginForm';
import { useAuthStore } from '@/store/useAuthStore';
import type { LoginPayload } from '@/types/auth';


export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, user } = useAuthStore();

  const handleSubmit = async (values: LoginPayload) => {
    await login(values);
    if (useAuthStore.getState().user) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--blue-dark)] px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-9 shadow-xl">
        <Link href="/" className="mb-5 flex items-center gap-2 text-[var(--ink)] no-underline">
          <span className="brand-mark" />
          <span className="font-display text-lg font-extrabold">sidio</span>
        </Link>

        <h1 className="font-display text-xl font-bold text-[var(--ink)]">Panel administrador</h1>
        <p className="mb-6 mt-1 text-sm text-[var(--muted)]">
          Acceso interno para analistas y administradores de Crédito perfilado.
        </p>

        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />

        <Link
          href="/"
          className="mt-3 block rounded-lg py-2 text-center text-sm text-[var(--muted)] no-underline hover:bg-[var(--paper)]"
        >
          Volver al sitio público
        </Link>

        {user && (
          <p className="mt-2 text-center text-xs text-[var(--blue)]" role="status">
            Sesión iniciada como {user.nombre}.
          </p>
        )}
      </div>
    </div>
  );
}
