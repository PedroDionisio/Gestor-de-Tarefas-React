import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import {
  MIN_PASSWORD_LENGTH,
  validatePassword,
} from "../utils/validatePassword";

const MAX_NAME_LENGTH = 60;

function validate({ name, password, confirmPassword }) {
  if (!name.trim()) return "Indica o teu nome.";
  return validatePassword(password, confirmPassword);
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
    <AuthLayout
      title="Criar conta"
      subtitle="Começa com uma lista vazia e uma tarefa de boas-vindas."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-line bg-surface p-6 shadow-sm"
      >
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

        <p className="text-xs text-muted">
          Mínimo de {MIN_PASSWORD_LENGTH} caracteres.
        </p>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button disabled={isSubmitting} className="w-full">
          {isSubmitting ? "A criar conta..." : "Criar conta"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted">
        Já tens conta?{" "}
        <Link to="/login" className="font-medium text-accent hover:underline">
          Inicia sessão
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Signup;
