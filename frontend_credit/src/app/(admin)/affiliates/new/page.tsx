'use client';

import { useRouter } from 'next/navigation';
import AffiliateForm from '@/components/admin/AffiliateForm';
import { useAffiliatesStore } from '@/store/useAffiliatesStore';
import type { AffiliateFormValues } from '@/types/affiliate';

export default function NewAffiliatePage() {
  const router = useRouter();
  const create = useAffiliatesStore((state) => state.create);

  const handleSubmit = async (values: AffiliateFormValues) => {
    await create(values);
    router.push('/affiliates');
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-bold text-[var(--ink)]">Nuevo afiliado</h1>
      <p className="mb-6 text-sm text-[var(--muted)]">Registra un nuevo afiliado en el sistema.</p>
      <AffiliateForm onSubmit={handleSubmit} submitLabel="Crear afiliado" />
    </div>
  );
}
