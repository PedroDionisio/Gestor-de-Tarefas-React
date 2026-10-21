import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FAKE_USERS } from "../data/fakeUsers";
import Title from "../components/Title";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const redirectTo = location.state?.from?.pathname ?? "/";

  if (isAuthenticated) return <Navigate to={redirectTo} replace />;

  function handleSubmit(e) {
    e.preventDefault();
    if (!login(email, password)) setError("Email ou palavra-passe incorretos.");
  }

  function fillDemoAccount(account) {
    setEmail(account.email);
    setPassword(account.password);
    setError("");
  }

  return (
    <div className="flex min-h-screen w-full justify-center bg-slate-500 p-6">
      <div className="w-full max-w-[500px] space-y-4">
        <Title>Gestor de Tarefas</Title>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 rounded-md bg-slate-200 p-6 shadow"
        >
          <h2 className="text-center text-xl font-bold text-slate-600">
            Iniciar sessão
          </h2>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-md border border-slate-300 px-4 py-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Palavra-passe
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-md border border-slate-300 px-4 py-2"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button className="rounded-md bg-slate-500 px-4 py-2 font-medium text-white hover:bg-slate-600">
            Entrar
          </button>
        </form>

        <div className="space-y-2 rounded-md bg-slate-200 p-6 shadow">
          <p className="text-sm font-medium text-slate-700">
            Contas de demonstração
          </p>
          <ul className="space-y-2">
            {FAKE_USERS.map((account) => (
              <li
                key={account.id}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-slate-600">
                  {account.email} / {account.password}
                </span>
                <button
                  type="button"
                  onClick={() => fillDemoAccount(account)}
                  className="rounded-md bg-slate-300 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-400"
                >
                  Usar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
