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
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setUser(null);
        setLoading(false);
        return;
      }

      const currentUser = session.user;
      setUser(currentUser);

      const { data: perfilData, error } = await supabase
        .from("perfis_atletas")
        .select("*")
        .eq("auth_id", currentUser.id)
        .single();

      if (!error) {
        setPerfil(perfilData);
      }

      setLoading(false);
    }

    iniciar();

    // 🔑 ESCUTA LOGIN / LOGOUT EM TEMPO REAL
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setUser(session.user);

          const { data: perfilData } = await supabase
            .from("perfis_atletas")
            .select("*")
            .eq("auth_id", session.user.id)
            .single();

          setPerfil(perfilData);
        } else {
          setUser(null);
          setPerfil(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <div>Carregando...</div>;

  // 👉 NÃO LOGADO → LOGIN
  if (!user) {
    return <Login />;
  }

  // 👉 LOGADO SEM PERFIL → CADASTRO
  if (!perfil) {
    return <ProfileSetup user={user} />;
  }

  // 👉 PERFIL OK → DASHBOARD
  return <Dashboard user={user} perfil={perfil} />;
}
