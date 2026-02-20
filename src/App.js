import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function App() {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      const currentUser = session?.user || null;
      setUser(currentUser);

      if (!currentUser) {
        setLoading(false);
        return;
      }

      const { data: perfilData } = await supabase
        .from("perfis_atletas")
        .select("*")
        .eq("auth_id", currentUser.id)
        .maybeSingle();

      setPerfil(perfilData);
      setLoading(false);
    };

    carregar();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, fontSize: 20 }}>
        Carregando...
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (!perfil) {
    return <ProfileSetup user={user} />;
  }

  return <Dashboard user={user} perfil={perfil} />;
}
