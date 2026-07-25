import Link from "next/link";
import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  showBackLink?: boolean;
};

export function PageShell({ title, subtitle, children, showBackLink = true }: PageShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <Link href="/" className="text-lg font-semibold tracking-[0.25em] text-sky-700 uppercase">
              Crédito Inteligente
            </Link>
            <p className="text-sm text-slate-500">{subtitle ?? "Comparación clara y segura"}</p>
          </div>
          <nav className="flex items-center gap-3 text-sm font-medium text-slate-600">
            <Link href="/compare" className="transition hover:text-sky-700">
              Comparador
            </Link>
            <Link href="/login" className="transition hover:text-sky-700">
              Login
            </Link>
            <Link href="/register" className="transition hover:text-sky-700">
              Registro
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950">{title}</h1>
            {showBackLink ? (
              <Link href="/" className="mt-2 inline-flex text-sm font-medium text-sky-700 hover:text-sky-800">
                ← Volver al inicio
              </Link>
            ) : null}
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
