import { createContext, useContext, useState } from "react";
import { FAKE_USERS } from "../data/fakeUsers";

const AuthContext = createContext();

const SESSION_KEY = "gestor-session";

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);

  function login(email, password) {
    const account = FAKE_USERS.find(
      (fakeUser) =>
        fakeUser.email === email.trim().toLowerCase() &&
        fakeUser.password === password,
    );
    if (!account) return false;

    const sessionUser = {
      id: account.id,
      name: account.name,
      email: account.email,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    return true;
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: Boolean(user), login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth tem de ser usado dentro do AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
