import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
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
    <AuthLayout title="Iniciar sessão" subtitle="Bem-vindo de volta.">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-line bg-surface p-6 shadow-sm"
      >
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

        <div className="-mt-2 flex justify-end">
          <Link
            to="/recuperar-password"
            className="text-sm font-medium text-accent hover:underline"
          >
            Esqueceste-te da palavra-passe?
          </Link>
        </div>

        {notice && !error && <InfoMessage>{notice}</InfoMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button disabled={isSubmitting} className="w-full">
          {isSubmitting ? "A entrar..." : "Entrar"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted">
        Ainda não tens conta?{" "}
        <Link to="/registo" className="font-medium text-accent hover:underline">
          Regista-te
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;
