import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthLayout from "../components/AuthLayout";
import ErrorMessage from "../components/ErrorMessage";
import FormField from "../components/FormField";
import Loader from "../components/Loader";

const MIN_PASSWORD_LENGTH = 6;
const MAX_NAME_LENGTH = 60;

function validate({ name, password, confirmPassword }) {
  if (!name.trim()) return "Indica o teu nome.";
  if (password.length < MIN_PASSWORD_LENGTH)
    return `A palavra-passe tem de ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  if (password !== confirmPassword) return "As palavras-passe não coincidem.";
  return "";
}

function Signup() {
  const { signup, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return <Loader fullPage />;
  if (isAuthenticated) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();

    const validationError = validate({ name, password, confirmPassword });
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const { needsConfirmation } = await signup({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (needsConfirmation)
        navigate("/login", {
          replace: true,
          state: {
            email: email.trim(),
            message: `Conta criada! Enviámos um email de confirmação para ${email.trim()}. Confirma o email antes de iniciares sessão.`,
          },
        });
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
          Criar conta
        </h2>

        <FormField
          label="Nome"
          id="name"
          type="text"
          autoComplete="name"
          maxLength={MAX_NAME_LENGTH}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <FormField
          label="Confirmar palavra-passe"
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <button
          disabled={isSubmitting}
          className="rounded-md bg-slate-500 px-4 py-2 font-medium text-white hover:bg-slate-600 disabled:opacity-60"
        >
          {isSubmitting ? "A criar conta..." : "Criar conta"}
        </button>

        <p className="text-center text-sm text-slate-600">
          Já tens conta?{" "}
          <Link to="/login" className="font-medium text-slate-700 underline">
            Inicia sessão
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Signup;
