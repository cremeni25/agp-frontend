import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProfileSetup from "./pages/ProfileSetup";

function App() {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    async function carregar() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);

      if (data.user) {
        const { data: perfilData } = await supabase
          .from("perfis_atletas")
          .select("*")
          .eq("auth_id", data.user.id)
          .single();

        setPerfil(perfilData);
      }
    }

    carregar();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      carregar();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!user) return <Login />;

  if (!perfil) return <ProfileSetup user={user} />;

  return <Dashboard user={user} />;
}

export default App;
