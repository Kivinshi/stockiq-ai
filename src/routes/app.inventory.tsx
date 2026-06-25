import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, KpiCard, Badge } from "@/components/app-shell";
import { Boxes, AlertTriangle, PackagePlus, Warehouse } from "lucide-react";
import { products, stockUsage } from "@/lib/mock-data";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/app/inventory")({
  head: () => ({ meta: [{ title: "Inventory — StockIQ" }] }),
  component: Inventory,
});

function Inventory() {
  const total = products.reduce((s, p) => s + p.stock, 0);
  const value = products.reduce((s, p) => s + p.stock * p.price, 0);
  const low = products.filter(p => p.status !== "in").length;
  return (
    <AppShell title="Inventory" subtitle="Real-time stock across all branches">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Total Units" value={total.toLocaleString()} icon={Boxes} accent="primary" />
        <KpiCard label="Inventory Value" value={`₹${(value/100000).toFixed(1)}L`} icon={Warehouse} accent="success" />
        <KpiCard label="Low / Out" value={String(low)} hint="needs attention" icon={AlertTriangle} accent="warning" />
        <KpiCard label="Movements (7d)" value="1.2k" trend="+8%" icon={PackagePlus} accent="primary" />
      </div>

      <Card title="Stock movement — last 7 days" className="mb-6">
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={stockUsage}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="in" fill="var(--chart-2)" radius={[6,6,0,0]} />
              <Bar dataKey="out" fill="var(--chart-1)" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Low stock items">
        <div className="space-y-2">
          {products.filter(p => p.status!=="in").map(p => {
            const pct = Math.min(100, Math.round((p.stock / p.min) * 100));
            return (
              <div key={p.id} className="p-3 rounded-xl border border-border bg-background/50">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.id} · min {p.min}</div>
                  </div>
                  <Badge tone={p.status==="out"?"destructive":"warning"}>{p.stock} units</Badge>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${p.status==="out"?"bg-destructive":"bg-warning"} transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </AppShell>
  );
}
