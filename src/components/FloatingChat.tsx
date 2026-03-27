"use client";


import { useEffect, useMemo, useState, useId } from "react";

type Props = {
  phoneE164: string; // ej: 5492613466421 (sin +)
};

export function FloatingChat({ phoneE164 }: Props) {
  const [open, setOpen] = useState(false);

  // IDs únicos para los gradients (evita que "desaparezca" el teléfono blanco)
  const uid = useId();
  const gradBg = `wa_grad_bg_${uid}`;
  const gradInner = `wa_grad_inner_${uid}`;

  // Cierra con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const base = useMemo(() => `https://wa.me/${phoneE164}?text=`, [phoneE164]);

  const go = (msg: string) => {
    window.open(base + encodeURIComponent(msg), "_blank", "noreferrer");
    setOpen(false);
  };

  return (
    <>
      {/* Overlay (solo cuando está abierto) */}
      {open && (
        <div
          className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-[1px]"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div data-floating-chat-root className="fixed bottom-24 right-6 z-[9999]">
        {/* Panel */}
        {open && (
          <div className="mb-3 w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 animate-[fadeUp_.18s_ease-out]">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
              <div className="flex items-center gap-3">
                {/* Mini icono WhatsApp */}
<span className="
  inline-flex h-9 w-9 items-center justify-center rounded-full
  bg-emerald-500 dark:bg-emerald-500
">
  <svg
    viewBox="0 0 32 32"
    className="h-5 w-5 text-white"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.11 17.19c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.33-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.83-2.01-.22-.53-.44-.46-.61-.46h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.99 2.66 1.13 2.84c.14.18 1.95 2.98 4.74 4.18.66.29 1.17.46 1.57.59.66.21 1.27.18 1.74.11.53-.08 1.6-.65 1.83-1.27.23-.61.23-1.14.16-1.27-.07-.13-.25-.2-.52-.34z" />
    <path d="M16.02 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.6 4.46 1.74 6.39L3.2 28.8l6.57-1.72a12.76 12.76 0 0 0 6.25 1.62h.01c7.07 0 12.8-5.73 12.8-12.8S23.09 3.2 16.02 3.2z" />
  </svg>
</span>

                <div>
                  <p className="text-sm font-semibold">WhatsApp</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Elegí un mensaje rápido
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="grid gap-2 p-3">
              <button
                onClick={() =>
                  go(
                    "Hola! Quiero pedir presupuesto para una landing.\n\nRubro: ____\nObjetivo: ____\nFecha ideal: ____\nReferencias (links): ____"
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
              >
                💸 Pedir presupuesto
                <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                  Datos clave para cotizar
                </span>
              </button>

              <button
                onClick={() =>
                  go(
                    "Hola! Quiero una landing para vender servicios.\n\nRubro: ____\nServicios: ____\nSecciones: ____\nZona/ciudad: ____\nReferencias (links): ____"
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
              >
                🧩 Landing de servicios
                <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                  Ideal para kinesio, electricista, DJ, etc.
                </span>
              </button>

              <button
                onClick={() =>
                  go(
                    "Hola! Quiero vender cursos.\n\nModelo: mensual / pago único\nCantidad de cursos: ____\nPlataforma: ____\nObjetivo: ____\nFecha: ____"
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
              >
                🎓 Vender cursos
                <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                  Estructura + estimación de presupuesto
                </span>
              </button>

              <button
                onClick={() => go("Hola! Quiero hablar por WhatsApp 🙂")}
                className="rounded-xl bg-emerald-500 px-4 py-3 text-left text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-600 active:scale-[0.98]"
              >
                📱 WhatsApp directo
              </button>
            </div>
          </div>
        )}

        {/* Botón flotante (desaparece cuando el panel está abierto) */}
{!open && (
  <button
    onClick={() => setOpen(true)}
    className="
      inline-flex h-14 w-14 items-center justify-center rounded-full
      bg-white shadow-lg shadow-black/10 ring-1 ring-slate-200
      transition hover:scale-[1.03] active:scale-[0.98]
      dark:bg-emerald-500 dark:shadow-emerald-500/25 dark:ring-0
    "
    aria-label="Abrir WhatsApp"
    title="WhatsApp"
  >
    <WhatsAppLogo gradBgId={gradBg} gradInnerId={gradInner} className="h-9 w-9" />
  </button>
)}
      </div>
    </>
  );
}

/** Logo WhatsApp con gradients (IDs inyectados para evitar conflictos) */
function WhatsAppLogo({
  gradBgId,
  gradInnerId,
  className = "h-8 w-8",
}: {
  gradBgId: string;
  gradInnerId: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 430 430" className={className} aria-hidden="true">
      <defs>
        <linearGradient
          id={gradBgId}
          x1="-76.12"
          y1="27.85"
          x2="285.63"
          y2="260.41"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.04" stopColor="#4ac14b" />
          <stop offset="1" stopColor="#06853a" />
        </linearGradient>

        <linearGradient
          id={gradInnerId}
          x1="217.76"
          y1="110.5"
          x2="217.76"
          y2="315.12"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#4ac14b" />
          <stop offset="1" stopColor="#06853a" />
        </linearGradient>
      </defs>

      <circle cx="215" cy="215" r="215" fill={`url(#${gradBgId})`} />

      <path
        fill={`url(#${gradInnerId})`}
        fillRule="evenodd"
        d="M217.77,110.5c-56.87,0-103.11,45.89-103.11,102.31,0,22.38,7.29,43.11,19.64,59.99l-12.88,37.99,39.62-12.59c16.28,10.68,35.78,16.91,56.73,16.91,56.84,0,103.1-45.89,103.1-102.3s-46.26-102.31-103.1-102.31Z"
      />

      <path
        fill="#fff"
        fillRule="evenodd"
        d="M334,211.94c0,64.02-52.31,115.93-116.83,115.93-20.49,0-39.74-5.23-56.48-14.43l-64.69,20.56 21.09-62.2c-10.64-17.47-16.76-37.96-16.76-59.86 0-64.03,52.31-115.94,116.84-115.94s116.83,51.91,116.83,115.94ZM217.17,114.46c-54.18,0-98.23,43.72-98.23,97.47 0,21.32,6.94,41.07,18.71,57.15l-12.27,36.19 37.74-11.99c15.51,10.17,34.09,16.11,54.05,16.11 54.16,0,98.22-43.72,98.22-97.46s-44.07-97.47-98.22-97.47Z"
      />

      <path
        fill="#fff"
        fillRule="evenodd"
        d="M276.17,238.64c-.72-1.19-2.63-1.9-5.49-3.32-2.87-1.42-16.95-8.3-19.58-9.24-2.62-.95-4.55-1.42-6.44,1.42-1.91,2.84-7.4,9.25-9.08,11.14-1.67,1.9-3.33,2.13-6.2.71-2.87-1.42-12.1-4.43-23.04-14.1-8.51-7.54-14.26-16.84-15.94-19.68-1.66-2.84-.17-4.38,1.25-5.79 1.29-1.28,2.87-3.32,4.3-4.97 1.43-1.67,1.91-2.86,2.87-4.75.96-1.9.48-3.55-.24-4.97-.71-1.42-6.44-15.4-8.83-21.1-2.37-5.68-4.76-5.47-6.44-5.47s-4.76.5-4.76.5-5.74.71-8.36,3.55c-2.62,2.84-10.02,9.72-10.02,23.69s10.25,27.5,11.69,29.39c1.43,1.9,19.81,31.53,48.93,42.91 29.12,11.37,29.12,7.58,34.37,7.1 5.24-.46,16.94-6.87,19.33-13.51 2.39-6.64,2.39-12.33,1.68-13.51Z"
      />
    </svg>
  );
}
