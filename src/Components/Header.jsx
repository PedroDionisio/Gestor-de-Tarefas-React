import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function navLinkClass({ isActive }) {
  return `rounded-md px-3 py-1 text-sm font-medium ${
    isActive
      ? "bg-slate-200 text-slate-700"
      : "text-slate-100 hover:bg-slate-500"
  }`;
}

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="flex items-center justify-between rounded-md bg-slate-600 px-4 py-3 shadow">
      <nav className="flex gap-2">
        <NavLink to="/" end className={navLinkClass}>
          Tarefas
        </NavLink>
        <NavLink to="/perfil" className={navLinkClass}>
          Perfil
        </NavLink>
      </nav>

      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-100">Olá, {user.name}</span>
        <button
          onClick={handleLogout}
          className="rounded-md bg-slate-400 px-3 py-1 text-sm font-medium text-white hover:bg-slate-500"
        >
          Sair
        </button>
      </div>
    </header>
  );
}

export default Header;
