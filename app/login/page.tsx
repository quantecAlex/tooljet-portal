// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const r = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (r.ok) {
      router.push("/app");
    } else {
      setErr("Login failed. Check email and password.");
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: "10vh auto", fontFamily: "system-ui" }}>
      <h1>Sign in</h1>
      <form onSubmit={onSubmit}>
        <label>
          Email<br/>
          <input value={email} onChange={e => setEmail(e.target.value)} required style={{ width: "100%" }}/>
        </label>
        <br/><br/>
        <label>
          Password<br/>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: "100%" }}/>
        </label>
        <br/><br/>
        <button type="submit">Sign in</button>
      </form>
      {err && <p style={{ color: "crimson" }}>{err}</p>}
    </main>
  );
}
