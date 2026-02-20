import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");

  async function entrar(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) setMsg(error.message);
  }

  async function resetarSenha() {
    if (!email) {
      setMsg("Digite seu email primeiro.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });

    if (error) setMsg(error.message);
    else setMsg("Email de recuperação enviado.");
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0f172a",
      color: "white",
      fontFamily: "Arial"
    }}>
      <form onSubmit={entrar} style={{ width: 320 }}>
        <h2>AGP Sports Intelligence</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <button style={{ width: "100%" }}>Entrar</button>

        <p
          onClick={resetarSenha}
          style={{
            cursor: "pointer",
            marginTop: 12,
            color: "#38bdf8"
          }}
        >
          Esqueci minha senha
        </p>

        <p style={{ marginTop: 12 }}>{msg}</p>
      </form>
    </div>
  );
}
