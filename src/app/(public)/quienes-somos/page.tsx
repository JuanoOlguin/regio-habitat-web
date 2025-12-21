import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Quiénes somos | Regio Habitat",
  description: "Equipo local que selecciona propiedades en Monterrey con un enfoque claro y minimalista.",
};

const values = [
  {
    title: "Enfoque local",
    detail: "Solo zonas que conocemos: Monterrey y su área metropolitana.",
  },
  {
    title: "Curaduría real",
    detail: "Publicamos fichas con datos verificados y visitas coordinadas.",
  },
  {
    title: "Comunicación clara",
    detail: "Actualizaciones rápidas, avances transparentes y sin rodeos.",
  },
];

const timeline = [
  {
    title: "Exploración",
    detail: "Entendemos tu intención: vivir, invertir o diversificar.",
  },
  {
    title: "Selección corta",
    detail: "Te enviamos un shortlist con pros, contras y precios actualizados.",
  },
  {
    title: "Visitas y cierre",
    detail: "Coordinamos visitas, negociamos y te acompañamos hasta la firma.",
  },
];

export default function QuienesSomosPage() {
  return (
    <main className="section">
      <Container className="space-y-10">
        <SectionTitle
          as="h1"
          eyebrow="Quiénes somos"
          title="Regio Habitat, un equipo de asesores locales"
          subtitle="Trabajamos con inventario curado y un proceso directo para que elijas sin ruido."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="surface space-y-5 p-6">
            <p className="text-sm font-semibold text-slate-900">Nuestra forma de trabajar</p>
            <p className="text-sm text-slate-700">
              Somos un equipo compacto que prioriza calidad sobre volumen. Publicamos fichas completas,
              confirmamos disponibilidad y mantenemos comunicación puntual. Si necesitas renta o venta,
              podemos manejar ambas operaciones con el mismo estándar de servicio.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {values.map((item) => (
                <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface space-y-4 p-6">
            <p className="text-sm font-semibold text-slate-900">Proceso guiado</p>
            <div className="space-y-3">
              {timeline.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <div className="mt-1 h-8 w-8 rounded-full bg-emerald-100 text-center text-sm font-semibold text-emerald-800">
                    {index + 1}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-900">
              Sin ruido visual: un solo set de estilos, botones y tarjetas para todo el sitio.
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
