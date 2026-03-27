export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/70 py-10 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-center text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:justify-between sm:text-left">
        <p>© {new Date().getFullYear()} GEN. Todos los derechos reservados.</p>

        <div className="flex gap-4">
          <a href="#inicio" className="hover:text-slate-900 dark:hover:text-white">
            Inicio
          </a>
          <a href="#beneficios" className="hover:text-slate-900 dark:hover:text-white">
            Beneficios
          </a>
          <a href="#contacto" className="hover:text-slate-900 dark:hover:text-white">
            Contacto
          </a>
          <a href="#quienes" className="hover:text-slate-900 dark:hover:text-white">
            Quiénes somos
          </a>
        </div>
      </div>
    </footer>
  );
}

