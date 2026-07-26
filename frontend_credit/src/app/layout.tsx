import type { Metadata } from 'next';
import ThemeRegistry from '@/components/ui/ThemeRegistry';
import './globals.css';


export const metadata: Metadata = {
  title: { default: 'Credix — Crédito hiperpersonalizado', template: '%s · Credix' },
  description:
    'Credix enriquece el perfil del afiliado con variables exógenas del mercado para recomendar el crédito ideal, sin burós tradicionales.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
