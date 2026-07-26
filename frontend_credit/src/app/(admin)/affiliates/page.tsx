'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import PersonAdd from '@mui/icons-material/PersonAdd';
import AffiliatesTable from '@/components/admin/AffiliatesTable';
import Button from '@/components/ui/Button';
import { useAffiliatesStore } from '@/store/useAffiliatesStore';


export default function AffiliatesPage() {
  const { affiliates, isLoading, search, setSearch, fetchAll, remove } = useAffiliatesStore();

  useEffect(() => {
    fetchAll();
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-[var(--blue)]">Afiliados</h1>
          <p className="text-xs text-[var(--muted)] mt-1">
            Registro individual o por lote, con la categoría y los datos base para el perfilamiento.
          </p>
        </div>
        <Button component={Link as never} href="/affiliates/new" startIcon={<PersonAdd />} className="!rounded-full !bg-[#3A3A3A] hover:!bg-black !px-5 !py-2.5 !text-xs !font-bold !shadow-sm">
          + Nuevo afiliado
        </Button>
      </div>

      <AffiliatesTable
        isLoading={isLoading}
        affiliates={affiliates}
        search={search}
        onSearchChange={setSearch}
        onDelete={remove}
      />
    </div>
  );
}
