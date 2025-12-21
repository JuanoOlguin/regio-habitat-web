import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { listProperties, type PropertyListItem } from "@/lib/data/properties";
import { parsePropertyFilters } from "@/lib/filters/properties";
import type { PropertyFilters } from "@/lib/domain/property";

export const metadata = {
  title: "Propiedades | Regio Habitat",
  description:
    "Explora propiedades en venta y renta en Monterrey y area metropolitana con Regio Habitat.",
};

type SearchParamsInput =
  | Record<string, string | string[] | undefined>
  | URLSearchParams
  | {
      getAll(name: string): string[];
      keys(): IterableIterator<string>;
    }
  | null
  | undefined;

type PageProps = {
  searchParams?: SearchParamsInput | Promise<SearchParamsInput>;
};

const buildSearchParams = (
  filters: PropertyFilters,
  overrides: Partial<PropertyFilters> = {}
): URLSearchParams => {
  const merged = { ...filters, ...overrides };
  const params = new URLSearchParams();

  if (merged.operation) params.set("operation", merged.operation);
  if (merged.type) params.set("type", merged.type);
  if (merged.zone) params.set("zone", merged.zone);
  if (merged.minPrice !== undefined) params.set("min", String(merged.minPrice));
  if (merged.maxPrice !== undefined) params.set("max", String(merged.maxPrice));
  if (merged.bedrooms !== undefined) params.set("bed", String(merged.bedrooms));
  if (merged.bathrooms !== undefined) params.set("bath", String(merged.bathrooms));
  if (merged.parking !== undefined) params.set("park", String(merged.parking));
  if (merged.q) params.set("q", merged.q);
  if (merged.page) params.set("page", String(merged.page));
  if (merged.pageSize) params.set("pageSize", String(merged.pageSize));

  return params;
};

export default async function PropertiesPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parsePropertyFilters(resolvedSearchParams ?? {});

  let data: PropertyListItem[] = [];
  let count = 0;
  let errorMessage: string | null = null;

  try {
    const result = await listProperties(filters);
    data = result.data;
    count = result.count ?? result.data.length;
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Error al cargar propiedades.";
  }

  const totalPages = count > 0 ? Math.ceil(count / (filters.pageSize ?? 12)) : 0;
  const currentPage = filters.page ?? 1;

  const hasPrevious = totalPages > 0 && currentPage > 1;
  const hasNext = totalPages > 0 && currentPage < totalPages;

  return (
    <Container className="py-12 sm:py-16 lg:py-20 space-y-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle
          as="h1"
          eyebrow="Catalogo activo"
          title="Propiedades listas para visita"
          subtitle="Filtros claros, tarjetas limpias y navegacion sencilla."
        />
        <div className="surface flex items-center gap-4 p-5">
          <div>
            <p className="text-sm font-semibold text-slate-900">{count} propiedades</p>
            <p className="text-xs text-slate-600">
              Pagina {totalPages > 0 ? currentPage : 1} de {totalPages || 1}
            </p>
          </div>
          <Link href="/propiedades" className="btn btn-ghost">
            Limpiar filtros
          </Link>
        </div>
      </div>

      <div className="surface space-y-4 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Filtra por lo esencial</p>
            <p className="text-sm text-slate-600">
              Operacion, tipo, zona y montos con inputs uniformes en un mismo panel.
            </p>
          </div>
          <span className="tag">Busqueda liviana</span>
        </div>

        <form method="GET" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="operation">Operacion</label>
            <select id="operation" name="operation" defaultValue={filters.operation ?? ""}>
              <option value="">Todas</option>
              <option value="venta">Venta</option>
              <option value="renta">Renta</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="type">Tipo</label>
            <select id="type" name="type" defaultValue={filters.type ?? ""}>
              <option value="">Todos</option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="terreno">Terreno</option>
              <option value="comercial">Comercial</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="zone">Zona o colonia</label>
            <input
              id="zone"
              name="zone"
              type="text"
              placeholder="Ej: Monterrey, San Pedro"
              defaultValue={filters.zone ?? ""}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="min">Precio minimo (MXN)</label>
            <input id="min" name="min" type="number" min={0} defaultValue={filters.minPrice ?? ""} />
          </div>

          <div className="space-y-2">
            <label htmlFor="max">Precio maximo (MXN)</label>
            <input id="max" name="max" type="number" min={0} defaultValue={filters.maxPrice ?? ""} />
          </div>

          <div className="space-y-2">
            <label htmlFor="bed">Recamaras</label>
            <input id="bed" name="bed" type="number" min={0} defaultValue={filters.bedrooms ?? ""} />
          </div>

          <div className="space-y-2">
            <label htmlFor="bath">Banos</label>
            <input id="bath" name="bath" type="number" min={0} defaultValue={filters.bathrooms ?? ""} />
          </div>

          <div className="space-y-2">
            <label htmlFor="park">Estacionamientos</label>
            <input id="park" name="park" type="number" min={0} defaultValue={filters.parking ?? ""} />
          </div>

          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <label htmlFor="q">Busqueda</label>
            <input
              id="q"
              name="q"
              type="text"
              placeholder="Buscar por titulo o colonia"
              defaultValue={filters.q ?? ""}
            />
          </div>

          <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-3">
            <button type="submit" className="btn btn-primary">
              Buscar
            </button>
            <Link href="/propiedades" className="text-sm font-semibold text-slate-700 underline">
              Limpiar
            </Link>
          </div>
        </form>
      </div>

      {errorMessage ? (
        <div className="surface p-4 text-sm text-red-800">
          <p className="font-semibold">No se pudo cargar el catalogo.</p>
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div className="space-y-5">
          {data.length === 0 ? (
            <div className="surface p-6 text-center">
              <p className="font-semibold text-slate-900">No encontramos propiedades con estos filtros.</p>
              <p className="mt-1 text-sm text-slate-600">
                Ajusta tu busqueda o limpia los filtros para ver mas resultados.
              </p>
              <Link
                href="/propiedades"
                className="mt-3 inline-flex text-sm font-semibold text-slate-900 underline"
              >
                Limpiar filtros
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {data.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="surface flex items-center justify-between gap-4 p-4 text-sm text-slate-700">
              <Link
                href={
                  hasPrevious
                    ? `/propiedades?${buildSearchParams(filters, {
                        page: currentPage - 1,
                      }).toString()}`
                    : "#"
                }
                aria-disabled={!hasPrevious}
                className={`font-semibold ${
                  hasPrevious ? "text-slate-900 hover:text-slate-950" : "cursor-not-allowed text-slate-400"
                }`}
              >
                Anterior
              </Link>

              <span>
                Pagina {currentPage} de {totalPages}
              </span>

              <Link
                href={
                  hasNext
                    ? `/propiedades?${buildSearchParams(filters, {
                        page: currentPage + 1,
                      }).toString()}`
                    : "#"
                }
                aria-disabled={!hasNext}
                className={`font-semibold ${
                  hasNext ? "text-slate-900 hover:text-slate-950" : "cursor-not-allowed text-slate-400"
                }`}
              >
                Siguiente
              </Link>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}
