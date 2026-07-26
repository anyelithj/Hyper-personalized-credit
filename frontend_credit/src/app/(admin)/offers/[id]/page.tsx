'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Edit from '@mui/icons-material/Edit';
import Send from '@mui/icons-material/Send';
import Button from '@/components/ui/Button';
import { offerService } from '@/services/offerService';
import { useOffersStore } from '@/store/useOffersStore';
import { formatCurrency } from '@/lib/format';
import type { Offer } from '@/types/offer';

export default function OfferDetailPage({ params }: { params: { id: string } }) {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [isDispatching, setIsDispatching] = useState(false);
  const dispatch = useOffersStore((state) => state.dispatch);

  const reload = () => offerService.get(Number(params.id)).then(setOffer);

  useEffect(() => {
    reload();
  }, [params.id]);

  const handleDispatch = async () => {
    setIsDispatching(true);
    try {
      await dispatch(Number(params.id));
      await reload();
    } finally {
      setIsDispatching(false);
    }
  };

  if (!offer) {
    return <p className="text-[var(--muted)]">Cargando oferta…</p>;
  }

  return (
    <div className="max-w-xl">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--ink)]">{offer.affiliate_nombre}</h1>
          <p className="text-sm text-[var(--muted)]">{offer.credit_product_nombre}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button component={Link as never} href={`/offers/${offer.id}/edit`} startIcon={<Edit />} variant="outlined">
            Editar
          </Button>
          {offer.estado === 'Pendiente' && (
            <Button startIcon={<Send />} disabled={isDispatching} onClick={handleDispatch}>
              {isDispatching ? 'Despachando…' : 'Despachar'}
            </Button>
          )}
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-4 rounded-xl border border-[var(--border-2)] bg-white p-5 text-sm">
        <div>
          <dt className="text-[var(--muted)]">Monto</dt>
          <dd className="mt-1 text-[var(--ink)]">{formatCurrency(offer.monto)}</dd>
        </div>
        <div>
          <dt className="text-[var(--muted)]">Canal</dt>
          <dd className="mt-1 text-[var(--ink)]">{offer.canal}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[var(--muted)]">Estado</dt>
          <dd className="mt-1"><Chip label={offer.estado} size="small" /></dd>
        </div>
      </dl>

      {offer.explicacion && (
        <Alert severity="info" className="mt-4" role="note">
          <strong className="block text-xs font-semibold uppercase tracking-wide">
            Explicación del motor de recomendación
          </strong>
          <span className="text-sm">{offer.explicacion}</span>
        </Alert>
      )}
    </div>
  );
}
