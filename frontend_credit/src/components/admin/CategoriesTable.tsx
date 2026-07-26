'use client';

import { withLoading } from '@/components/ui/withLoading';
import type { CategoryDefinition } from '@/types/category';

interface CategoriesTableProps {
  categories: CategoryDefinition[];
}


function CategoriesTable({ categories }: CategoriesTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[var(--border-2)] bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Categorías de afiliación y su umbral en SMMLV</caption>
        <thead className="bg-[var(--ink)] text-[10.5px] uppercase font-mono tracking-wider text-white/80">
          <tr>
            <th scope="col" className="px-5 py-3">Categoría</th>
            <th scope="col" className="px-5 py-3">Rango (SMMLV)</th>
            <th scope="col" className="px-5 py-3">Descripción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-2)]">
          {categories.map((category) => (
            <tr key={category.categoria} className="hover:bg-[#FAFBFC] transition-colors">
              <td className="px-5 py-3.5">
                <span className={`cat-badge cat-${category.categoria}`}>Cat. {category.categoria}</span>
                <span className="ml-2 font-medium text-[var(--ink)]">{category.etiqueta}</span>
              </td>
              <td className="px-5 py-3.5 text-[var(--muted)]">
                {category.smmlv_max === null
                  ? `Más de ${category.smmlv_min} SMMLV`
                  : `${category.smmlv_min} - ${category.smmlv_max} SMMLV`}
              </td>
              <td className="px-5 py-3.5 text-[var(--muted)]">{category.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default withLoading(CategoriesTable);
