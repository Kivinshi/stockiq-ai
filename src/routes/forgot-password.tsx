import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { AuthShell } from "@/components/auth-shell";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — StockIQ" }] }),
  component: Forgot,
});

function Forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); toast.success("Reset link sent — check your email"); }, 800);
  }

  return (
    <AuthShell
      title={sent ? "Check your inbox" : "Forgot your password?"}
      subtitle={sent ? "We've sent a reset link to your email." : "Enter your email and we'll send you a reset link."}
      footer={<>Remembered it? <Link to="/login" className="text-primary font-medium hover:underline">Back to log in</Link></>}
    >
      {sent ? (
        <div className="rounded-xl border border-success/30 bg-success/5 p-6 text-center animate-scale-in">
          <CheckCircle2 className="h-10 w-10 text-success mx-auto" />
          <p className="mt-3 text-sm">Sent to <span className="font-medium">{email}</span></p>
          <button onClick={() => setSent(false)} className="mt-4 text-sm text-primary hover:underline">Send again</button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1.5">Email</label>
            <div className="flex items-center gap-2 h-11 px-3 rounded-lg border border-input bg-background focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-transparent outline-none text-sm" placeholder="you@company.com" />
            </div>
          </div>
          <button disabled={loading} className="w-full h-11 rounded-lg bg-gradient-primary text-primary-foreground font-medium shadow-elegant hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />} Send reset link
          </button>
        </form>
      )}
    </AuthShell>
  );
}
