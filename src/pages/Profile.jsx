import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import FormField from "../components/FormField";
import Title from "../components/Title";
import { inputClass } from "../utils/styles";

const MAX_NAME_LENGTH = 60;
const MAX_BIO_LENGTH = 300;

function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function handleEditClick() {
    setName(user.name);
    setBio(user.bio);
    setError("");
    setIsEditing(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("O nome não pode ficar vazio.");
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      await updateProfile({ name: name.trim(), bio: bio.trim() });
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <Title>Perfil</Title>

      <section className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className="flex flex-col items-center gap-4 p-6 text-center sm:flex-row sm:text-left">
          <Avatar name={user.name} size="lg" />
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-xl font-semibold">{user.name}</h2>
            <p className="truncate text-sm text-muted">{user.email}</p>
          </div>
          {!isEditing && (
            <Button variant="secondary" onClick={handleEditClick}>
              Editar perfil
            </Button>
          )}
        </div>

        <div className="border-t border-line p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Nome"
                id="name"
                type="text"
                maxLength={MAX_NAME_LENGTH}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <div className="space-y-1.5">
                <label htmlFor="bio" className="block text-sm font-medium">
                  Sobre mim
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  maxLength={MAX_BIO_LENGTH}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className={inputClass}
                />
                <p className="text-right text-xs text-muted">
                  {bio.length}/{MAX_BIO_LENGTH}
                </p>
              </div>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                >
                  Cancelar
                </Button>
                <Button disabled={isSaving}>
                  {isSaving ? "A guardar..." : "Guardar"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted">Sobre mim</h3>
              <p className="whitespace-pre-line leading-relaxed">
                {user.bio || (
                  <span className="text-muted">
                    Ainda não escreveste nada sobre ti.
                  </span>
                )}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Profile;
