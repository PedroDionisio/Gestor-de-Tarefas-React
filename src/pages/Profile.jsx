import { useAuth } from "../contexts/AuthContext";
import Title from "../components/Title";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="space-y-4">
      <Title>Perfil</Title>

      <dl className="space-y-3 rounded-md bg-slate-200 p-6 shadow">
        <div>
          <dt className="text-sm font-medium text-slate-500">Nome</dt>
          <dd className="text-lg text-slate-700">{user.name}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-500">Email</dt>
          <dd className="text-lg text-slate-700">{user.email}</dd>
        </div>
      </dl>
    </div>
  );
}

export default Profile;
