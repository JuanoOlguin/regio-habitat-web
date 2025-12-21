import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Contáctanos | Regio Habitat",
  description: "Conversemos sobre la propiedad que necesitas en Monterrey y su área metropolitana.",
};

export default function ContactoPage() {
  return (
    <main className="section">
      <Container className="space-y-10">
        <SectionTitle
          as="h1"
          eyebrow="Contacto directo"
          title="Hablemos de tu próxima propiedad"
          subtitle="Agenda una llamada corta o envía un correo y te respondemos el mismo día."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface space-y-5 p-6">
            <p className="text-sm font-semibold text-slate-900">Línea directa</p>
            <div className="grid gap-3 text-sm text-slate-700">
              <div>
                <p className="font-semibold text-slate-900">Teléfono</p>
                <p className="mt-1">+52 81 1234 5678</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Correo</p>
                <p className="mt-1">contacto@regiohabitat.mx</p>
              </div>
              <div>
                <p className="font-semibold text-slate-900">Horario</p>
                <p className="mt-1">Lunes a sábado · 9:00 a 19:00</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="tel:+528112345678" className="btn btn-primary px-4 py-2 text-sm">
                Llamar ahora
              </Link>
              <Link href="mailto:contacto@regiohabitat.mx" className="btn btn-ghost px-4 py-2 text-sm">
                Escribir correo
              </Link>
            </div>
          </div>

          <div className="surface space-y-4 p-6">
            <p className="text-sm font-semibold text-slate-900">Cuéntanos qué buscas</p>
            <p className="text-sm text-slate-600">
              Dinos zona, operación (venta o renta), rango de precio y urgencia. En base a eso preparamos
              un shortlist y coordinamos visitas sin fricción.
            </p>
            <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Zonas y colonias</p>
                <p className="mt-1 text-slate-600">San Pedro, Valle Oriente, Cumbres, centro Monterrey.</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">Tipos</p>
                <p className="mt-1 text-slate-600">Departamentos, casas, locales comerciales y terrenos.</p>
              </div>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-900">
              Respuesta rápida · Confirmamos tu mensaje el mismo día hábil.
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
