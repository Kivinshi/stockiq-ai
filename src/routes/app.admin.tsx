import { createFileRoute } from "@tanstack/react-router";
import { AppShell, KpiCard, Card, Badge } from "@/components/app-shell";
import { Boxes, Users2, Building2, ShoppingCart, Bot, ShieldCheck, Activity, TrendingUp } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { salesTrend, categoryShare, aiInsights, users } from "@/lib/mock-data";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — StockIQ" }] }),
  component: AdminDash,
});

const COLORS = ["var(--chart-1)","var(--chart-2)","var(--chart-3)","var(--chart-4)","var(--chart-5)"];

function AdminDash() {
  return (
    <AppShell title="Admin Dashboard" subtitle="Full system overview — businesses, users and AI health">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard label="Total Products" value="1,284" trend="+12 this week" icon={Boxes} accent="primary" />
        <KpiCard label="Active Users" value="48"    trend="6 online now"   icon={Users2} accent="success" />
        <KpiCard label="Branches"      value="7"    hint="3 cities"        icon={Building2} accent="warning" />
        <KpiCard label="Today Sales"   value="₹2.4L" trend="+18% vs yday"  icon={ShoppingCart} accent="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <Card title="Sales Growth" className="lg:col-span-2" action={<Badge tone="primary">Last 9 months</Badge>}>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={salesTrend}>
                <defs>
                  <linearGradient id="adminFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4}/>
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="sales" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#adminFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Category Share">
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoryShare} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={3}>
                  {categoryShare.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 space-y-1 text-xs">
            {categoryShare.map((c, i) => (
              <div key={c.name} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />
                <span className="flex-1">{c.name}</span><span className="font-medium">{c.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="AI Insights" className="lg:col-span-2" action={<Badge tone="primary"><Bot className="h-3 w-3 mr-1 inline" /> Live</Badge>}>
          <div className="space-y-3">
            {aiInsights.map((a, i) => {
              const tone = a.level === "danger" ? "destructive" : a.level === "warning" ? "warning" : a.level === "success" ? "success" : "primary";
              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border bg-background/40 hover-lift">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0"><Bot className="h-4 w-4" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2"><span className="font-medium text-sm">{a.title}</span><Badge tone={tone as any}>{a.level}</Badge></div>
                    <p className="text-xs text-muted-foreground mt-0.5">{a.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        <Card title="System Health">
          <div className="space-y-3">
            <Row icon={Activity} label="API Uptime" value="99.98%" tone="success" />
            <Row icon={Bot} label="AI Engine"    value="Online" tone="success" />
            <Row icon={ShieldCheck} label="Auth Service" value="Healthy" tone="success" />
            <Row icon={TrendingUp} label="Forecast Accuracy" value="92.4%" tone="primary" />
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-xs font-medium mb-2">Recent users</div>
            <div className="space-y-2">
              {users.slice(0,3).map(u => (
                <div key={u.email} className="flex items-center gap-2 text-xs">
                  <div className="h-7 w-7 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center text-[10px] font-semibold">{u.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0"><div className="truncate font-medium">{u.name}</div><div className="text-muted-foreground truncate">{u.role}</div></div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}

function Row({ icon: I, label, value, tone }: { icon: any; label: string; value: string; tone: any }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-lg bg-muted grid place-items-center"><I className="h-4 w-4" /></div>
      <span className="flex-1 text-sm">{label}</span>
      <Badge tone={tone}>{value}</Badge>
    </div>
  );
}
