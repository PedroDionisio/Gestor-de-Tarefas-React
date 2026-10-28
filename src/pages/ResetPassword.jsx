import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

function ResetPassword() {
  const { updatePassword, logout, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return <Loader fullPage />;

  if (!isAuthenticated && !isSubmitting)
    return (
      <AuthLayout
        title="Link inválido"
        subtitle="Este link de recuperação expirou ou já foi usado."
      >
        <div className="space-y-4 rounded-xl border border-line bg-surface p-6 shadow-sm">
          <p className="text-sm text-muted">
            Por segurança, cada link só funciona uma vez e durante pouco tempo.
            Pede um novo para continuares.
          </p>
          <Link
            to="/recuperar-password"
            className="flex w-full justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
          >
            Pedir novo link
          </Link>
        </div>
      </AuthLayout>
    );

  async function handleSubmit(e) {
    e.preventDefault();

    const validationError = validatePassword(password, confirmPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await updatePassword(password);
      await logout();
      navigate("/login", {
        replace: true,
        state: {
          message:
            "Palavra-passe alterada. Inicia sessão com a nova palavra-passe.",
        },
      });
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Nova palavra-passe"
      subtitle="Escolhe a nova palavra-passe da tua conta."
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-line bg-surface p-6 shadow-sm"
      >
        <FormField
          label="Nova palavra-passe"
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
          {isSubmitting ? "A guardar..." : "Guardar palavra-passe"}
        </Button>
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;
