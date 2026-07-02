import { createFileRoute } from "@tanstack/react-router";
import { AppShell, KpiCard, Card, Badge } from "@/components/app-shell";
import { PackagePlus, PackageMinus, ShoppingCart, ListChecks, Check, Plus, Minus } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { stockUsage, tasks, orders } from "@/lib/mock-data";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/staff")({
  head: () => ({ meta: [{ title: "Staff Dashboard — StockIQ" }] }),
  component: StaffDash,
});

function StaffDash() {
  const [list, setList] = useState(tasks);
  function toggle(id: number) {
    setList(l => l.map(t => t.id===id ? { ...t, done: !t.done } : t));
    toast.success("Task updated");
  }

  return (
    <AppShell title="Staff Dashboard" subtitle="Today's operations — stock movements and orders">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Today Tasks" value={`${list.filter(t=>!t.done).length}/${list.length}`} hint="pending" icon={ListChecks} accent="primary" />
        <KpiCard label="Stock In"    value="175u" trend="+12 vs yday" icon={PackagePlus} accent="success" />
        <KpiCard label="Stock Out"   value="160u" hint="dispatched"   icon={PackageMinus} accent="warning" />
        <KpiCard label="Open Orders" value="5"    hint="to fulfill"   icon={ShoppingCart} accent="primary" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Card title="Stock In / Out — this week" className="lg:col-span-2">
          <div className="h-60">
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
        <Card title="Today's Tasks">
          <ul className="space-y-2">
            {list.map(t => (
              <li key={t.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/40 transition">
                <button onClick={() => toggle(t.id)} className={`h-5 w-5 rounded-md border-2 grid place-items-center transition ${t.done?"bg-success border-success text-success-foreground":"border-border"}`}>
                  {t.done && <Check className="h-3 w-3" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm ${t.done?"line-through text-muted-foreground":""}`}>{t.title}</div>
                  <div className="text-xs text-muted-foreground">{t.due}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Quick Actions">
        <div className="grid sm:grid-cols-3 gap-3">
          <QA icon={Plus}  label="Stock In"     desc="Record incoming inventory" onClick={()=>toast.success("Stock-in form opened")} />
          <QA icon={Minus} label="Stock Out"    desc="Log outbound dispatch"     onClick={()=>toast.success("Stock-out form opened")} />
          <QA icon={ShoppingCart} label="New Sales Order" desc="Create an order" onClick={()=>toast.success("Order form opened")} />
        </div>
      </Card>

      <Card title="My Recent Orders" className="mt-6">
        <Table head={["Order","Customer","Total","Status","Date"]}>
          {orders.slice(0,5).map(o => (
            <tr key={o.id} className="hover:bg-muted/40 transition">
              <td className="py-3 font-medium">{o.id}</td>
              <td>{o.customer}</td>
              <td>₹{o.total.toLocaleString()}</td>
              <td><Badge tone={o.status==="paid"?"success":o.status==="pending"?"warning":"destructive"}>{o.status}</Badge></td>
              <td className="text-muted-foreground">{o.date}</td>
            </tr>
          ))}
        </Table>
      </Card>
    </AppShell>
  );
}

function QA({ icon: I, label, desc, onClick }: { icon: any; label: string; desc: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="text-left p-4 rounded-xl border border-border bg-background hover-lift transition group">
      <div className="h-10 w-10 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center shadow-glow group-hover:scale-110 transition">
        <I className="h-5 w-5" />
      </div>
      <div className="mt-3 font-medium">{label}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </button>
  );
}

export function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto -mx-5 -mb-5">
      <table className="w-full text-sm">
        <thead><tr className="text-left text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
          {head.map(h => <th key={h} className="px-5 pb-2 font-medium">{h}</th>)}
        </tr></thead>
        <tbody className="[&_td]:px-5 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-border last:[&_tr]:border-0">
          {children}
        </tbody>
      </table>
    </div>
  );
}
