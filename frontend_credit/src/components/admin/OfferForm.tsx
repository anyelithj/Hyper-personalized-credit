'use client';

import { useEffect, useState } from 'react';
import { Formik, Form, Field, type FieldProps } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@/components/ui/Button';
import { affiliateService } from '@/services/affiliateService';
import { portfolioService } from '@/services/portfolioService';
import { offerSchema } from '@/lib/validators';
import { OFFER_CHANNELS, OFFER_STATUSES } from '@/lib/constants';
import type { Affiliate } from '@/types/affiliate';
import type { CreditProduct } from '@/types/credit-product';
import type { OfferFormValues } from '@/types/offer';

interface OfferFormProps {
  initialValues?: OfferFormValues;
  onSubmit: (values: OfferFormValues) => Promise<void>;
  submitLabel?: string;
}

const emptyValues: OfferFormValues = {
  affiliate_id: 0,
  credit_product_id: 0,
  monto: 0,
  canal: 'Correo electrónico',
  estado: 'Pendiente',
};


export default function OfferForm({
  initialValues = emptyValues,
  onSubmit,
  submitLabel = 'Guardar oferta',
}: OfferFormProps) {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [products, setProducts] = useState<CreditProduct[]>([]);

  useEffect(() => {
    affiliateService.list().then(setAffiliates);
    portfolioService.list().then(setProducts);
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(offerSchema)}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="grid gap-4 sm:grid-cols-2" noValidate>
          <Field name="affiliate_id">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                select
                label="Afiliado"
                fullWidth
                className="sm:col-span-2"
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              >
                <MenuItem value={0} disabled>
                  Selecciona un afiliado
                </MenuItem>
                {affiliates.map((affiliate) => (
                  <MenuItem key={affiliate.id} value={affiliate.id}>
                    {affiliate.nombre} · CC {affiliate.cedula}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Field>

          <Field name="credit_product_id">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                select
                label="Línea recomendada"
                fullWidth
                className="sm:col-span-2"
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              >
                <MenuItem value={0} disabled>
                  Selecciona una línea de crédito
                </MenuItem>
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.nombre}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Field>

          <Field name="monto">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                type="number"
                label="Monto"
                fullWidth
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>

          <Field name="canal">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                select
                label="Canal"
                fullWidth
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              >
                {OFFER_CHANNELS.map((canal) => (
                  <MenuItem key={canal} value={canal}>
                    {canal}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Field>

          <Field name="estado">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                select
                label="Estado"
                fullWidth
                className="sm:col-span-2"
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              >
                {OFFER_STATUSES.map((estado) => (
                  <MenuItem key={estado} value={estado}>
                    {estado}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Field>

          <div className="sm:col-span-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando…' : submitLabel}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
