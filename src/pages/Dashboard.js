import React from "react";
import { supabase } from "../supabaseClient";
import DailyData from "./DailyData";

export default function Dashboard({ user }) {
  async function logout() {
    await supabase.auth.signOut();
    window.location.reload();
  }

  return (
    <div>
      <DailyData user={user} />

      <button onClick={logout}
        style={{ position: "absolute", top: 20, right: 20 }}>
        Sair
      </button>
    </div>
  );
}
