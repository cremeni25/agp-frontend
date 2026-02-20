import React from "react";
import { supabase } from "../supabaseClient";

export default function DashboardGestor({ user, perfil }) {

  async function sair() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <div style={{
      padding: 40,
      fontFamily: "Arial",
      background: "#0f172a",
      minHeight: "100vh",
      color: "white"
    }}>
      <h1>AGP Sports Intelligence</h1>

      <h2 style={{ marginTop: 30 }}>
        Painel do Gestor
      </h2>

      <div style={{
        marginTop: 30,
        background: "#1e293b",
        padding: 20,
        borderRadius: 8,
        maxWidth: 500
      }}>
        <p><b>Nome:</b> {perfil.nome}</p>
        <p><b>Função:</b> {perfil.funcao}</p>
        <p><b>Clube:</b> {perfil.clube}</p>
        <p><b>Esporte:</b> {perfil.esporte}</p>
        <p><b>Nível:</b> {perfil.nivel}</p>
      </div>

      <button
        onClick={sair}
        style={{
          marginTop: 30,
          padding: 10,
          background: "#ef4444",
          border: "none",
          color: "white",
          cursor: "pointer",
          borderRadius: 5
        }}
      >
        Sair
      </button>

      <p style={{ marginTop: 80, opacity: 0.5 }}>
        agp by cremeni — todos os direitos reservados
      </p>
    </div>
  );
}
