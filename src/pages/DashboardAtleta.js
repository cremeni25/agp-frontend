import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function DashboardAtleta({ user }) {
  const [dados, setDados] = useState(null);
  const [status, setStatus] = useState("Carregando...");

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const { data } = await supabase
      .from("dados_biologicos_atleta")
      .select("*")
      .eq("atleta_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (data) {
      setDados(data);
      calcularStatus(data);
    }
  }

  function calcularStatus(d) {
    if (d.qualidade_sono >= 7 && d.nivel_fadiga <= 3) {
      setStatus("RECUPERADO");
    } else if (d.qualidade_sono <= 3 || d.nivel_fadiga >= 7) {
      setStatus("RISCO");
    } else {
      setStatus("ATENÇÃO");
    }
  }

  function corStatus() {
    if (status === "RECUPERADO") return "#22c55e";
    if (status === "RISCO") return "#ef4444";
    return "#eab308";
  }

  return (
    <div style={{
      background: "#0f172a",
      color: "white",
      minHeight: "100vh",
      padding: "40px"
    }}>
      <h1>Dashboard do Atleta</h1>

      <div style={{
        marginTop: "30px",
        padding: "30px",
        borderRadius: "12px",
        background: "#1e293b",
        borderLeft: `6px solid ${corStatus()}`
      }}>
        <h2>Status Atual:</h2>
        <h1 style={{ color: corStatus() }}>{status}</h1>

        {dados && (
          <>
            <p>Peso: {dados.peso} kg</p>
            <p>Qualidade do Sono: {dados.qualidade_sono}</p>
            <p>Nível de Fadiga: {dados.nivel_fadiga}</p>
            <p>FC Repouso: {dados.fc_repouso}</p>
          </>
        )}
      </div>
    </div>
  );
}
