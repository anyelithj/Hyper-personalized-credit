'use client';

import { useRouter } from 'next/navigation';
import CreditProductForm from '@/components/admin/CreditProductForm';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import type { CreditProductFormValues } from '@/types/credit-product';

/** CRUD - Create / RF-05: nueva línea del portafolio de crédito */
export default function NewCreditProductPage() {
  const router = useRouter();
  const create = usePortfolioStore((state) => state.create);

  const handleSubmit = async (values: CreditProductFormValues) => {
    await create(values);
    router.push('/portfolio');
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-[var(--ink)]">Nueva línea de crédito</h1>
      <p className="mb-6 text-sm text-[var(--muted)]">
        Define el monto mínimo, máximo, plazo y requisito clave de la línea (RF-05).
      </p>
      <CreditProductForm onSubmit={handleSubmit} submitLabel="Registrar línea" />
    </div>
  );
}
