'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AffiliateForm from '@/components/admin/AffiliateForm';
import { affiliateService } from '@/services/affiliateService';
import { useAffiliatesStore } from '@/store/useAffiliatesStore';
import type { AffiliateFormValues } from '@/types/affiliate';


export default function EditAffiliatePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const update = useAffiliatesStore((state) => state.update);
  const [initialValues, setInitialValues] = useState<AffiliateFormValues | null>(null);

  useEffect(() => {
    affiliateService.get(Number(params.id)).then((affiliate) => {
      const { cedula, nombre, correo, direccion, categoria, ingreso_mensual } = affiliate;
      setInitialValues({ cedula, nombre, correo, direccion, categoria, ingreso_mensual });
    });
  }, [params.id]);

  const handleSubmit = async (values: AffiliateFormValues) => {
    await update(Number(params.id), values);
    router.push('/affiliates');
  };

  if (!initialValues) {
    return <p className="text-[var(--muted)]">Cargando afiliado…</p>;
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-[var(--ink)]">Editar afiliado</h1>
      <p className="mb-6 text-sm text-[var(--muted)]">Actualiza los datos del afiliado.</p>
      <AffiliateForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Guardar cambios" />
    </div>
  );
}
