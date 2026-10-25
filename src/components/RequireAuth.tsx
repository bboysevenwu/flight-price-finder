import { useEffect, useState } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthContext = { user: User };

// Client-side guard for signed-in pages: redirects to /auth when there is no user.
export function RequireAuth() {
  const [state, setState] = useState<
    { status: "loading" } | { status: "ready"; user: User | null }
  >({
    status: "loading",
  });

  useEffect(() => {
    let active = true;
    const check = () =>
      supabase.auth.getUser().then(({ data }) => {
        if (active) setState({ status: "ready", user: data.user });
      });
    check();
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") check();
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  if (state.status === "loading") return null;
  if (!state.user) return <Navigate to="/auth" replace />;
  return <Outlet context={{ user: state.user } satisfies AuthContext} />;
}

export function useAuthUser() {
  return useOutletContext<AuthContext>().user;
}
