import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { PortfolioCarousel } from "@/components/PortfolioCarousel";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { FloatingChat } from "@/components/FloatingChat";

const PORTFOLIO = [
  {
    title: "Estudio Jurídico Integral",
    client: "Pérez & Asociados",
    desc: "Landing profesional orientada a consultas legales con formulario directo a WhatsApp.",
    tag: "Servicios",
    rating: 4.9,
  },
  {
    title: "Entrenamiento Online 360",
    client: "FitCoach Pro",
    desc: "Página de venta para programa de entrenamiento online con enfoque en conversión.",
    tag: "Cursos",
    rating: 4.8,
  },
  {
    title: "Marca Personal Creativa",
    client: "Laura Gómez",
    desc: "Sitio minimalista para creadora de contenido con portfolio y enlaces a redes.",
    tag: "Branding",
    rating: 5.0,
  },
  {
    title: "Barbería Urbana",
    client: "Black Razor",
    desc: "Landing con turnos por WhatsApp, servicios destacados y galería visual.",
    tag: "Negocio local",
    rating: 4.7,
  },
  {
    title: "Consultorio Psicológico",
    client: "Lic. Martín López",
    desc: "Web sobria y clara para atención psicológica con foco en confianza y contacto.",
    tag: "Salud",
    rating: 4.9,
  },
  {
    title: "Restaurante & Café",
    client: "Casa Aurora",
    desc: "Página gastronómica con menú digital, ubicación y reservas rápidas.",
    tag: "Gastronomía",
    rating: 4.6,
  },
];

const FEATURES = [
  {
    title: "100% Responsive",
    desc: "Se adapta a monitor, laptop, tablet y celular sin romper el diseño.",
    icon: "📱",
  },
  {
    title: "Modo claro / oscuro",
    desc: "Un solo botón y toda la estética cambia de forma consistente.",
    icon: "🌙",
  },
  {
    title: "Lista para revender",
    desc: "Cambiás textos, colores y fotos en minutos para cada cliente.",
    icon: "⚡",
  },
  {
    title: "Secciones editables",
    desc: "Servicios, portfolio, testimonios, FAQ… agregás o sacás lo que quieras.",
    icon: "🧩",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-white dark:from-slate-950 dark:to-slate-950">
      <Navbar />

{/* HERO */}
<section
  id="inicio"
  className="px-6 py-28 sm:py-32 animate-[fadeUp_.6s_ease-out]"
>
  <div className="mx-auto w-full max-w-5xl">
    <div className="grid items-center gap-12 md:grid-cols-2">
      {/* Texto */}
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs text-slate-600 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(34,197,94,0.25)]" />
          Landing lista en 48 hs
        </p>

        <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Diseñamos tu presencia digital
          <br />
          desde su origen
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Creamos landings y webs que transmiten valor, generan confianza y
          convierten visitas en clientes.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#contacto"
            className="rounded-xl bg-black px-6 py-3 text-sm font-medium text-white shadow-lg shadow-black/20 transition active:scale-[0.98] hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200"
          >
            Empezar mi proyecto
          </a>

          <a
            href="#beneficios"
            className="rounded-xl border border-slate-300 bg-white/60 px-6 py-3 text-sm font-medium shadow-sm transition active:scale-[0.98] hover:bg-white dark:border-slate-700 dark:bg-slate-900/50 dark:hover:bg-slate-900"
          >
            Ver beneficios
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-6 text-xs text-slate-500 dark:text-slate-400">
          <span>✅ Next + Tailwind</span>
          <span>✅ Dark mode</span>
          <span>✅ Mobile first</span>
        </div>
      </div>

      {/* Preview / Mock */}
      <div className="relative animate-float-shadow">
        {/* Glow inteligente */}
<div
  aria-hidden="true"
  className="
    absolute -inset-10 -z-10 rounded-[2rem] blur-3xl
    opacity-50
    bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.18),rgba(255,255,255,0)_70%)]
    dark:bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.5),rgba(0,0,0,0)_70%)]
  "
/>

        {/* Card */}
        <div className="relative rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-2xl shadow-slate-900/15 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex items-center justify-between px-2 pb-3">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Preview
            </span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-500 dark:text-emerald-400">
              Editable
            </span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4 dark:border-slate-800 dark:bg-slate-950">
            <div>
              <div className="h-3 w-24 rounded-full bg-slate-300/80 dark:bg-slate-700" />
              <div className="mt-4 h-8 w-3/4 rounded-xl bg-slate-300/60 dark:bg-slate-800" />
              <div className="mt-3 h-3 w-full rounded-full bg-slate-300/50 dark:bg-slate-800" />
              <div className="mt-2 h-3 w-5/6 rounded-full bg-slate-300/50 dark:bg-slate-800" />

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="h-16 rounded-2xl bg-white shadow-sm dark:bg-slate-900" />
                <div className="h-16 rounded-2xl bg-white shadow-sm dark:bg-slate-900" />
              </div>

              <div className="mt-4 h-10 rounded-2xl bg-black/90 dark:bg-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* FEATURES */}
      <section id="beneficios" className="px-6 pb-32 animate-[fadeUp_.6s_ease-out]">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Beneficios
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Lo esencial, explicado en 4 puntos
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Perfecto para vender cualquier cosa: servicios, cursos, productos, consultorías
              o un negocio local.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/60"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{f.icon}</span>
                  <h3 className="text-sm font-semibold">{f.title}</h3>
                </div>

                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO / TESTIMONIOS */}
      <section className="px-6 pb-32 animate-[fadeUp_.6s_ease-out]">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Casos reales
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Proyectos y resultados
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Explorá los proyectos deslizando.
            </p>
          </div>

          <div className="mt-10">
            <PortfolioCarousel items={PORTFOLIO} />
          </div>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section id="quienes" className="px-6 pb-32 animate-[fadeUp_.6s_ease-out]">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Quiénes somos
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Un equipo chico, enfoque grande
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Diseñamos y construimos landings que convierten, con trato cercano y procesos claros.
            </p>
          </div>

          <div className="mt-10 grid items-center gap-8 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg shadow-slate-900/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex items-center gap-4">
                <Image
                  src="/marcos.png"
                  alt="Marcos Martinez"
                  width={120}
                  height={120}
                  className="h-24 w-24 rounded-full border border-white/80 object-cover shadow-sm"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Marcos Martinez
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Diseñador web</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
                No somos una agencia grande. Somos enfoque, detalle y resultado.
Trabajamos pocos proyectos para hacerlos realmente bien.
              </p>

              <div className="mt-5 grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-base">✅</span>
                  <span>Comunicación directa y sin vueltas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base">✅</span>
                  <span>Proceso simple: idea → diseño → entrega</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base">✅</span>
                  <span>Mejora continua luego de la entrega</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Lo que nos diferencia
              </p>
              <ul className="mt-4 grid gap-3 text-sm text-slate-700 dark:text-slate-300">
                <li>• Respuesta en menos de 24 hs</li>
                <li>• Diseño pensado para conversión</li>
                <li>• Entrega rápida sin perder calidad</li>
                <li>• Soporte inicial incluido</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="px-6 pb-32 animate-[fadeUp_.6s_ease-out]">
        <div className="mx-auto w-full max-w-4xl">
          <div className="relative">
            {/* halo verde suave */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute -inset-6 rounded-[2rem]
                bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.18),transparent_55%)]
                opacity-80 blur-2xl
                dark:bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.25),transparent_55%)]
              "
            />

            {/* tarjeta */}
            <div
              className="
                relative grid gap-8 rounded-3xl p-8
                border border-slate-200 bg-white/80
                shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-[0_30px_70px_-25px_rgba(0,0,0,0.25)]
                backdrop-blur
                dark:border-slate-800 dark:bg-slate-900/60
                md:grid-cols-2
              "
            >
              {/* Texto */}
              <div className="text-left">
                <h2 className="text-2xl font-semibold">Contacto</h2>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  Contame tu idea y te respondo con una propuesta clara en menos de 24 hs. (rubro, objetivo, ejemplos, fechas).
                </p>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    Lo que incluye
                  </p>
                  <ul className="mt-3 grid gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <li>✅ Diseño a medida y responsive</li>
                    <li>✅ Textos optimizados para vender</li>
                    <li>✅ Formulario con envío a tu email</li>
                    <li>✅ Entrega rápida y soporte inicial</li>

<br/>

                    <li>⚡ Optimizada para conversión</li>
                    <li>📱 Diseño mobile-first real</li>
                    <li>🔒 Código limpio y escalable</li>

<br/>
                    <li>No es solo una web. Es una herramienta para conseguir clientes.</li>

                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    className="rounded-xl border border-slate-300 bg-white/60 px-6 py-3 text-sm font-medium shadow-sm transition active:scale-[0.98] hover:bg-white dark:border-slate-700 dark:bg-slate-900/50 dark:hover:bg-slate-900"
                    href="#inicio"
                  >
                    Volver arriba
                  </a>
                </div>
              </div>

              {/* Form */}
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {process.env.NEXT_PUBLIC_WHATSAPP_PHONE ? (
        <FloatingChat phoneE164={process.env.NEXT_PUBLIC_WHATSAPP_PHONE} />
      ) : null}
    </main>
  );
}

