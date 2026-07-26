export function ContactSection() {
  return (
    <section id="contacto" className="bg-slate-950 py-20 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="rounded-[2rem] bg-slate-900/95 px-8 py-12 shadow-2xl shadow-slate-950/20 sm:px-12">
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-400">Contacto</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Hablemos de tu próximo crédito con claridad.
              </h2>
              <p className="max-w-xl text-slate-400 leading-8">
                Nuestro equipo está listo para ayudarte a encontrar la opción más adecuada para tu situación financiera. Escríbenos y te guiaremos paso a paso.
              </p>
            </div>
            <div className="space-y-5 rounded-[1.5rem] bg-slate-950 p-8 text-slate-200 shadow-lg shadow-slate-950/20">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Email</p>
                <p className="mt-3 text-lg text-white">hola@creditointeligente.com</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Teléfono</p>
                <p className="mt-3 text-lg text-white">+51 900 123 456</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Soporte</p>
                <p className="mt-3 text-lg text-white">Atención rápida para tus consultas de crédito.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
EOF && cat > app/page.tsx <<'EOF'
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { BenefitsSection } from "./components/BenefitsSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { IntroSection } from "./components/IntroSection";
import { ContactSection } from "./components/ContactSection";
import { CallToActionSection } from "./components/CallToActionSection";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="relative">
        <HeroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <IntroSection />
        <ContactSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}
EOF && cat > app/components/Button.tsx <<'EOF'
import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  className?: string;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-slate-950 text-white hover:bg-black focus-visible:ring-slate-950/20",
  secondary:
    "border border-slate-300 bg-white text-slate-950 hover:border-slate-400 hover:bg-slate-50 focus-visible:ring-slate-950/10",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type={props.type ?? "button"}
      className={
        `inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variantClasses[variant]} ` +
        className
      }
      {...props}
    />
  );
}
