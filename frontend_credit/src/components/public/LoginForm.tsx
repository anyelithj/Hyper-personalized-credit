'use client';

import { Formik, Form, Field, type FieldProps } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Button from '@/components/ui/Button';
import { loginSchema } from '@/lib/validators';
import type { LoginPayload } from '@/types/auth';

interface LoginFormProps {
  onSubmit: (values: LoginPayload) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const initialValues: LoginPayload = {
  email: 'admin@creditoperfilado.co',
  password: 'demo1234',
};


export default function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(loginSchema)}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="space-y-4" noValidate>
          {error && (
            <Alert severity="error" role="alert">
              {error}
            </Alert>
          )}

          <Field name="email">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="Usuario"
                type="email"
                fullWidth
                autoComplete="username"
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>

          <Field name="password">
            {({ field, meta }: FieldProps) => (
              <TextField
                {...field}
                label="Contraseña"
                type="password"
                fullWidth
                autoComplete="current-password"
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>

          <Button type="submit" fullWidth disabled={isLoading}>
            {isLoading ? 'Ingresando…' : 'Ingresar al panel'}
          </Button>

          <p className="text-center text-xs text-[var(--muted-2)]">
            demo: admin@creditoperfilado.co / demo1234
          </p>
        </Form>
      )}
    </Formik>
  );
}
