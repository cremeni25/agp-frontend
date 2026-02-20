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
    async function iniciar() {
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user;

      setUser(currentUser);

      if (!currentUser) {
        setLoading(false);
        return;
      }

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

  // 👉 NÃO LOGADO → LOGIN
  if (!user) {
    return <Login />;
  }

  // 👉 LOGADO MAS SEM PERFIL → CADASTRO
  if (!perfil) {
    return <ProfileSetup user={user} />;
  }

  // 👉 PERFIL OK → DASHBOARD
  return <Dashboard user={user} perfil={perfil} />;
}