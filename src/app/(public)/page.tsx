import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { listProperties } from "@/lib/data/properties";

export const metadata: Metadata = {
  title: "Regio Habitat | Inmobiliaria en Monterrey",
  description:
    "Propiedades en venta y renta en Monterrey y zona metropolitana. Encuentra tu siguiente hogar con Regio Habitat.",
};

const mxnFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const tabs = ["Venta", "Renta", "Comercial"];

export default async function HomePage() {
  const { data } = await listProperties({ page: 1, pageSize: 8 });
  const featured = data.slice(0, 6);
  const cards = [...featured, ...featured];

  return (
    <main>
      <section className="section">
        <Container className="space-y-8">
          <div className="space-y-4">
            <div className="pill w-fit">Propiedades destacadas</div>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Encuentra tu siguiente propiedad
            </h1>
            <p className="lead">
              Inicio simple con un carrusel de propiedades destacadas. El resto lo dejamos para despues.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                aria-disabled="true"
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
              >
                {tab}
              </button>
            ))}
          </div>

          {featured.length === 0 ? (
            <div className="surface p-6">
              <p className="text-sm font-semibold text-slate-900">Aun no hay propiedades destacadas.</p>
            </div>
          ) : (
            <div className="featured-rail-wrapper">
              <div className="featured-rail">
                {cards.map((property, index) => {
                  const priceLabel =
                    property.price_mxn != null
                      ? mxnFormatter.format(property.price_mxn)
                      : "Consultar precio";

                  return (
                    <Link
                      href={`/propiedad/${property.slug}`}
                      key={`${property.id}-${index}`}
                      className="surface featured-card p-5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                        Destacada
                      </p>
                      <h2 className="mt-2 text-lg font-semibold text-slate-900">{property.title}</h2>
                      <p className="mt-1 text-sm text-slate-600">
                        {[property.zone, property.neighborhood].filter(Boolean).join(" · ") ||
                          "Monterrey"}
                      </p>
                      <p className="mt-4 text-base font-semibold text-slate-900">{priceLabel}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
