import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function iniciar() {
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user;

      if (!currentUser) {
        window.location.href = "/login";
        return;
      }

      setUser(currentUser);

      const { data: perfilData } = await supabase
        .from("perfis_atletas")
        .select("*")
        .eq("auth_id", currentUser.id)
        .single();

      setPerfil(perfilData);
      setLoading(false);
    }

    iniciar();
  }, []);

  if (loading) return <div>Carregando...</div>;

  // 👉 SE NÃO TEM PERFIL → MOSTRA CADASTRO
  if (!perfil) return <ProfileSetup user={user} />;

  // 👉 SE TEM PERFIL → MOSTRA DASHBOARD
  return <Dashboard user={user} perfil={perfil} />;
}
