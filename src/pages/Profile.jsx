import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ErrorMessage from "../components/ErrorMessage";
import FormField from "../components/FormField";
import Title from "../components/Title";

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
    <div className="space-y-4">
      <Title>Perfil</Title>

      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 rounded-md bg-slate-200 p-6 shadow"
        >
          <FormField
            label="Nome"
            id="name"
            type="text"
            maxLength={MAX_NAME_LENGTH}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="bio" className="text-sm font-medium text-slate-700">
              Sobre mim
            </label>
            <textarea
              id="bio"
              rows={4}
              maxLength={MAX_BIO_LENGTH}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="rounded-md border border-slate-300 px-4 py-2"
            />
            <span className="text-right text-xs text-slate-500">
              {bio.length}/{MAX_BIO_LENGTH}
            </span>
          </div>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <div className="flex gap-2">
            <button
              disabled={isSaving}
              className="flex-1 rounded-md bg-slate-500 px-4 py-2 font-medium text-white hover:bg-slate-600 disabled:opacity-60"
            >
              {isSaving ? "A guardar..." : "Guardar"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
              className="flex-1 rounded-md bg-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-400"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 rounded-md bg-slate-200 p-6 shadow">
          <dl className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-slate-500">Nome</dt>
              <dd className="text-lg text-slate-700">{user.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500">Email</dt>
              <dd className="text-lg text-slate-700">{user.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500">Sobre mim</dt>
              <dd className="whitespace-pre-line text-slate-700">
                {user.bio || (
                  <span className="italic text-slate-500">
                    Ainda não escreveste nada sobre ti.
                  </span>
                )}
              </dd>
            </div>
          </dl>

          <button
            onClick={handleEditClick}
            className="w-full rounded-md bg-slate-500 px-4 py-2 font-medium text-white hover:bg-slate-600"
          >
            Editar perfil
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
