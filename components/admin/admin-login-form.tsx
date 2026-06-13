"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm({
  labels,
}: {
  labels: {
    email: string;
    password: string;
    login: string;
    loggingIn: string;
  };
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="email"
        required
        placeholder={labels.email}
        className="w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
      />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="password"
        required
        placeholder={labels.password}
        className="w-full rounded-md border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-300"
      />
      {error && <p className="text-sm text-red-300">{error}</p>}
      <Button disabled={loading} className="w-full bg-cyan-400 text-slate-950 hover:bg-cyan-300">
        {loading ? labels.loggingIn : labels.login}
      </Button>
    </form>
  );
}
