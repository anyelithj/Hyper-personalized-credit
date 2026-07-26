'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import OfferForm from '@/components/admin/OfferForm';
import { offerService } from '@/services/offerService';
import { useOffersStore } from '@/store/useOffersStore';
import type { OfferFormValues } from '@/types/offer';


export default function EditOfferPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const update = useOffersStore((state) => state.update);
  const [initialValues, setInitialValues] = useState<OfferFormValues | null>(null);

  useEffect(() => {
    offerService.get(Number(params.id)).then((offer) => {
      const { affiliate_id, credit_product_id, monto, canal, estado } = offer;
      setInitialValues({ affiliate_id, credit_product_id, monto, canal, estado });
    });
  }, [params.id]);

  const handleSubmit = async (values: OfferFormValues) => {
    await update(Number(params.id), values);
    router.push('/offers');
  };

  if (!initialValues) {
    return <p className="text-[var(--muted)]">Cargando oferta…</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-[var(--ink)]">Editar oferta</h1>
      <p className="mb-6 text-sm text-[var(--muted)]">Actualiza el monto, canal o estado de la oferta.</p>
      <OfferForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Guardar cambios" />
    </div>
  );
}
