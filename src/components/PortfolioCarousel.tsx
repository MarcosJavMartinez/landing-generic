
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type PortfolioItem = {
  title: string;
  client: string;
  desc: string;
  tag: string;
  rating: number; // 0..5
};

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: full }).map((_, i) => (
          <span key={`f${i}`} className="text-amber-500">
            ★
          </span>
        ))}
        {hasHalf && <span className="text-amber-500">☆</span>}
        {Array.from({ length: empty }).map((_, i) => (
          <span key={`e${i}`} className="text-slate-300 dark:text-slate-600">
            ★
          </span>
        ))}
      </div>
      <span className="text-xs text-slate-500 dark:text-slate-400">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export function PortfolioCarousel({ items }: { items: PortfolioItem[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // timers
  const pauseTimeoutRef = useRef<number | null>(null);
  const autoRef = useRef<number | null>(null);
  const scrollEndFallbackRef = useRef<number | null>(null);

  // refs para evitar stale state
  const isPausedRef = useRef(false);

  // rendered index: 0..n+1 (con clones), arrancamos en 1 (primer real)
  const renderedIndexRef = useRef(1);

  const [activeIndex, setActiveIndex] = useState(0); // 0..n-1 (real)
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  const dotsCount = useMemo(() => Math.min(3, items.length), [items.length]);

  // items renderizados con clones: [last, ...items, first]
  const rendered = useMemo(() => {
    if (items.length <= 1) return items;
    return [items[items.length - 1], ...items, items[0]];
  }, [items]);

  const pauseFor = (ms: number) => {
    isPausedRef.current = true;
    if (pauseTimeoutRef.current) window.clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = window.setTimeout(() => {
      isPausedRef.current = false;
    }, ms);
  };

  const getCards = () => {
    const el = scrollerRef.current;
    if (!el) return [];
    return Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
  };

  const scrollToRenderedIndex = (
    rIndex: number,
    behavior: ScrollBehavior = "smooth"
  ) => {
    const el = scrollerRef.current;
    if (!el) return;

    const cards = getCards();
    const target = cards[rIndex];
    if (!target) return;

    renderedIndexRef.current = rIndex;

    el.scrollTo({
      left: target.offsetLeft,
      behavior,
    });
  };

  // calcula el renderedIndex por la card más cercana al centro del viewport
  const getNearestRenderedIndex = () => {
    const el = scrollerRef.current;
    if (!el) return 1;

    const cards = getCards();
    if (!cards.length) return 1;

    const center = el.scrollLeft + el.clientWidth / 2;

    let bestIdx = 0;
    let bestDist = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - cardCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });

    return bestIdx;
  };

  // normaliza clones SOLO cuando terminó el scroll (o casi)
  const normalizeIfClone = () => {
    if (items.length <= 1) return;

    const n = items.length;
    const lastRealRendered = n; // 1..n
    const firstRealRendered = 1;
    const lastClone = n + 1; // n+1

    const rIdx = renderedIndexRef.current;

    if (rIdx === 0) {
      // clone izquierda -> último real
      scrollToRenderedIndex(lastRealRendered, "auto");
      return;
    }
    if (rIdx === lastClone) {
      // clone derecha -> primer real
      scrollToRenderedIndex(firstRealRendered, "auto");
      return;
    }
  };

  // Flechas: wrap infinito estable usando renderedIndexRef.current
  const goByArrow = (dir: 1 | -1) => {
    if (items.length <= 1) return;

    pauseFor(3500);

    const n = items.length;
    const lastRealRendered = n; // 1..n
    const firstRealRendered = 1;
    const lastClone = n + 1;

    let rIdx = renderedIndexRef.current;

    // si justo quedaste en clone por wheel/drag, normalizá primero
    if (rIdx === 0) rIdx = lastRealRendered;
    if (rIdx === lastClone) rIdx = firstRealRendered;

    if (dir === 1) {
      // derecha: último real -> clone derecha
      if (rIdx >= lastRealRendered) {
        scrollToRenderedIndex(lastClone, "smooth");
      } else {
        scrollToRenderedIndex(rIdx + 1, "smooth");
      }
    } else {
      // izquierda: primer real -> clone izquierda
      if (rIdx <= firstRealRendered) {
        scrollToRenderedIndex(0, "smooth");
      } else {
        scrollToRenderedIndex(rIdx - 1, "smooth");
      }
    }
  };

  // mount: posicionar en el primer item real (rendered index 1)
  useEffect(() => {
    if (items.length <= 1) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToRenderedIndex(1, "auto");
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  // Listener de scroll: actualiza renderedIndexRef + activeIndex
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rIdx = getNearestRenderedIndex();
        renderedIndexRef.current = rIdx;

        const n = items.length;

        // rendered: 0=clone(last), 1..n=reales, n+1=clone(first)
        let realIdx = 0;
        if (n <= 1) realIdx = 0;
        else if (rIdx === 0) realIdx = n - 1;
        else if (rIdx === n + 1) realIdx = 0;
        else realIdx = rIdx - 1;

        setActiveIndex(realIdx);

        // Fallback de "scrollend": si sigue scrolleando, se resetea
        if (scrollEndFallbackRef.current)
          window.clearTimeout(scrollEndFallbackRef.current);
        scrollEndFallbackRef.current = window.setTimeout(() => {
          normalizeIfClone();
        }, 140);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      if (scrollEndFallbackRef.current)
        window.clearTimeout(scrollEndFallbackRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  // scrollend real (Chrome lo soporta). Si no existe, ya tenemos fallback arriba.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let wheelEnd: number | null = null;

    const onWheel = (e: WheelEvent) => {
      const hasHorizontalOverflow = el.scrollWidth > el.clientWidth;
      if (!hasHorizontalOverflow) return;

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: "auto" });
        pauseFor(2500);

        if (wheelEnd) window.clearTimeout(wheelEnd);
        wheelEnd = window.setTimeout(() => {
          normalizeIfClone();
        }, 140);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelEnd) window.clearTimeout(wheelEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  // autoscroll infinito (loop). Usa activeIndex real para avanzar siempre.
  useEffect(() => {
    if (items.length <= 1) return;

    if (autoRef.current) window.clearInterval(autoRef.current);
    autoRef.current = window.setInterval(() => {
      if (isPausedRef.current) return;

      const n = items.length;

      // rIdx actual (rendered)
      const rIdx = renderedIndexRef.current;

      // si estamos en último real, vamos al clone derecha para que luego normalice a 1
      if (rIdx >= n) {
        scrollToRenderedIndex(n + 1, "smooth");
      } else {
        scrollToRenderedIndex(rIdx + 1, "smooth");
      }
    }, 4500);

    return () => {
      if (autoRef.current) window.clearInterval(autoRef.current);
      autoRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  // Modal ESC
  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  // dots mapping
  const dotIndexToItemIndex = (dotIdx: number) => {
    if (dotsCount <= 1) return 0;
    if (dotsCount === 2) return dotIdx === 0 ? 0 : items.length - 1;
    if (dotIdx === 0) return 0;
    if (dotIdx === 1) return Math.floor((items.length - 1) / 2);
    return items.length - 1;
  };

  const activeDot = useMemo(() => {
    if (dotsCount <= 1) return 0;
    if (dotsCount === 2) return activeIndex < items.length / 2 ? 0 : 1;

    const mid = Math.floor((items.length - 1) / 2);
    const candidates = [0, mid, items.length - 1];

    let best = 0;
    let bestDist = Infinity;
    candidates.forEach((c, i) => {
      const d = Math.abs(activeIndex - c);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  }, [activeIndex, dotsCount, items.length]);

  return (
    <>
      <div
        className="relative group"
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={() => (isPausedRef.current = false)}
        onFocusCapture={() => (isPausedRef.current = true)}
        onBlurCapture={() => (isPausedRef.current = false)}
      >
        {/* Controls */}
        <button
          type="button"
          onClick={() => goByArrow(-1)}
          className="hidden sm:inline-flex absolute left-2 top-1/2 z-50 -translate-y-1/2
            items-center justify-center rounded-full border border-slate-200 bg-white/70 p-3
            text-slate-700 shadow-md backdrop-blur transition hover:bg-white hover:text-slate-900
            dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-white
            opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Anterior"
        >
          <span className="text-lg leading-none">‹</span>
        </button>

        <button
          type="button"
          onClick={() => goByArrow(1)}
          className="hidden sm:inline-flex absolute right-2 top-1/2 z-50 -translate-y-1/2
            items-center justify-center rounded-full border border-slate-200 bg-white/70 p-3
            text-slate-700 shadow-md backdrop-blur transition hover:bg-white hover:text-slate-900
            dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-white
            opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          aria-label="Siguiente"
        >
          <span className="text-lg leading-none">›</span>
        </button>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-12 bg-gradient-to-r from-white/80 to-transparent dark:from-slate-950/80" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-12 bg-gradient-to-l from-white/80 to-transparent dark:from-slate-950/80" />

        {/* Scroll area */}
        <div
          ref={scrollerRef}
          className="relative z-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-10 pb-2
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onPointerDown={() => pauseFor(3500)}
          onTouchStart={() => pauseFor(3500)}
        >
          {rendered.map((item, i) => (
            <article
              key={`${item.client}-${item.title}-${i}`}
              data-card
              role="button"
              tabIndex={0}
              onClick={() => setSelected(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelected(item);
              }}
              className="snap-start w-[85%] shrink-0 cursor-pointer rounded-3xl border border-slate-200 bg-white/80 p-6
                shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md hover:scale-[1.01] hover:border-emerald-400/40
                dark:border-slate-800 dark:bg-slate-900/60 sm:w-[420px]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.client}
                  </p>
                  <h3 className="mt-1 text-sm font-semibold">{item.title}</h3>
                </div>

                <span className="rounded-full bg-black/80 px-3 py-1 text-[11px] text-white dark:bg-white dark:text-black">
                  {item.tag}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                {item.desc}
              </p>

              <div className="mt-4">
                <Stars rating={item.rating} />
              </div>
            </article>
          ))}
        </div>

        {/* Dots */}
        {dotsCount > 1 && (
          <div className="mt-5 flex items-center justify-center gap-2">
            {Array.from({ length: dotsCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  const targetReal = dotIndexToItemIndex(i);
                  // realIndex -> renderedIndex (+1 por clones)
                  scrollToRenderedIndex(targetReal + 1, "smooth");
                  pauseFor(4000);
                }}
                aria-label={`Ir a sección ${i + 1}`}
                className={[
                  "h-2.5 w-2.5 rounded-full transition",
                  i === activeDot
                    ? "bg-slate-900 dark:bg-slate-100"
                    : "bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          aria-modal="true"
          role="dialog"
        >
          <button
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelected(null)}
            aria-label="Cerrar"
            type="button"
          />
          <div className="relative z-10 w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selected.client}
                </p>
                <h3 className="mt-1 text-lg font-semibold">{selected.title}</h3>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="rounded-xl border border-slate-200 bg-white/70 px-3 py-1 text-sm text-slate-700 shadow-sm hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-900"
                aria-label="Cerrar modal"
                type="button"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-4">
              <span className="inline-block rounded-full bg-black/80 px-3 py-1 text-[11px] text-white dark:bg-white dark:text-black">
                {selected.tag}
              </span>
            </div>

            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              {selected.desc}
            </p>

            <div className="mt-5">
              <Stars rating={selected.rating} />
            </div>

            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
              Tip: cerrás con{" "}
              <kbd className="rounded bg-slate-200 px-1 dark:bg-slate-800">
                Esc
              </kbd>
            </p>
          </div>
        </div>
      )}
    </>
  );
}