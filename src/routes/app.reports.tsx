import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, KpiCard } from "@/components/app-shell";
import { FileBarChart2, FileSpreadsheet, FileText, Download } from "lucide-react";
import { salesTrend } from "@/lib/mock-data";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/app/reports")({
  head: () => ({ meta: [{ title: "Reports — StockIQ" }] }),
  component: Reports,
});

const REPORTS = [
  { name: "Sales Summary", desc: "Detailed sales breakdown by day, product and branch", icon: FileBarChart2 },
  { name: "Profit & Loss", desc: "Quarterly P&L statement", icon: FileText },
  { name: "GST Report",    desc: "Tax filing-ready GST summary", icon: FileSpreadsheet },
  { name: "Inventory Valuation", desc: "Stock-on-hand × cost across branches", icon: FileSpreadsheet },
];

function Reports() {
  return (
    <AppShell title="Reports" subtitle="Generate, export and analyze business reports">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <KpiCard label="Total Revenue" value="₹5.32M" trend="+12% YoY" icon={FileBarChart2} accent="success" />
        <KpiCard label="Total Expense" value="₹3.30M" hint="62% of revenue" icon={FileText} accent="warning" />
        <KpiCard label="Net Profit" value="₹2.02M" trend="+18%" icon={FileSpreadsheet} accent="primary" />
      </div>

      <Card title="Revenue trend" className="mb-6">
        <div className="h-60">
          <ResponsiveContainer>
            <LineChart data={salesTrend}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="sales" stroke="var(--chart-1)" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Available reports">
        <div className="grid sm:grid-cols-2 gap-3">
          {REPORTS.map(r => (
            <div key={r.name} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background hover-lift">
              <div className="h-11 w-11 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center"><r.icon className="h-5 w-5" /></div>
              <div className="flex-1 min-w-0">
                <div className="font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground truncate">{r.desc}</div>
              </div>
              <button onClick={() => toast.success(`${r.name} exported`)} className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border hover:bg-accent text-sm transition">
                <Download className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </AppShell>
  );
}
