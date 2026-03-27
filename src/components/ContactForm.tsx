"use client";

import { useState, type FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  website: string; // honeypot
};

const initial: FormState = {
  name: "",
  email: "",
  service: "",
  budget: "",
  message: "",
  website: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOkMsg(null);
    setErrMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: form.service,
          budget: form.budget,
          message: form.message,
          website: form.website, // honeypot
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setErrMsg(data?.error || "No se pudo enviar. Probá de nuevo.");
        return;
      }

      setOkMsg("Listo ✅ Te responderé al mail en breve.");
      setForm(initial);
    } catch {
      setErrMsg("Error de red. Revisá conexión / consola.");
    } finally {
      setLoading(false);
    }
  }

  const fieldBase =
    "w-full h-11 rounded-xl border border-slate-200 bg-white px-4 " +
    "text-sm outline-none transition " +
    "focus:ring-2 focus:ring-emerald-300 " +
    "dark:border-slate-800 dark:bg-slate-900";

  return (
    <form
      onSubmit={onSubmit}
      className="
        rounded-2xl border border-slate-200 bg-white/90 p-6
        shadow-lg shadow-slate-900/10 backdrop-blur
        transition hover:shadow-xl
        dark:border-slate-800 dark:bg-slate-950/50
      "
    >
      <h3 className="text-sm font-semibold">Pedí presupuesto</h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Te respondo con tiempos, costo estimado y próximos pasos.
      </p>

      {/* Honeypot (oculto) */}
      <input
        value={form.website}
        onChange={(e) => set("website", e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* GRID */}
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
        <label className="min-w-0 grid gap-1 text-xs text-slate-600 dark:text-slate-300">
          Nombre
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className={fieldBase}
            placeholder="Tu nombre"
            required
            minLength={2}
          />
        </label>

        <label className="min-w-0 grid gap-1 text-xs text-slate-600 dark:text-slate-300">
          Email
          <input
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            className={fieldBase}
            placeholder="tu@mail.com"
            type="email"
            required
          />
        </label>

        <label className="min-w-0 grid gap-1 text-xs text-slate-600 dark:text-slate-300">
          Servicio
          <select
            value={form.service}
            onChange={(e) => set("service", e.target.value)}
            className={`${fieldBase} appearance-none pr-10`}
          >
            <option value="">Elegí una opción</option>
            <option value="Landing de servicios">Landing de servicios</option>
            <option value="Venta de cursos">Venta de cursos</option>
            <option value="Portfolio / Marca personal">
              Portfolio / Marca personal
            </option>
            <option value="Otro">Otro</option>
          </select>
        </label>

        <label className="min-w-0 grid gap-1 text-xs text-slate-600 dark:text-slate-300">
          Presupuesto
          <select
            value={form.budget}
            onChange={(e) => set("budget", e.target.value)}
            className={`${fieldBase} appearance-none pr-10`}
          >
            <option value="">(Opcional)</option>
            <option value="USD 100–300">USD 100–300</option>
            <option value="USD 300–800">USD 300–800</option>
            <option value="USD 800+">USD 800+</option>
          </select>
        </label>
      </div>

      {/* MENSAJE */}
      <label className="mt-4 grid gap-1 text-xs text-slate-600 dark:text-slate-300">
        Mensaje
        <textarea
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          className="
            w-full min-h-[120px] rounded-xl border border-slate-200 bg-white p-3
            text-sm outline-none transition
            focus:ring-2 focus:ring-emerald-300
            dark:border-slate-800 dark:bg-slate-900
          "
          placeholder="Contame rubro, objetivo, secciones, ejemplos y fecha ideal..."
          required
          minLength={10}
        />
      </label>

      {/* SUBMIT */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          disabled={loading}
          type="submit"
          className="
            group relative overflow-hidden
            rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white
            shadow-lg shadow-black/20
            transition-all duration-200
            hover:bg-slate-800 hover:-translate-y-[1px]
            active:translate-y-0 active:scale-[0.99]
            disabled:opacity-60 disabled:hover:translate-y-0
            dark:bg-white dark:text-black dark:hover:bg-slate-200
          "
        >
          {/* brillo sutil al hover */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0
              opacity-0 transition-opacity duration-200
              group-hover:opacity-100
              bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.22),transparent_60%)]
              dark:bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.10),transparent_60%)]
            "
          />
          <span className="relative">{loading ? "Enviando..." : "Enviar"}</span>
        </button>

        {okMsg && <p className="text-sm text-emerald-500">{okMsg}</p>}
        {errMsg && <p className="text-sm text-rose-500">{errMsg}</p>}
        <p className="text-xs text-slate-500 dark:text-slate-400">
          🔒 No comparto tus datos · Respuesta en menos de 24 hs
        </p>

      </div>
    </form>
  );
}
