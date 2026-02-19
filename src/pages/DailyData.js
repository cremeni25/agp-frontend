import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function DailyData({ user }) {
  const [peso, setPeso] = useState("");
  const [sono, setSono] = useState("");
  const [fadiga, setFadiga] = useState("");
  const [fc, setFc] = useState("");
  const [msg, setMsg] = useState("");

  async function salvar(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("dados_biologicos")
      .insert([
        {
          atleta_id: user.id,
          peso,
          qualidade_sono: sono,
          nivel_fadiga: fadiga,
          fc_repouso: fc
        }
      ]);

    if (error) setMsg(error.message);
    else setMsg("Dados salvos com sucesso!");
  }

  return (
    <div style={{
      background: "#0f172a",
      color: "white",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <form onSubmit={salvar} style={{ width: 320 }}>
        <h2>Registrar Dados do Dia</h2>

        <input type="number" placeholder="Peso"
          value={peso}
          onChange={e => setPeso(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }} />

        <input type="number" placeholder="Qualidade do Sono (0-10)"
          value={sono}
          onChange={e => setSono(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }} />

        <input type="number" placeholder="Nível de Fadiga (0-10)"
          value={fadiga}
          onChange={e => setFadiga(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }} />

        <input type="number" placeholder="FC Repouso"
          value={fc}
          onChange={e => setFc(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }} />

        <button type="submit" style={{ width: "100%" }}>
          Salvar Dados
        </button>

        <p>{msg}</p>
      </form>
    </div>
  );
}
