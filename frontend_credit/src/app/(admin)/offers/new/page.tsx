'use client';

import { useRouter } from 'next/navigation';
import OfferForm from '@/components/admin/OfferForm';
import { useOffersStore } from '@/store/useOffersStore';
import type { OfferFormValues } from '@/types/offer';

export default function NewOfferPage() {
  const router = useRouter();
  const create = useOffersStore((state) => state.create);

  const handleSubmit = async (values: OfferFormValues) => {
    await create(values);
    router.push('/offers');
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-[var(--ink)]">Nueva oferta</h1>
      <p className="mb-6 text-sm text-[var(--muted)]">
        Asigna una línea de crédito, un monto y el canal de despacho (RF-07/RF-08).
      </p>
      <OfferForm onSubmit={handleSubmit} submitLabel="Registrar oferta" />
    </div>
  );
}
