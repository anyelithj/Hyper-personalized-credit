'use client';

import Link from 'next/link';
import Visibility from '@mui/icons-material/Visibility';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Search from '@mui/icons-material/Search';
import Toggle from '@/components/ui/Toggle';
import { withLoading } from '@/components/ui/withLoading';
import type { Affiliate } from '@/types/affiliate';

interface AffiliatesTableProps {
  affiliates: Affiliate[];
  search: string;
  onSearchChange: (value: string) => void;
  onDelete: (id: number) => void;
}

function AffiliatesTable({ affiliates, search, onSearchChange, onDelete }: AffiliatesTableProps) {
  return (
    <div className="rounded-2xl bg-[#BCC2CB] p-4 shadow-md space-y-3">
      <div className="flex justify-between items-center px-2 py-1 flex-wrap gap-3">
        <div>
          <h2 className="font-display text-sm font-bold text-[var(--ink)]">Base de afiliados</h2>
          <p className="text-[11px] text-[var(--muted)]">{affiliates.length} registros</p>
        </div>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por cédula o nombre"
            className="w-60 rounded-xl border border-[var(--border)] bg-white pl-8 pr-3 py-1.5 text-xs text-[var(--text)] focus:border-[var(--blue)] focus:outline-none shadow-sm"
          />
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-2)] !w-4 !h-4" />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-xs">
          <caption className="sr-only">Listado de afiliados registrados</caption>
          <thead className="bg-[#4A4A4A] text-white uppercase font-bold tracking-wider">
            <tr>
              <th scope="col" className="px-5 py-3.5">CÉDULA</th>
              <th scope="col" className="px-5 py-3.5">NOMBRE</th>
              <th scope="col" className="px-5 py-3.5">CORREO</th>
              <th scope="col" className="px-5 py-3.5">CATEGORÍA</th>
              <th scope="col" className="px-5 py-3.5">CANAL PREFERIDO</th>
              <th scope="col" className="px-5 py-3.5">SEÑALES</th>
              <th scope="col" className="px-5 py-3.5 text-right">ACCIONES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] font-medium text-[var(--ink)]">
            {affiliates.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-8 text-center text-xs text-[var(--muted)]">
                  No hay afiliados que coincidan con la búsqueda.
                </td>
              </tr>
            )}
            {affiliates.map((affiliate) => (
              <tr key={affiliate.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3 font-mono text-xs text-[var(--text)]">{affiliate.cedula}</td>
                <td className="px-5 py-3 font-bold text-[var(--ink)]">{affiliate.nombre}</td>
                <td className="px-5 py-3 text-xs text-[var(--muted)]">{affiliate.correo}</td>
                <td className="px-5 py-3">
                  <span className="cat-badge">
                    Cat. {affiliate.categoria}
                  </span>
                </td>
                <td className="px-5 py-3 text-xs text-[var(--text)]">{affiliate.canal || 'WhatsApp'}</td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-3 py-0.5 text-[11px] font-semibold text-gray-700">
                    {affiliate.senales?.length || 3} señales
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex justify-end items-center gap-1.5">
                    <Link
                      href={`/affiliates/${affiliate.id}`}
                      className="grid h-7 w-7 place-items-center rounded-lg border border-gray-300 bg-white text-[var(--text)] hover:bg-gray-100 transition-colors"
                      title="Visualizar"
                    >
                      <Visibility className="!w-3.5 !h-3.5" />
                    </Link>
                    <Link
                      href={`/affiliates/${affiliate.id}/edit`}
                      className="grid h-7 w-7 place-items-center rounded-lg border border-gray-300 bg-white text-[var(--text)] hover:bg-gray-100 transition-colors"
                      title="Editar"
                    >
                      <Edit className="!w-3.5 !h-3.5" />
                    </Link>

                    <Toggle>
                      {({ isOn: confirming, toggle }) =>
                        confirming ? (
                          <span className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                onDelete(affiliate.id);
                                toggle();
                              }}
                              className="rounded px-2 py-1 text-[11px] font-semibold bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                            >
                              Eliminar
                            </button>
                            <button
                              type="button"
                              onClick={toggle}
                              className="rounded px-1.5 py-0.5 text-[11px] text-gray-500 hover:text-black"
                            >
                              X
                            </button>
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={toggle}
                            className="grid h-7 w-7 place-items-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Eliminar"
                          >
                            <Delete className="!w-3.5 !h-3.5" />
                          </button>
                        )
                      }
                    </Toggle>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withLoading(AffiliatesTable);
