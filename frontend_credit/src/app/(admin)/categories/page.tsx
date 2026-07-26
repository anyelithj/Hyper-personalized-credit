'use client';

import { useEffect, useState } from 'react';
import CategoriesTable from '@/components/admin/CategoriesTable';
import { categoryService } from '@/services/categoryService';
import type { CategoryDefinition } from '@/types/category';


export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryDefinition[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    categoryService.list().then((data) => {
      setCategories(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-[var(--ink)]">Categorías de afiliación</h1>
        <p className="text-sm text-[var(--muted)]">
          La categoría determina tarifas, beneficios y tope de crédito de cada afiliado (RF-06).
        </p>
      </div>

      <CategoriesTable isLoading={isLoading} categories={categories} />
    </div>
  );
}
