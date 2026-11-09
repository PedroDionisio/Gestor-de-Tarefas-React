import { Check } from "lucide-react";
import Logo from "./Logo";

const PREVIEW_TASKS = [
  { title: "Rever o relatório trimestral", done: true },
  { title: "Marcar a revisão do carro", done: true },
  { title: "Preparar a apresentação de sexta", done: false },
];

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-canvas lg:grid lg:grid-cols-2">
      <aside className="hidden flex-col bg-ink p-12 text-white lg:flex xl:p-16">
        <Logo light />

        <div className="my-auto max-w-md space-y-10 xl:max-w-lg">
          <div className="space-y-4">
            <h2 className="text-4xl font-semibold leading-tight tracking-tight xl:text-5xl">
              A Tua Agenda Virtual
            </h2>
            <p className="text-lg text-white/60">
              Escreve, organiza e risca o que já está feito.
            </p>
          </div>

          <ul
            aria-hidden="true"
            className="divide-y divide-white/10 rounded-xl border border-white/10 bg-white/5"
          >
            {PREVIEW_TASKS.map((task) => (
              <li
                key={task.title}
                className="flex items-center gap-3 px-4 py-3"
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    task.done ? "border-accent bg-accent" : "border-white/30"
                  }`}
                >
                  {task.done && <Check size={12} strokeWidth={3} />}
                </span>
                <span
                  className={
                    task.done
                      ? "text-white/60 line-through decoration-accent decoration-2"
                      : ""
                  }
                >
                  {task.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm space-y-6">
          <div className="lg:hidden">
            <Logo />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm text-muted">{subtitle}</p>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
