import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "signup";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = isSignup
      ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } })
      : await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (!data.session) {
      toast.success("請到信箱確認帳號 Check your email to confirm.");
      return;
    }
    navigate({ to: "/app", replace: true });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <div className="relative w-full max-w-sm">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border bg-card p-6 shadow-glow">
          <h1 className="text-xl font-semibold">{isSignup ? "建立帳號 Sign up" : "登入 Sign in"}</h1>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6} autoComplete={isSignup ? "new-password" : "current-password"} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "..." : isSignup ? "Sign up / 註冊" : "Sign in / 登入"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {isSignup ? (
              <>已有帳號？ <Link to="/auth" className="text-primary-glow hover:underline">Sign in</Link></>
            ) : (
              <>還沒有帳號？ <Link to="/signup" className="text-primary-glow hover:underline">Sign up</Link></>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
