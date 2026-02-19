import React, { useState } from "react";
import { supabase } from "../supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login realizado com sucesso!");
    }
  }

  async function handleRegister() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Usuário criado! Verifique seu email.");
    }
  }

  async function resetPassword() {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Email de recuperação enviado.");
    }
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
      <form onSubmit={handleLogin} style={{ width: 300 }}>
        <h2>AGP Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: 10 }}
        />

        <button type="submit" style={{ width: "100%" }}>
          Entrar
        </button>

        <button type="button" onClick={handleRegister} style={{ width: "100%", marginTop: 10 }}>
          Criar Conta
        </button>

        <button type="button" onClick={resetPassword} style={{ width: "100%", marginTop: 10 }}>
          Esqueci Senha
        </button>

        <p>{message}</p>
      </form>
    </div>
  );
}
