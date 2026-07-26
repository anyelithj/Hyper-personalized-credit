'use client';

import Link from 'next/link';
import Visibility from '@mui/icons-material/Visibility';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import Toggle from '@/components/ui/Toggle';
import { withLoading } from '@/components/ui/withLoading';
import { formatCurrency } from '@/lib/format';
import type { CreditProduct } from '@/types/credit-product';

interface CreditProductsTableProps {
  products: CreditProduct[];
  onDelete: (id: number) => void;
}


function CreditProductsTable({ products, onDelete }: CreditProductsTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--border-2)] bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Líneas activas del portafolio de crédito</caption>
        <thead className="bg-[var(--ink)] text-[10.5px] uppercase font-mono tracking-wider text-white/80">
          <tr>
            <th scope="col" className="px-5 py-3">Línea</th>
            <th scope="col" className="px-5 py-3">Monto mín.</th>
            <th scope="col" className="px-5 py-3">Monto máx.</th>
            <th scope="col" className="px-5 py-3">Plazo</th>
            <th scope="col" className="px-5 py-3">Requisito clave</th>
            <th scope="col" className="px-5 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-2)]">
          {products.length === 0 && (
            <tr>
              <td colSpan={6} className="px-5 py-8 text-center text-xs text-[var(--muted-2)]">
                Aún no hay líneas configuradas en el portafolio.
              </td>
            </tr>
          )}
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-[#FAFBFC] transition-colors">
              <td className="px-5 py-3.5 font-medium text-[var(--ink)]">{product.nombre}</td>
              <td className="px-5 py-3.5 font-mono text-xs text-[var(--text)]">{formatCurrency(product.monto_min)}</td>
              <td className="px-5 py-3.5 font-mono text-xs text-[var(--text)]">{formatCurrency(product.monto_max)}</td>
              <td className="px-5 py-3.5 text-xs text-[var(--text)]">{product.plazo}</td>
              <td className="px-5 py-3.5 text-xs text-[var(--muted)]">{product.requisito_clave}</td>
              <td className="px-5 py-3.5">
                <div className="flex justify-end items-center gap-1">
                  <Link
                    href={`/portfolio/${product.id}`}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] bg-[var(--paper)] text-[var(--text)] hover:bg-white hover:border-[var(--ink)] transition-colors"
                    title="Visualizar"
                  >
                    <Visibility className="!w-4 !h-4" />
                  </Link>
                  <Link
                    href={`/portfolio/${product.id}/edit`}
                    className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] bg-[var(--paper)] text-[var(--text)] hover:bg-white hover:border-[var(--ink)] transition-colors"
                    title="Editar"
                  >
                    <Edit className="!w-4 !h-4" />
                  </Link>

                  <Toggle>
                    {({ isOn: confirming, toggle }) =>
                      confirming ? (
                        <span className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              onDelete(product.id);
                              toggle();
                            }}
                            className="rounded px-2 py-1 text-xs font-semibold bg-[var(--rose-light)] text-[var(--rose)] hover:bg-[var(--rose)] hover:text-white transition-colors"
                          >
                            Sí, eliminar
                          </button>
                          <button
                            type="button"
                            onClick={toggle}
                            className="rounded px-2 py-1 text-xs text-[var(--muted)] hover:text-[var(--ink)]"
                          >
                            X
                          </button>
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={toggle}
                          className="grid h-8 w-8 place-items-center rounded-lg border border-[var(--border)] bg-[var(--paper)] text-[var(--rose)] hover:bg-[var(--rose-light)] transition-colors"
                          title="Eliminar"
                        >
                          <Delete className="!w-4 !h-4" />
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
  );
}


export default withLoading(CreditProductsTable);
