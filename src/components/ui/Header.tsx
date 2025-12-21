"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { navLinks } from "./navLinks";
import logo from "./assets/logo.png";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur">
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <Image src={logo} alt="Regio Habitat" className="h-full w-full object-contain" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900">Regio Habitat</p>
            <p className="text-xs text-slate-500">Monterrey · Inmobiliaria</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => {
            const isActive = pathname?.startsWith(item.href) ?? false;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contacto"
            className="btn btn-primary hidden sm:inline-flex px-4 py-2 text-sm"
          >
            Agendar llamada
          </Link>
          <Link
            href="/propiedades"
            className="btn btn-ghost px-4 py-2 text-sm sm:hidden"
          >
            Propiedades
          </Link>
        </div>
      </Container>
    </header>
  );
}
