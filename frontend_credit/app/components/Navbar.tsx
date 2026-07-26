"use client";

import { useState } from "react";
import { Button } from "./Button";

const navItems = [
  { label: "Beneficios", href: "#beneficios" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#inicio" className="text-xl font-semibold tracking-tight text-slate-950">
          Crédito Inteligente
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:gap-4">
          <Button className="whitespace-nowrap">Comenzar</Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 transition hover:border-slate-300 hover:text-slate-950 md:hidden"
          aria-label="Abrir menú"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span className="sr-only">Abrir menú</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-200 bg-white/95 px-6 py-6 shadow-sm md:hidden">
          <div className="space-y-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button className="w-full">Comenzar</Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
