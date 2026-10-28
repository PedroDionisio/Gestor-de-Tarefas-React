import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import {
  login,
  logout,
  requestPasswordReset,
  signup,
  updatePassword,
} from "../services/apiAuth";
import {
  getProfile,
  updateProfile as updateProfileApi,
} from "../services/apiProfile";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [sessionUser, setSessionUser] = useState(undefined);
  const [profile, setProfile] = useState(null);

  useEffect(function () {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionUser(
        session ? { id: session.user.id, email: session.user.email } : null,
      );
    });

    return () => data.subscription.unsubscribe();
  }, []);

  const userId = sessionUser?.id;

  useEffect(
    function () {
      if (!userId) return;
      let ignore = false;

      async function loadProfile() {
        try {
          const data = await getProfile(userId);
          if (!ignore) setProfile(data);
        } catch {
          if (!ignore)
            setProfile({ id: userId, name: "", bio: "", avatarUrl: null });
        }
      }

      loadProfile();
      return () => {
        ignore = true;
      };
    },
    [userId],
  );

  async function updateProfile(changes) {
    const data = await updateProfileApi(userId, changes);
    setProfile(data);
  }

  const isCheckingSession = sessionUser === undefined;
  const isLoadingProfile = Boolean(sessionUser) && profile?.id !== userId;
  const isLoading = isCheckingSession || isLoadingProfile;

  const user =
    sessionUser && !isLoadingProfile
      ? {
          id: sessionUser.id,
          email: sessionUser.email,
          name: profile.name || sessionUser.email,
          bio: profile.bio,
          avatarUrl: profile.avatarUrl,
        }
      : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        signup,
        logout,
        requestPasswordReset,
        updatePassword,
        updateProfile,
      }}
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
