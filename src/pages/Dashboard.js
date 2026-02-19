import React from "react";
import { supabase } from "../supabaseClient";

export default function Dashboard({ user }) {
  async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <div style={{
      background: "#0f172a",
      color: "white",
      height: "100vh",
      padding: 40
    }}>
      <h1>Bem-vindo ao AGP</h1>

      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>ID:</strong> {user.id}</p>

      <button onClick={logout} style={{ marginTop: 20 }}>
        Sair
      </button>
    </div>
  );
}
