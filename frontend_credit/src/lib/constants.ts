import type { NavItem } from '@/types/nav';

export const SITE_NAME = 'Colsubsidio Crédito';
export const SITE_TAGLINE = 'Crédito e hiperpersonalización para afiliados';

export const PUBLIC_NAV_LINKS: NavItem[] = [
  { label: 'Portafolio', href: '/#servicios' },
  { label: 'Ofertas', href: '/#ofertas' },
  { label: 'Cómo funciona', href: '/#proceso' },
  { label: 'Bot & canales', href: '/#bot' },
  { label: 'Categorías', href: '/#categorias' },
];

export const ADMIN_NAV_LINKS: NavItem[] = [
  { label: 'Resumen', href: '/dashboard', icon: 'Dashboard' },
  { label: 'Afiliados', href: '/affiliates', icon: 'People' },
  { label: 'Ofertas', href: '/offers', icon: 'Campaign' },
  { label: 'Portafolio de crédito', href: '/portfolio', icon: 'AccountBalanceWallet' },
  { label: 'Motor de segmentación', href: '/categories', icon: 'Category' },
  { label: 'Bot & canales', href: '/#bot', icon: 'Chat' },
];

export const OFFER_CHANNELS = ['WhatsApp', 'Correo electrónico', 'SMS', 'Portal Web', 'Instagram'] as const;
export const OFFER_STATUSES = ['Pendiente', 'Enviada', 'Aceptada', 'Rechazada'] as const;

export const CREDIT_PRODUCTS_SEED = [
  {
    id: 1,
    nombre: 'Cupo de crédito / consumo rotativo',
    tag: 'Rotativo',
    montoMin: 150000,
    montoMax: 5000000,
    plazo: 'Renovable',
    requisito: 'Antigüedad laboral mínima',
  },
  {
    id: 2,
    nombre: 'Crédito de vivienda / hipotecario',
    tag: 'Vivienda',
    montoMin: 20000000,
    montoMax: 250000000,
    plazo: '60–240 meses',
    requisito: 'Capacidad de pago verificada',
  },
  {
    id: 3,
    nombre: 'Crédito educativo',
    tag: 'Educación',
    montoMin: 500000,
    montoMax: 20000000,
    plazo: '6–48 meses',
    requisito: 'Institución acreditada',
  },
  {
    id: 4,
    nombre: 'Compra de cartera',
    tag: 'Unificación',
    montoMin: 1000000,
    montoMax: 40000000,
    plazo: '12–72 meses',
    requisito: 'Deudas vigentes en otras entidades',
  },
  {
    id: 5,
    nombre: 'Crédito Mujer',
    tag: 'Bienestar',
    montoMin: 300000,
    montoMax: 15000000,
    plazo: '6–36 meses',
    requisito: 'Incluye protección oncológica',
  },
  {
    id: 6,
    nombre: 'Crédito complementario',
    tag: 'General',
    montoMin: 200000,
    montoMax: 8000000,
    plazo: '6–36 meses',
    requisito: 'Categoría de afiliación vigente',
  },
  {
    id: 7,
    nombre: 'Rotativo seguros e impuestos',
    tag: 'Impuestos',
    montoMin: 100000,
    montoMax: 5000000,
    plazo: 'Hasta 11 meses',
    requisito: 'Póliza o declaración vigente',
  },
];

export const SEED_AFFILIATES = [
  {
    id: 1,
    cedula: '1015432198',
    nombre: 'Camila Rojas',
    correo: 'camila.rojas@gmail.com',
    direccion: 'Cl 45 #12-30, Bogotá',
    categoria: 'A',
    ingreso: 1400000,
    canal: 'WhatsApp',
    senales: [
      { n: 'Actividad nocturna en apps de compras', p: 78 },
      { n: 'Interacción frecuente en redes sociales', p: 64 },
      { n: 'Uso recurrente de billetera digital', p: 71 },
    ],
    oferta: 'Cupo de crédito / consumo rotativo',
    monto: 2400000,
  },
  {
    id: 2,
    cedula: '1022998371',
    nombre: 'Julián Pardo',
    correo: 'julian.pardo@outlook.com',
    direccion: 'Cra 9 #80-15, Medellín',
    categoria: 'C',
    ingreso: 9800000,
    canal: 'Correo electrónico',
    senales: [
      { n: 'Búsquedas de vivienda en portales inmobiliarios', p: 82 },
      { n: 'Estabilidad laboral prolongada', p: 90 },
      { n: 'Consultas de simulador hipotecario', p: 66 },
    ],
    oferta: 'Crédito de vivienda / hipotecario',
    monto: 180000000,
  },
  {
    id: 3,
    cedula: '1098765432',
    nombre: 'Laura Méndez',
    correo: 'laura.mendez@hotmail.com',
    direccion: 'Av 6 #23-10, Cali',
    categoria: 'B',
    ingreso: 3200000,
    canal: 'SMS',
    senales: [
      { n: 'Matrícula reciente en posgrado', p: 85 },
      { n: 'Consultas en portales educativos', p: 73 },
      { n: 'Bajo uso de crédito rotativo', p: 40 },
    ],
    oferta: 'Crédito educativo',
    monto: 6000000,
  },
  {
    id: 4,
    cedula: '1130456789',
    nombre: 'Andrés Torres',
    correo: 'andres.torres@yahoo.com',
    direccion: 'Cl 72 #11-05, Barranquilla',
    categoria: 'D',
    ingreso: 2100000,
    canal: 'Portal Web',
    senales: [
      { n: 'Múltiples obligaciones activas en el mercado', p: 88 },
      { n: 'Consultas de unificación de deudas', p: 69 },
      { n: 'Actividad estable en banca móvil', p: 55 },
    ],
    oferta: 'Compra de cartera',
    monto: 9000000,
  },
  {
    id: 5,
    cedula: '1076543210',
    nombre: 'Valentina Cruz',
    correo: 'valentina.cruz@gmail.com',
    direccion: 'Cra 30 #5-20, Bucaramanga',
    categoria: 'A',
    ingreso: 1600000,
    canal: 'Instagram',
    senales: [
      { n: 'Seguimiento a cuentas de salud y bienestar', p: 76 },
      { n: 'Interacción alta en Instagram', p: 81 },
      { n: 'Consultas de coberturas médicas', p: 62 },
    ],
    oferta: 'Crédito Mujer',
    monto: 4500000,
  },
  {
    id: 6,
    cedula: '1189234567',
    nombre: 'Ricardo Salas',
    correo: 'ricardo.salas@gmail.com',
    direccion: 'Cl 19 #4-50, Pereira',
    categoria: 'B',
    ingreso: 4100000,
    canal: 'Correo electrónico',
    senales: [
      { n: 'Declaración de renta próxima a vencer', p: 70 },
      { n: 'Consultas sobre pólizas vehiculares', p: 58 },
      { n: 'Pagos recurrentes de impuestos', p: 66 },
    ],
    oferta: 'Rotativo seguros e impuestos',
    monto: 3000000,
  },
];

export const CHANNEL_RULES_SEED = [
  { id: 1, canal: 'WhatsApp', condicion: 'Edad < 35 y alta interacción en redes', horario: '18:00–20:00', prioridad: 'Alta' },
  { id: 2, canal: 'Correo electrónico', condicion: 'Categoría B o C, sin actividad en redes', horario: '08:00–10:00', prioridad: 'Media' },
  { id: 3, canal: 'SMS', condicion: 'Sin correo verificado', horario: '12:00–13:00', prioridad: 'Media' },
  { id: 4, canal: 'Portal Web', condicion: 'Última sesión activa hace < 24h', horario: 'Cualquier hora', prioridad: 'Baja' },
];
