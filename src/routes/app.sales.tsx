import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, KpiCard, Badge } from "@/components/app-shell";
import { ShoppingCart, DollarSign, Clock, Plus } from "lucide-react";
import { orders, salesTrend } from "@/lib/mock-data";
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/app/sales")({
  head: () => ({ meta: [{ title: "Sales — StockIQ" }] }),
  component: Sales,
});

function Sales() {
  const paid = orders.filter(o => o.status==="paid").reduce((s,o)=>s+o.total,0);
  const pending = orders.filter(o => o.status==="pending").length;
  return (
    <AppShell title="Sales Orders" subtitle="Track orders, invoices and revenue">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <KpiCard label="Orders Today" value={String(orders.length)} icon={ShoppingCart} accent="primary" />
        <KpiCard label="Revenue (paid)" value={`₹${paid.toLocaleString()}`} trend="+12%" icon={DollarSign} accent="success" />
        <KpiCard label="Pending" value={String(pending)} hint="awaiting payment" icon={Clock} accent="warning" />
      </div>

      <Card title="Revenue trend" className="mb-6">
        <div className="h-60">
          <ResponsiveContainer>
            <AreaChart data={salesTrend}>
              <defs><linearGradient id="salesG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4}/><stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="sales" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#salesG)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Recent orders" action={
        <button onClick={()=>toast.success("New order form opened")} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium shadow-elegant hover:opacity-90 transition">
          <Plus className="h-4 w-4" /> New order
        </button>
      }>
        <div className="overflow-x-auto -mx-5 -mb-5">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
              {["Order","Customer","Total","Status","Date"].map(h => <th key={h} className="px-5 pb-2 font-medium">{h}</th>)}
            </tr></thead>
            <tbody className="[&_td]:px-5 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-border last:[&_tr]:border-0">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-muted/40 transition">
                  <td className="font-medium">{o.id}</td><td>{o.customer}</td><td>₹{o.total.toLocaleString()}</td>
                  <td><Badge tone={o.status==="paid"?"success":o.status==="pending"?"warning":"destructive"}>{o.status}</Badge></td>
                  <td className="text-muted-foreground">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
