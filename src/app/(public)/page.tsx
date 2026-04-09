import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { listProperties, type PropertyListItem } from "@/lib/data/properties";

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

type FeaturedItem = {
  id: string;
  title: string;
  zone?: string | null;
  neighborhood?: string | null;
  priceLabel: string;
  href: string;
};

const fallbackFeatured: FeaturedItem[] = [
  {
    id: "fallback-1",
    title: "Departamento moderno en San Pedro",
    zone: "San Pedro",
    neighborhood: "Del Valle",
    priceLabel: "Consultar precio",
    href: "/propiedades",
  },
  {
    id: "fallback-2",
    title: "Casa familiar en Cumbres",
    zone: "Monterrey",
    neighborhood: "Cumbres",
    priceLabel: "Consultar precio",
    href: "/propiedades",
  },
  {
    id: "fallback-3",
    title: "Loft con amenidades en Centro",
    zone: "Monterrey",
    neighborhood: "Centro",
    priceLabel: "Consultar precio",
    href: "/propiedades",
  },
];

const toFeaturedItem = (property: PropertyListItem): FeaturedItem => ({
  id: property.id,
  title: property.title,
  zone: property.zone,
  neighborhood: property.neighborhood,
  priceLabel: property.price_mxn != null ? mxnFormatter.format(property.price_mxn) : "Consultar precio",
  href: `/propiedad/${property.slug}`,
});

export default async function HomePage() {
  let featuredItems = fallbackFeatured;

  try {
    const { data } = await listProperties({ page: 1, pageSize: 8 });

    if (data.length > 0) {
      featuredItems = data.slice(0, 6).map(toFeaturedItem);
    }
  } catch {
    featuredItems = fallbackFeatured;
  }

  const cards = [...featuredItems, ...featuredItems];

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

          <div className="featured-rail-wrapper">
            <div className="featured-rail">
              {cards.map((property, index) => (
                <Link
                  href={property.href}
                  key={`${property.id}-${index}`}
                  className="surface featured-card p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    Destacada
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-slate-900">{property.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {[property.zone, property.neighborhood].filter(Boolean).join(" · ") || "Monterrey"}
                  </p>
                  <p className="mt-4 text-base font-semibold text-slate-900">{property.priceLabel}</p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
