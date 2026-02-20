import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";

function App() {
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

  if (loading) return <div style={{ padding: 40 }}>Carregando...</div>;

  return (

        {/* SEM LOGIN */}
        {!user && (
          <Route path="*" element={<Navigate to="/" />} />
        )}

        {/* COM LOGIN MAS SEM PERFIL */}
        {user && !perfil && (
          <>
            <Route path="/" element={<ProfileSetup user={user} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}

        {/* COM PERFIL */}
        {user && perfil && (
          <>
            <Route path="/" element={<Dashboard user={user} perfil={perfil} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
  );
}

export default App;