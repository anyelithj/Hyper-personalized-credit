'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import PlaylistAdd from '@mui/icons-material/PlaylistAdd';
import CreditProductsTable from '@/components/admin/CreditProductsTable';
import Button from '@/components/ui/Button';
import { usePortfolioStore } from '@/store/usePortfolioStore';

/**
 * Container/Presentational Pattern: esta página es el "container" —
 * conecta usePortfolioStore con CreditProductsTable (presentacional).
 * RF-05: parametrización de las líneas oficiales de crédito.
 */
export default function PortfolioPage() {
  const { products, isLoading, fetchAll, remove } = usePortfolioStore();

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-[var(--ink)]">Portafolio de crédito</h1>
          <p className="text-sm text-[var(--muted)]">Parametriza las líneas oficiales: monto, plazo y requisitos.</p>
        </div>
        <Button component={Link as never} href="/portfolio/new" startIcon={<PlaylistAdd />} className="!rounded-full !bg-[var(--ink)] hover:!bg-black !px-5 !py-2.5 !text-xs !font-bold !shadow-none">
          Nueva línea
        </Button>
      </div>

      <CreditProductsTable isLoading={isLoading} products={products} onDelete={remove} />
    </div>
  );
}
