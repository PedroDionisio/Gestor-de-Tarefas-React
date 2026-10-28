import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import Avatar from "./Avatar";
import Logo from "./Logo";

const LINKS = [
  { to: "/", label: "Tarefas", end: true },
  { to: "/perfil", label: "Perfil" },
];

function navLinkClass({ isActive }) {
  return `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive ? "bg-canvas text-ink" : "text-muted hover:text-ink"
  }`;
}

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  useEffect(
    function () {
      if (!isMenuOpen) return;

      function handleKeyDown(e) {
        if (e.key === "Escape") setIsMenuOpen(false);
      }

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    },
    [isMenuOpen],
  );

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 sm:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={navLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 sm:flex">
          <Avatar name={user.name} />
          <span className="max-w-[12rem] truncate text-sm font-medium">
            {user.name}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted transition-colors hover:bg-line/60 hover:text-ink"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>

        <button
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          className="ml-auto rounded-md p-1.5 text-ink hover:bg-line/60 sm:hidden"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="space-y-3 border-t border-line px-4 py-4 sm:hidden">
          <div className="flex items-center gap-3">
            <Avatar name={user.name} />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                end={link.end}
                className={navLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted hover:bg-line/60 hover:text-ink"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
