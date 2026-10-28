import { Link } from "react-router-dom";
import Logo from "../components/Logo";

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm space-y-6">
        <Logo />
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Página não encontrada
          </h1>
          <p className="text-muted">
            O endereço que abriste não existe ou foi alterado.
          </p>
        </div>
        <Link
          to="/"
          className="inline-flex rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
        >
          Voltar às tarefas
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
