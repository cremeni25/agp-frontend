import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function login(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }
    });

    if (error) setMsg(error.message);
    else setMsg("Verifique seu email para acessar.");
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f172a",
      color: "white"
    }}>
      <form onSubmit={login} style={{ width: 320 }}>
        <h2>Login AGP</h2>

        <input
          placeholder="Seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <button type="submit" style={{ width: "100%" }}>
          Entrar
        </button>

        <p>{msg}</p>
      </form>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    const { data } = await supabase.auth.getSession();
    const currentUser = data.session?.user;

    if (!currentUser) {
      setUser(null);
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

  useEffect(() => {
    carregar();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      carregar();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />

        {/* PERFIL */}
        <Route
          path="/perfil"
          element={
            user ? (
              perfil ? <Navigate to="/" /> : <ProfileSetup user={user} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* DASHBOARD */}
        <Route
          path="/"
          element={
            user ? (
              perfil ? <Dashboard user={user} perfil={perfil} /> : <Navigate to="/perfil" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
