import Image from 'next/image';
import { ArrowUpRight, Gauge, MapPinned, Printer } from 'lucide-react';

const teaserCards = [
  {
    title: 'Marca puntos clave',
    text: 'Añade avituallamientos, puertos y avisos para tener toda la ruta clara.',
    icon: MapPinned,
  },
  {
    title: 'Pacings listos para imprimir',
    text: 'Crea zonas, visualiza el perfil y exporta tiras para llevar en la bici.',
    icon: Printer,
  },
  {
    title: 'Planifica por vatios',
    text: 'Usa tu FTP para montar bloques Z1-Z7 y dejar el pacing listo en minutos.',
    icon: Gauge,
  },
];

export default function HomeGpxTeaser() {
  return (
    <section className="min-h-screen snap-start flex items-center px-6 py-20 bg-charcoal-900 text-white">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[1.05fr_1fr] gap-12 xl:gap-16 items-center">
        <div className="max-w-2xl">
          <div className="text-sm uppercase tracking-[0.32em] text-balak-400/90">
            Herramienta GPX
          </div>
          <h3 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[0.95]">
            Prepara tu ruta fuera del mapa y llévatela lista a Garmin.
          </h3>
          <p className="mt-6 text-lg sm:text-xl text-white/72 max-w-xl">
            En el editor GPX de BALAK puedes marcar puntos clave, dividir la
            ruta por pacing y exportar imágenes pensadas para el manillar o el
            bolsillo del maillot.
          </p>

          <div className="mt-8 grid gap-4">
            {teaserCards.map(({ title, text, icon: Icon }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-balak-400 text-charcoal-900">
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{title}</div>
                    <p className="mt-1 text-sm text-white/65">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://gpx.balakride.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-balak-400 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-charcoal-900 transition hover:scale-[1.02] hover:bg-[#d1ee55]"
            >
              Abrir editor GPX
              <ArrowUpRight size={16} />
            </a>
            <span className="text-sm text-white/55">
              gpx.balakride.com
            </span>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-[1.2fr_0.8fr]">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0e1013] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
              </div>
              <div className="rounded-full border border-balak-400/50 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-balak-400">
                GPX editor
              </div>
            </div>
            <div className="relative aspect-[1.2/1]">
              <Image
                src="/route.png"
                alt="Vista previa del editor GPX de Balak"
                fill
                className="object-cover opacity-90"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1013] via-black/10 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-[#12161d]/90 p-4 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-[0.22em] text-white/55">
                  Perfil + pacing
                </div>
                <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-xl">
                  <div className="bg-[#21324e] px-3 py-4">
                    <div className="text-xs font-semibold text-white">Z2</div>
                    <div className="mt-1 h-8 rounded-full bg-gradient-to-t from-[#ff4d73]/15 to-transparent" />
                  </div>
                  <div className="bg-[#173523] px-3 py-4">
                    <div className="text-xs font-semibold text-white">Z3</div>
                    <div className="mt-1 h-8 rounded-full bg-gradient-to-t from-[#ff4d73]/15 to-transparent" />
                  </div>
                  <div className="bg-[#4a3510] px-3 py-4">
                    <div className="text-xs font-semibold text-white">Z4</div>
                    <div className="mt-1 h-8 rounded-full bg-gradient-to-t from-[#ff4d73]/15 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm uppercase tracking-[0.22em] text-white/55">
                  Sticker vertical
                </div>
                <div className="rounded-full bg-balak-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-balak-400">
                  export
                </div>
              </div>
              <div className="mx-auto flex w-[72%] min-w-[180px] flex-col overflow-hidden rounded-[20px] border border-white/10 bg-[#f2f4ea] shadow-xl">
                <div className="border-b border-black/10 bg-[#bfe23a] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#16181b]">
                  Mallorca 312
                </div>
                {[
                  ['34', 'Puerto', '#dbeafe'],
                  ['91', 'Nota', '#ffffff'],
                  ['150', 'Z2 - 162w', '#dbeafe'],
                  ['212', 'Avituallamiento', '#dcfce7'],
                ].map(([km, label, tone]) => (
                  <div
                    key={`${km}-${label}`}
                    className="grid grid-cols-[42px_1fr] border-b border-black/10 text-[#16181b]"
                    style={{ backgroundColor: tone }}
                  >
                    <div className="px-2 py-2 text-xs font-semibold">{km}</div>
                    <div className="px-3 py-2 text-[11px] leading-tight">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
              <div className="text-sm uppercase tracking-[0.22em] text-white/55">
                Tiras de impresión
              </div>
              <div className="mt-4 rounded-[18px] border border-white/10 bg-[#f8f8f4] p-4">
                <div className="flex gap-2">
                  <div className="h-20 flex-1 rounded-xl bg-[#dbeafe]" />
                  <div className="h-20 flex-1 rounded-xl bg-[#dcfce7]" />
                  <div className="h-20 flex-1 rounded-xl bg-[#fef3c7]" />
                </div>
                <div className="mt-4 h-10 rounded-full bg-gradient-to-r from-transparent via-[#ff4d73] to-transparent opacity-75" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
