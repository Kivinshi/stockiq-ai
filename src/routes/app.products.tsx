import { createFileRoute } from "@tanstack/react-router";
import { AppShell, Card, Badge } from "@/components/app-shell";
import { products } from "@/lib/mock-data";
import { Search, Plus, Download } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/app/products")({
  head: () => ({ meta: [{ title: "Products — StockIQ" }] }),
  component: Products,
});

function Products() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  const list = useMemo(() => products.filter(p =>
    (cat==="All" || p.category===cat) && (p.name.toLowerCase().includes(q.toLowerCase()) || p.id.toLowerCase().includes(q.toLowerCase()))
  ), [q, cat]);

  return (
    <AppShell title="Products" subtitle="Manage your master product catalog">
      <Card>
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex items-center gap-2 h-10 px-3 rounded-lg border border-input bg-background flex-1">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products or SKU…" className="w-full bg-transparent outline-none text-sm" />
          </div>
          <select value={cat} onChange={e=>setCat(e.target.value)} className="h-10 px-3 rounded-lg border border-input bg-background text-sm">
            {cats.map(c => <option key={c}>{c}</option>)}
          </select>
          <button className="inline-flex items-center gap-1.5 h-10 px-3 rounded-lg border border-border hover:bg-accent text-sm transition"><Download className="h-4 w-4" /> Export</button>
          <button className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-medium shadow-elegant hover:opacity-90 transition"><Plus className="h-4 w-4" /> Add product</button>
        </div>
        <div className="overflow-x-auto -mx-5 -mb-5">
          <table className="w-full text-sm">
            <thead><tr className="text-left text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
              {["SKU","Product","Category","Stock","Min","Price","Status"].map(h => <th key={h} className="px-5 pb-2 font-medium">{h}</th>)}
            </tr></thead>
            <tbody className="[&_td]:px-5 [&_td]:py-3 [&_tr]:border-b [&_tr]:border-border last:[&_tr]:border-0">
              {list.map(p => (
                <tr key={p.id} className="hover:bg-muted/40 transition">
                  <td className="font-mono text-xs">{p.id}</td>
                  <td className="font-medium">{p.name}</td>
                  <td className="text-muted-foreground">{p.category}</td>
                  <td>{p.stock}</td>
                  <td className="text-muted-foreground">{p.min}</td>
                  <td>₹{p.price.toLocaleString()}</td>
                  <td><Badge tone={p.status==="in"?"success":p.status==="low"?"warning":"destructive"}>
                    {p.status==="in"?"In stock":p.status==="low"?"Low stock":"Out of stock"}
                  </Badge></td>
                </tr>
              ))}
              {list.length===0 && <tr><td colSpan={7} className="text-center text-muted-foreground py-8">No products match.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </AppShell>
  );
}
