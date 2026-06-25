import { createFileRoute } from "@tanstack/react-router";
import { AppShell, KpiCard, Card, Badge } from "@/components/app-shell";
import { TrendingUp, DollarSign, AlertTriangle, Package2, Bot } from "lucide-react";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { salesTrend, suppliers, products, aiInsights } from "@/lib/mock-data";

export const Route = createFileRoute("/app/manager")({
  head: () => ({ meta: [{ title: "Manager Dashboard — StockIQ" }] }),
  component: ManagerDash,
});

function ManagerDash() {
  const low = products.filter(p => p.status !== "in");
  return (
    <AppShell title="Manager Dashboard" subtitle="Business performance, forecasts and supplier health">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Monthly Revenue" value="₹78.4k" trend="+18% MoM" icon={DollarSign} accent="success" />
        <KpiCard label="Stock Value"     value="₹4.2M"  hint="across branches" icon={Package2} accent="primary" />
        <KpiCard label="Low Stock"       value={String(low.length)} hint="needs reorder" icon={AlertTriangle} accent="warning" />
        <KpiCard label="Forecast Accuracy" value="92.4%" trend="+2.1 pts" icon={TrendingUp} accent="primary" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Card title="Sales vs AI Forecast" className="lg:col-span-2">
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={salesTrend}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="sales" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="forecast" stroke="var(--chart-2)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="AI Reorder Suggestions" action={<Badge tone="primary"><Bot className="h-3 w-3 mr-1 inline" /> AI</Badge>}>
          <div className="space-y-3">
            {low.slice(0,4).map(p => (
              <div key={p.id} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40">
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.id} · stock {p.stock}</div>
                </div>
                <Badge tone={p.status==="out"?"destructive":"warning"}>+{Math.max(50, p.min*2)}u</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Supplier Performance">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={suppliers} layout="vertical">
                <CartesianGrid stroke="var(--border)" horizontal={false} strokeDasharray="3 3" />
                <XAxis type="number" domain={[0,100]} stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" stroke="var(--muted-foreground)" fontSize={11} width={120} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Bar dataKey="score" radius={[0,8,8,0]} fill="var(--chart-1)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="AI Business Insights">
          <div className="space-y-3">
            {aiInsights.map((a, i) => {
              const tone = a.level === "danger" ? "destructive" : a.level === "warning" ? "warning" : a.level === "success" ? "success" : "primary";
              return (
                <div key={i} className="p-3 rounded-xl border border-border bg-background/40">
                  <div className="flex items-center gap-2"><Badge tone={tone as any}>{a.level}</Badge><span className="font-medium text-sm">{a.title}</span></div>
                  <p className="text-xs text-muted-foreground mt-1">{a.body}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
