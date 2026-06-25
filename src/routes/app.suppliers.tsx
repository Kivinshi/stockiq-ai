import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge } from "@/components/app-shell";
import { suppliers } from "@/lib/mock-data";
import { Plus, Truck } from "lucide-react";

export const Route = createFileRoute("/app/suppliers")({
  head: () => ({ meta: [{ title: "Suppliers — StockIQ" }] }),
  component: Suppliers,
});

function Suppliers() {
  return (
    <AppShell title="Suppliers" subtitle="Manage and compare your supplier network">
      <Card action={<button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium shadow-elegant hover:opacity-90 transition"><Plus className="h-4 w-4" /> Add supplier</button>}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suppliers.map(s => (
            <div key={s.id} className="p-5 rounded-xl border border-border bg-background hover-lift">
              <div className="flex items-start justify-between">
                <div className="h-11 w-11 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center"><Truck className="h-5 w-5" /></div>
                <Badge tone={s.status==="active"?"success":"warning"}>{s.status}</Badge>
              </div>
              <div className="mt-4 font-semibold">{s.name}</div>
              <div className="text-xs text-muted-foreground">{s.id} · {s.products} products</div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1.5"><span>Performance</span><span className="font-medium">{s.score}/100</span></div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full transition-all ${s.score>=85?"bg-success":s.score>=70?"bg-warning":"bg-destructive"}`} style={{ width: `${s.score}%` }} />
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">Avg delivery delay: <span className="font-medium text-foreground">{s.delay}</span></div>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
