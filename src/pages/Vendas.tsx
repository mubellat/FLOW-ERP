import { useState } from "react";
import { Eye, Trash2, X } from "lucide-react";

interface Venda {
  numero: string;
  data: string;
  cliente: string;
  itens: number;
  total: number;
  pagamento: string;
  status: string;
  operador: string;
}

const vendasMock: Venda[] = [
  { numero: "000001", data: "2026-05-01", cliente: "Consumidor Final", itens: 3, total: 87.50, pagamento: "PIX", status: "Concluída", operador: "admin" },
  { numero: "000002", data: "2026-05-02", cliente: "João Silva", itens: 5, total: 245.90, pagamento: "Cartão Crédito", status: "Concluída", operador: "admin" },
  { numero: "000003", data: "2026-05-03", cliente: "Maria Souza", itens: 2, total: 32.00, pagamento: "Dinheiro", status: "Cancelada", operador: "operador1" },
  { numero: "000004", data: "2026-05-04", cliente: "Consumidor Final", itens: 1, total: 12.99, pagamento: "Cartão Débito", status: "Concluída", operador: "operador1" },
];

const Vendas = () => {
  const [search, setSearch] = useState("");
  const [dataIni, setDataIni] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [items, setItems] = useState<Venda[]>(vendasMock);
  const [view, setView] = useState<Venda | null>(null);

  const filtered = items.filter((v) => {
    if (search && !(v.numero.includes(search) || v.cliente.toLowerCase().includes(search.toLowerCase()))) return false;
    if (statusFilter !== "Todos" && v.status !== statusFilter) return false;
    if (dataIni && v.data < dataIni) return false;
    if (dataFim && v.data > dataFim) return false;
    return true;
  });

  const totalVendas = filtered.filter(v => v.status === "Concluída").reduce((s, v) => s + v.total, 0);

  const handleCancelar = (i: number) => {
    if (confirm("Cancelar esta venda?")) setItems((p) => p.map((v, idx) => idx === i ? { ...v, status: "Cancelada" } : v));
  };

  return (
    <div>
      <fieldset className="fieldset-retro">
        <legend>Módulo Vendas — Consultar Vendas</legend>

        <div className="grid grid-cols-5 gap-2 mb-3 items-end">
          <div>
            <label className="text-[12px] font-medium">Buscar</label>
            <input type="text" className="input-retro w-full" placeholder="Nº ou cliente..."
              value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div>
            <label className="text-[12px] font-medium">Data Inicial</label>
            <input type="date" className="input-retro w-full" value={dataIni}
              onChange={(e) => setDataIni(e.target.value)} />
          </div>
          <div>
            <label className="text-[12px] font-medium">Data Final</label>
            <input type="date" className="input-retro w-full" value={dataFim}
              onChange={(e) => setDataFim(e.target.value)} />
          </div>
          <div>
            <label className="text-[12px] font-medium">Status</label>
            <select className="input-retro w-full" value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}>
              {["Todos", "Concluída", "Cancelada"].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <button className="btn-retro btn-retro-primary">Filtrar</button>
        </div>

        <div className="border-2 border-border">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Nº Venda</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Data</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Cliente</th>
                <th className="text-center p-1 px-2 border-r border-primary-foreground/30">Itens</th>
                <th className="text-right p-1 px-2 border-r border-primary-foreground/30">Total</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Pagamento</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Operador</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Status</th>
                <th className="text-center p-1 px-2 w-[100px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="text-center p-8 text-muted-foreground">Nenhuma venda encontrada.</td></tr>
              ) : filtered.map((v, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-secondary/30"}>
                  <td className="p-1 px-2">{v.numero}</td>
                  <td className="p-1 px-2">{v.data}</td>
                  <td className="p-1 px-2">{v.cliente}</td>
                  <td className="p-1 px-2 text-center">{v.itens}</td>
                  <td className="p-1 px-2 text-right">R$ {v.total.toFixed(2)}</td>
                  <td className="p-1 px-2">{v.pagamento}</td>
                  <td className="p-1 px-2">{v.operador}</td>
                  <td className="p-1 px-2">
                    <span className={`px-2 py-0.5 text-[11px] rounded ${
                      v.status === "Concluída" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                    }`}>{v.status}</span>
                  </td>
                  <td className="p-1 px-2 text-center">
                    <button className="btn-retro text-[11px] px-1 mr-1" title="Detalhes" onClick={() => setView(v)}><Eye size={12} /></button>
                    {v.status === "Concluída" && (
                      <button className="btn-retro text-[11px] px-1" title="Cancelar" onClick={() => handleCancelar(items.indexOf(v))}><Trash2 size={12} /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-2 text-[12px]">
          <span className="text-muted-foreground">Vendas: {filtered.length}</span>
          <span className="font-bold">Total Concluídas: R$ {totalVendas.toFixed(2)}</span>
        </div>
      </fieldset>

      {view && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="window-frame w-[500px]">
            <div className="window-titlebar flex justify-between">
              <span>Detalhes da Venda — {view.numero}</span>
              <button onClick={() => setView(null)}><X size={14} /></button>
            </div>
            <div className="p-4 space-y-2 text-[13px]">
              <div><strong>Data:</strong> {view.data}</div>
              <div><strong>Cliente:</strong> {view.cliente}</div>
              <div><strong>Operador:</strong> {view.operador}</div>
              <div><strong>Itens:</strong> {view.itens}</div>
              <div><strong>Pagamento:</strong> {view.pagamento}</div>
              <div><strong>Status:</strong> {view.status}</div>
              <div className="text-lg font-bold pt-2 border-t-2 border-border">Total: R$ {view.total.toFixed(2)}</div>
              <div className="flex justify-end gap-2 pt-3">
                <button className="btn-retro">🖨 Imprimir Cupom</button>
                <button className="btn-retro btn-retro-primary" onClick={() => setView(null)}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendas;
