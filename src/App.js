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
        setLoading(false);
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

  if (loading) {
    return (
      <div style={{ padding: 40, fontFamily: "Arial" }}>
        Carregando sistema AGP...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ padding: 40, fontFamily: "Arial" }}>
        Usuário não autenticado.
      </div>
    );
  }

  if (!perfil) {
    return <ProfileSetup user={user} />;
  }

  return <Dashboard user={user} perfil={perfil} />;
}