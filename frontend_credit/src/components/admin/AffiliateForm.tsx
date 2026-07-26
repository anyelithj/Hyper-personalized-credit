'use client';

import { Formik, Form, Field, type FieldProps } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@/components/ui/Button';
import { affiliateSchema } from '@/lib/validators';
import type { AffiliateFormValues } from '@/types/affiliate';

interface AffiliateFormProps {
  initialValues?: AffiliateFormValues;
  onSubmit: (values: AffiliateFormValues) => Promise<void>;
  submitLabel?: string;
}

const emptyValues: AffiliateFormValues = {
  cedula: '',
  nombre: '',
  correo: '',
  direccion: '',
  categoria: 'A',
  ingreso_mensual: 0,
};

const CATEGORIES: { value: AffiliateFormValues['categoria']; label: string }[] = [
  { value: 'A', label: 'A · Hasta 2 SMMLV' },
  { value: 'B', label: 'B · Más de 2 y hasta 4 SMMLV' },
  { value: 'C', label: 'C · Más de 4 SMMLV' },
  { value: 'D', label: 'D · No afiliado' },
];


export default function AffiliateForm({
  initialValues = emptyValues,
  onSubmit,
  submitLabel = 'Guardar afiliado',
}: AffiliateFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(affiliateSchema)}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="grid gap-4 sm:grid-cols-2" noValidate>
          <Field name="cedula">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="Cédula"
                fullWidth
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>

          <Field name="nombre">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="Nombre"
                fullWidth
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>

          <Field name="correo">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="Correo"
                type="email"
                fullWidth
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>

          <Field name="categoria">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                select
                label="Categoría de afiliación"
                fullWidth
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              >
                {CATEGORIES.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Field>

          <Field name="direccion">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="Dirección"
                fullWidth
                className="sm:col-span-2"
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>

          <Field name="ingreso_mensual">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="Ingreso mensual declarado"
                type="number"
                fullWidth
                className="sm:col-span-2"
                helperText={
                  (meta.touched && meta.error) ||
                  'Usado por el motor de recomendación para calcular la capacidad de pago (RF-06)'
                }
                error={Boolean(meta.touched && meta.error)}
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
