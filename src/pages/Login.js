import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  async function fazerLogin(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    setLoading(false);

    if (error) {
      setErro("Email ou senha inválidos.");
    } else {
      window.location.reload();
    }
  }

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={fazerLogin}>
        <h2 style={styles.titulo}>AGP Sports Intelligence</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button style={styles.botao} disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {erro && <p style={styles.erro}>{erro}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    background: "#0b1d3a",
  },
  card: {
    background: "#132a4a",
    padding: 40,
    borderRadius: 12,
    width: 320,
    textAlign: "center",
  },
  titulo: {
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 6,
    border: "none",
  },
  botao: {
    width: "100%",
    padding: 12,
    background: "#ff4d4d",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
    borderRadius: 6,
    cursor: "pointer",
  },
  erro: {
    color: "#ff8080",
    marginTop: 15,
  },
};
