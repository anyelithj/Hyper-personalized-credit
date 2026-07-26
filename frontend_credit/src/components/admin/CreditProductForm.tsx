'use client';

import { Formik, Form, Field, type FieldProps } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import TextField from '@mui/material/TextField';
import Button from '@/components/ui/Button';
import { creditProductSchema } from '@/lib/validators';
import type { CreditProductFormValues } from '@/types/credit-product';

interface CreditProductFormProps {
  initialValues?: CreditProductFormValues;
  onSubmit: (values: CreditProductFormValues) => Promise<void>;
  submitLabel?: string;
}

const emptyValues: CreditProductFormValues = {
  nombre: '',
  monto_min: 0,
  monto_max: 0,
  plazo: '',
  requisito_clave: '',
};


export default function CreditProductForm({
  initialValues = emptyValues,
  onSubmit,
  submitLabel = 'Guardar línea',
}: CreditProductFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(creditProductSchema)}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="grid gap-4 sm:grid-cols-2" noValidate>
          <Field name="nombre">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="Nombre de la línea"
                fullWidth
                className="sm:col-span-2"
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>

          <Field name="monto_min">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                type="number"
                label="Monto mínimo"
                fullWidth
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>

          <Field name="monto_max">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                type="number"
                label="Monto máximo"
                fullWidth
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>

          <Field name="plazo">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="Plazo (ej. '6-48 meses' o 'Renovable')"
                fullWidth
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>

          <Field name="requisito_clave">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="Requisito clave"
                fullWidth
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
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
