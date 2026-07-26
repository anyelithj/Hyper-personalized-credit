import { z } from 'zod';


export const loginSchema = z.object({
  email: z.string().min(1, 'Ingresa tu usuario').email('Correo inválido'),
  password: z.string().min(4, 'La contraseña es muy corta'),
});


export const affiliateSchema = z.object({
  cedula: z.string().min(5, 'La cédula debe tener al menos 5 dígitos').max(20),
  nombre: z.string().min(2, 'El nombre es muy corto').max(150),
  correo: z.string().email('Correo inválido'),
  direccion: z.string().min(3, 'La dirección es muy corta').max(255),
  categoria: z.enum(['A', 'B', 'C', 'D'], { message: 'Selecciona una categoría' }),
  ingreso_mensual: z.coerce.number().positive('El ingreso debe ser mayor que 0'),
});


export const creditProductSchema = z
  .object({
    nombre: z.string().min(2, 'El nombre es muy corto').max(150),
    monto_min: z.coerce.number().positive('Debe ser mayor que 0'),
    monto_max: z.coerce.number().positive('Debe ser mayor que 0'),
    plazo: z.string().min(2, 'Indica el plazo').max(50),
    requisito_clave: z.string().min(2, 'Indica el requisito clave').max(255),
  })
  .refine((values) => values.monto_max >= values.monto_min, {
    message: 'El monto máximo no puede ser menor que el mínimo',
    path: ['monto_max'],
  });


export const offerSchema = z.object({
  affiliate_id: z.coerce.number().int().positive('Selecciona un afiliado'),
  credit_product_id: z.coerce.number().int().positive('Selecciona una línea de crédito'),
  monto: z.coerce.number().positive('Debe ser mayor que 0'),
  canal: z.enum(['WhatsApp', 'Correo electrónico', 'SMS', 'Portal Web', 'Instagram'], {
    message: 'Selecciona un canal',
  }),
  estado: z.enum(['Pendiente', 'Enviada', 'Aceptada', 'Rechazada'], {
    message: 'Selecciona un estado',
  }),
});
