import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function App() {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [nivel, setNivel] = useState(null);
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

      if (perfilData) {
        setPerfil(perfilData);
        setNivel(perfilData.nivel || "gestor"); // fallback seguro
      }

      setLoading(false);
    }

    iniciar();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      window.location.reload();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, fontSize: 18 }}>
        Carregando AGP...
      </div>
    );
  }

  // 🔒 NÃO LOGADO
  if (!user) {
    return <Login />;
  }

  // 🧩 SEM PERFIL
  if (!perfil) {
    return <ProfileSetup user={user} />;
  }

  // 🚀 LOGADO + PERFIL OK
  // (futuro: dashboards por nível)
  return <Dashboard user={user} perfil={perfil} nivel={nivel} />;
}
