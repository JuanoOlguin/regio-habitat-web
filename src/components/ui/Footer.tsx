import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { navLinks } from "./navLinks";
import logo from "./assets/logo.png";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-100">
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <Image src={logo} alt="Regio Habitat" className="h-full w-full object-contain" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Regio Habitat</p>
              <p className="text-xs text-slate-300">Monterrey · Propiedades</p>
            </div>
          </div>
          <p className="text-sm text-slate-300">
            Centralizamos búsquedas, visitas y seguimiento en un solo espacio. Propiedades curadas,
            comunicación clara y un equipo que conoce cada colonia.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200">
            Servicio personalizado · Atención local
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Menú</p>
          <div className="mt-4 grid gap-2 text-sm text-slate-300">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-white">Contáctanos</p>
          <div className="text-sm text-slate-300">
            <p className="font-semibold text-white">Teléfono</p>
            <p className="mt-1">+52 81 1234 5678</p>
          </div>
          <div className="text-sm text-slate-300">
            <p className="font-semibold text-white">Correo</p>
            <p className="mt-1">contacto@regiohabitat.mx</p>
          </div>
          <Link
            href="mailto:contacto@regiohabitat.mx"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/30"
          >
            Escribir un correo
          </Link>
        </div>
      </Container>

      <div className="border-t border-white/10 text-sm text-slate-400">
        <Container className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Regio Habitat. Monterrey, NL.</span>
          <span className="text-slate-400">Diseño minimalista enfocado en servicio.</span>
        </Container>
      </div>
    </footer>
  );
}
