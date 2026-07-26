'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CreditProductForm from '@/components/admin/CreditProductForm';
import { portfolioService } from '@/services/portfolioService';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import type { CreditProductFormValues } from '@/types/credit-product';

export default function EditCreditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const update = usePortfolioStore((state) => state.update);
  const [initialValues, setInitialValues] = useState<CreditProductFormValues | null>(null);

  useEffect(() => {
    portfolioService.get(Number(params.id)).then((product) => {
      const { nombre, monto_min, monto_max, plazo, requisito_clave } = product;
      setInitialValues({ nombre, monto_min, monto_max, plazo, requisito_clave });
    });
  }, [params.id]);

  const handleSubmit = async (values: CreditProductFormValues) => {
    await update(Number(params.id), values);
    router.push('/portfolio');
  };

  if (!initialValues) {
    return <p className="text-[var(--muted)]">Cargando línea de crédito…</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-[var(--ink)]">Editar línea de crédito</h1>
      <p className="mb-6 text-sm text-[var(--muted)]">Actualiza monto, plazo y requisito clave.</p>
      <CreditProductForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Guardar cambios" />
    </div>
  );
}
