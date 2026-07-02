import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge } from "@/components/app-shell";
import { Bell, AlertTriangle, CheckCircle2, Bot } from "lucide-react";

export const Route = createFileRoute("/app/notifications")({
  head: () => ({ meta: [{ title: "Notifications — StockIQ" }] }),
  component: Notifications,
});

const NOTIFS = [
  { icon: AlertTriangle, tone: "warning",     title: "Low stock alert",      body: "Mechanical Keyboard (SKU-1002) below minimum threshold",                  time: "5m ago" },
  { icon: Bot,           tone: "primary",     title: "AI reorder suggested", body: "Order 120 units of Wireless Mouse Pro before Jun 30",                     time: "1h ago" },
  { icon: CheckCircle2,  tone: "success",     title: "Order delivered",      body: "ORD-9821 delivered to Acme Corp (₹12,450)",                               time: "3h ago" },
  { icon: AlertTriangle, tone: "destructive", title: "Supplier delay",       body: "Forge & Fern Co. has 5 days avg delay this month",                        time: "Yesterday" },
  { icon: Bell,          tone: "muted",       title: "Weekly report ready",  body: "Your weekly performance digest is now available",                         time: "2 days ago" },
];

function Notifications() {
  return (
    <AppShell title="Notifications" subtitle="Alerts, AI suggestions and system updates">
      <Card>
        <ul className="divide-y divide-border -my-3">
          {NOTIFS.map((n, i) => (
            <li key={i} className="py-4 flex gap-4 hover:bg-muted/30 -mx-5 px-5 transition">
              <div className="h-10 w-10 rounded-xl bg-muted grid place-items-center shrink-0"><n.icon className="h-5 w-5" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2"><span className="font-medium">{n.title}</span><Badge tone={n.tone as any}>{n.tone}</Badge></div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.body}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
            </li>
          ))}
        </ul>
      </Card>
    </AppShell>
  );
}
