import Link from "next/link";
import type { PropertyListItem } from "@/lib/data/properties";

const mxnFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

interface PropertyCardProps {
  property: PropertyListItem;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const priceLabel =
    property.price_mxn != null ? mxnFormatter.format(property.price_mxn) : "Consultar precio";

  const location = [property.zone, property.neighborhood].filter(Boolean).join(", ");

  return (
    <Link
      href={`/propiedad/${property.slug}`}
      className="surface group block h-full p-5 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>Propiedad destacada</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[0.7rem] text-slate-700">
          Ver detalle
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <p className="text-sm font-semibold text-emerald-700">{priceLabel}</p>
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-950">
          {property.title}
        </h3>
        {location ? <p className="text-sm text-slate-600">{location}</p> : null}
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1">
            Recamaras: {property.bedrooms ?? "-"}
          </span>
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1">
            Banos: {property.bathrooms ?? "-"}
          </span>
          <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1">
            Estac.: {property.parking ?? "-"}
          </span>
        </div>
      </div>
    </Link>
  );
}
