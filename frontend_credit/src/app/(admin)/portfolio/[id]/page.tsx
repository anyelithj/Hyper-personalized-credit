'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Edit from '@mui/icons-material/Edit';
import Button from '@/components/ui/Button';
import { portfolioService } from '@/services/portfolioService';
import { formatCurrency } from '@/lib/format';
import type { CreditProduct } from '@/types/credit-product';

export default function CreditProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<CreditProduct | null>(null);

  useEffect(() => {
    portfolioService.get(Number(params.id)).then(setProduct);
  }, [params.id]);

  if (!product) {
    return <p className="text-[var(--muted)]">Cargando línea de crédito…</p>;
  }

  return (
    <div className="max-w-xl">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--ink)]">{product.nombre}</h1>
          <p className="text-sm text-[var(--muted)]">Plazo: {product.plazo}</p>
        </div>
        <Button component={Link as never} href={`/portfolio/${product.id}/edit`} startIcon={<Edit />}>
          Editar
        </Button>
      </div>

      <dl className="grid grid-cols-2 gap-4 rounded-xl border border-[var(--border-2)] bg-white p-5 text-sm">
        <div>
          <dt className="text-[var(--muted)]">Monto mínimo</dt>
          <dd className="mt-1 text-[var(--ink)]">{formatCurrency(product.monto_min)}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Monto máximo</dt>
          <dd className="mt-1 text-[var(--ink)]">{formatCurrency(product.monto_max)}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[var(--muted)]">Requisito clave</dt>
          <dd className="mt-1 text-[var(--ink)]">{product.requisito_clave}</dd>
        </div>
      </dl>
    </div>
  );
}
