import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthLayout from "../components/AuthLayout";
import ErrorMessage from "../components/ErrorMessage";
import FormField from "../components/FormField";
import InfoMessage from "../components/InfoMessage";
import Loader from "../components/Loader";

function Login() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname ?? "/";
  const notice = location.state?.message;

  if (isLoading) return <Loader fullPage />;
  if (isAuthenticated) return <Navigate to={redirectTo} replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email: email.trim(), password });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 rounded-md bg-slate-200 p-6 shadow"
      >
        <h2 className="text-center text-xl font-bold text-slate-600">
          Iniciar sessão
        </h2>

        <FormField
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <FormField
          label="Palavra-passe"
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {notice && !error && <InfoMessage>{notice}</InfoMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <button
          disabled={isSubmitting}
          className="rounded-md bg-slate-500 px-4 py-2 font-medium text-white hover:bg-slate-600 disabled:opacity-60"
        >
          {isSubmitting ? "A entrar..." : "Entrar"}
        </button>

        <p className="text-center text-sm text-slate-600">
          Ainda não tens conta?{" "}
          <Link to="/registo" className="font-medium text-slate-700 underline">
            Regista-te
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Login;
