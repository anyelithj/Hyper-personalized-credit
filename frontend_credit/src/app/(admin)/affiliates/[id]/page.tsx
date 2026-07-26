'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Chip from '@mui/material/Chip';
import Edit from '@mui/icons-material/Edit';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import Button from '@/components/ui/Button';
import { affiliateService } from '@/services/affiliateService';
import { useOffersStore } from '@/store/useOffersStore';
import { formatCurrency } from '@/lib/format';
import type { Affiliate } from '@/types/affiliate';

export default function AffiliateDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [isRecommending, setIsRecommending] = useState(false);
  const recommend = useOffersStore((state) => state.recommend);

  useEffect(() => {
    affiliateService.get(Number(params.id)).then(setAffiliate);
  }, [params.id]);

  const handleRecommend = async () => {
    setIsRecommending(true);
    try {
      await recommend(Number(params.id));
      router.push('/offers');
    } finally {
      setIsRecommending(false);
    }
  };

  if (!affiliate) {
    return <p className="text-[var(--muted)]">Cargando afiliado…</p>;
  }

  return (
    <div className="max-w-xl">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--ink)]">{affiliate.nombre}</h1>
          <p className="text-sm text-[var(--muted)]">CC {affiliate.cedula}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button component={Link as never} href={`/affiliates/${affiliate.id}/edit`} startIcon={<Edit />} variant="outlined">
            Editar
          </Button>
          <Button startIcon={<AutoAwesome />} disabled={isRecommending} onClick={handleRecommend}>
            {isRecommending ? 'Calculando…' : 'Generar oferta recomendada'}
          </Button>
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-4 rounded-xl border border-[var(--border-2)] bg-white p-5 text-sm">
        <div>
          <dt className="text-[var(--muted)]">Categoría</dt>
          <dd className="mt-1"><Chip label={affiliate.categoria} size="small" /></dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Ingreso mensual declarado</dt>
          <dd className="mt-1 text-[var(--ink)]">{formatCurrency(affiliate.ingreso_mensual)}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Correo</dt>
          <dd className="mt-1 text-[var(--ink)]">{affiliate.correo}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[var(--muted)]">Dirección</dt>
          <dd className="mt-1 text-[var(--ink)]">{affiliate.direccion}</dd>
        </div>
      </dl>
    </div>
  );
}
