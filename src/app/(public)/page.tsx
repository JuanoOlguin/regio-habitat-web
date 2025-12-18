import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regio Habitat | Inmobiliaria en Monterrey",
  description:
    "Propiedades en venta y renta en Monterrey y zona metropolitana. Encuentra tu próximo hogar con Regio Habitat.",
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">
        Regio Habitat
      </h1>
      <p className="mt-3 text-muted-foreground">
        Sitio público SEO-first. Aquí irá el buscador, propiedades destacadas y llamadas a acción.
      </p>
    </main>
  );
}
