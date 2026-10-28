import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthLayout from "../components/AuthLayout";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import FormField from "../components/FormField";
import InfoMessage from "../components/InfoMessage";
import Loader from "../components/Loader";

function ForgotPassword() {
  const { requestPasswordReset, isAuthenticated, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return <Loader fullPage />;
  if (isAuthenticated) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await requestPasswordReset(email.trim());
      setSentTo(email.trim());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout
      title="Recuperar palavra-passe"
      subtitle="Indica o email da tua conta e enviamos-te um link para definires uma nova."
    >
      {sentTo ? (
        <div className="space-y-4 rounded-xl border border-line bg-surface p-6 shadow-sm">
          <InfoMessage>
            Se existir uma conta com {sentTo}, vais receber um email com o link
            para definir uma nova palavra-passe.
          </InfoMessage>
          <p className="text-sm text-muted">
            Não recebeste? Verifica a pasta de spam ou{" "}
            <button
              type="button"
              onClick={() => setSentTo("")}
              className="font-medium text-accent hover:underline"
            >
              tenta outra vez
            </button>
            .
          </p>
        </div>
      ) : (
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

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button disabled={isSubmitting} className="w-full">
            {isSubmitting ? "A enviar..." : "Enviar link de recuperação"}
          </Button>
        </form>
      )}

      <p className="text-center text-sm text-muted">
        Lembraste-te?{" "}
        <Link to="/login" className="font-medium text-accent hover:underline">
          Voltar ao início de sessão
        </Link>
      </p>
    </AuthLayout>
  );
}

export default ForgotPassword;
