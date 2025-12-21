import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Regio Habitat | Inmobiliaria en Monterrey",
  description:
    "Propiedades en venta y renta en Monterrey y zona metropolitana. Encuentra tu siguiente hogar con Regio Habitat.",
};

const highlights = [
  { title: "Portafolio curado", detail: "Solo propiedades verificadas listas para visita." },
  { title: "Cobertura metropolitana", detail: "Foco en los mejores corredores de Monterrey." },
  { title: "Acompañamiento completo", detail: "De filtros iniciales a cierre y firma." },
];

const values = [
  "Búsquedas guiadas por zona, operación y presupuesto.",
  "Resumen claro de amenidades clave en cada ficha.",
  "Comunicación ágil con agentes locales.",
];

export default function HomePage() {
  return (
    <main>
      <section className="section">
        <Container className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <div className="pill w-fit">Regio Habitat · Monterrey</div>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Un hub simple para elegir tu siguiente propiedad
              </h1>
              <p className="lead">
                Diseño minimalista, enfoque profesional y filtros pensados para encontrar rápido lo que
                importa: ubicación, precio y calidad de vida.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/propiedades" className="btn btn-primary">
                Ver propiedades
              </Link>
              <Link href="mailto:hola@regiohabitat.mx" className="btn btn-ghost">
                Agendar llamada
              </Link>
            </div>

            <div className="surface grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.title} className="space-y-1">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface relative overflow-hidden p-7">
            <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-100 to-white blur-2xl" />
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-gradient-to-br from-teal-200/70 to-white blur-3xl" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between">
                <Badge>Disponible</Badge>
                <span className="text-xs font-medium text-slate-500">Catálogo vivo</span>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-700">Vista previa de ficha</p>
                <p className="text-2xl font-semibold text-slate-900">Departamento de autor · San Pedro</p>
                <p className="text-sm text-slate-600">
                  2 recamaras · 2.5 baños · 2 cajones · Amenidades completas
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="surface p-4 shadow-none">
                  <p className="text-xs font-medium text-slate-500">Precio aproximado</p>
                  <p className="text-xl font-semibold text-slate-900">$7,450,000 MXN</p>
                </div>
                <div className="surface p-4 shadow-none">
                  <p className="text-xs font-medium text-slate-500">Entrega</p>
                  <p className="text-xl font-semibold text-slate-900">Listo para habitar</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Mantén tus filtros en un solo lugar y guarda atajos para renta o venta según lo necesites.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <div className="divider" />

      <section className="section">
        <Container className="space-y-8">
          <div className="space-y-3 max-w-3xl">
            <h2>Metodología enfocada en lo esencial</h2>
            <p className="lead">
              Cada decisión de diseño está concentrada en mantener la interfaz limpia y consistente: colores,
              botones, tarjetas y tipografía salen de la misma capa de estilos centrales.
            </p>
          </div>

          <div className="card-grid">
            {values.map((value) => (
              <div key={value} className="surface p-5">
                <p className="text-sm font-semibold text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="surface flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Centraliza tu búsqueda</p>
              <p className="text-sm text-slate-600">
                Acceso directo a filtros, estado de los listados y comunicación con agentes.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/propiedades?operation=venta" className="tag">
                Venta
              </Link>
              <Link href="/propiedades?operation=renta" className="tag">
                Renta
              </Link>
              <Link href="/propiedades" className="tag">
                Todo el catalogo
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
