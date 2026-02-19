import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPerfil();
  }, []);

  async function carregarPerfil() {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session) return;

    const userId = session.user.id;

    const { data } = await supabase
      .from("perfis_atletas")
      .select("*")
      .eq("auth_id", userId)
      .single();

    setPerfil(data);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  if (loading) {
    return (
      <div style={{
        background: "#0f172a",
        color: "white",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        Carregando dados do usuário...
      </div>
    );
  }

  return (
    <div style={{
      background: "#0f172a",
      color: "white",
      minHeight: "100vh",
      padding: "40px"
    }}>
      <h1>Dashboard</h1>

      <div style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
        marginTop: "20px",
        maxWidth: "500px"
      }}>
        <h2>Dados do Usuário</h2>

        <p><strong>Nome:</strong> {perfil.nome}</p>
        <p><strong>Função:</strong> {perfil.funcao}</p>
        <p><strong>Clube:</strong> {perfil.clube}</p>
        <p><strong>Esporte:</strong> {perfil.esporte}</p>
        <p><strong>Idade:</strong> {perfil.idade}</p>
      </div>

      <button
        onClick={logout}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          background: "#ef4444",
          border: "none",
          color: "white",
          cursor: "pointer",
          borderRadius: "6px"
        }}
      >
        Sair
      </button>
    </div>
  );
}
