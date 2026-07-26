'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Add from '@mui/icons-material/Add';
import OffersTable from '@/components/admin/OffersTable';
import Button from '@/components/ui/Button';
import { useOffersStore } from '@/store/useOffersStore';

export default function OffersPage() {
  const { offers, isLoading, search, setSearch, fetchAll, remove, dispatch } = useOffersStore();

  useEffect(() => {
    fetchAll();
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-[var(--blue)]">Ofertas generadas</h1>
          <p className="text-xs text-[var(--muted)] mt-1">
            Cada oferta cruza un afiliado con una línea del portafolio, un monto y un canal de entrega.
          </p>
        </div>
        <Button component={Link as never} href="/offers/new" startIcon={<Add />} className="!rounded-full !bg-[#3A3A3A] hover:!bg-black !px-5 !py-2.5 !text-xs !font-bold !shadow-sm">
          + Nueva oferta
        </Button>
      </div>

      <OffersTable
        isLoading={isLoading}
        offers={offers}
        search={search}
        onSearchChange={setSearch}
        onDelete={remove}
        onDispatch={dispatch}
      />
    </div>
  );
}
