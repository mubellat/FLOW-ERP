import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface Conta {
  numero: string;
  fornecedor: string;
  descricao: string;
  emissao: string;
  vencimento: string;
  valor: number;
  formaPagamento: string;
  status: string;
}

const formas = ["Boleto", "Dinheiro", "Cartão", "PIX", "Transferência"];
const statusOpts = ["Em aberto", "Pago", "Vencido", "Cancelado"];

const ContasPagar = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Conta[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Conta>({
    numero: "", fornecedor: "", descricao: "",
    emissao: new Date().toISOString().slice(0, 10),
    vencimento: new Date().toISOString().slice(0, 10),
    valor: 0, formaPagamento: "Boleto", status: "Em aberto",
  });

  const handleNovo = () => {
    setForm({
      numero: String(items.length + 1).padStart(6, "0"),
      fornecedor: "", descricao: "",
      emissao: new Date().toISOString().slice(0, 10),
      vencimento: new Date().toISOString().slice(0, 10),
      valor: 0, formaPagamento: "Boleto", status: "Em aberto",
    });
    setEditIndex(null);
    setShowForm(true);
  };

  const handleSalvar = () => {
    if (!form.fornecedor || !form.descricao) return;
    if (editIndex !== null) setItems((p) => p.map((x, i) => i === editIndex ? form : x));
    else setItems((p) => [...p, form]);
    setShowForm(false);
  };

  const handleEditar = (i: number) => { setForm(items[i]); setEditIndex(i); setShowForm(true); };
  const handleExcluir = (i: number) => { if (confirm("Excluir conta?")) setItems((p) => p.filter((_, idx) => idx !== i)); };

  const filtered = items.filter((x) =>
    x.numero.includes(search) || x.fornecedor.toLowerCase().includes(search.toLowerCase()) ||
    x.descricao.toLowerCase().includes(search.toLowerCase())
  );

  const totalAberto = filtered.filter(x => x.status === "Em aberto").reduce((s, x) => s + x.valor, 0);

  return (
    <div>
      <fieldset className="fieldset-retro">
        <legend>Módulo Financeiro — Contas a Pagar</legend>

        <div className="flex items-center gap-2 mb-3">
          <label className="text-[13px] font-medium">Buscar:</label>
          <input type="text" className="input-retro flex-1" placeholder="Nº, fornecedor ou descrição..."
            value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn-retro btn-retro-primary">Buscar</button>
          <button className="btn-retro btn-retro-success" onClick={handleNovo}>+ Nova Conta</button>
        </div>

        <div className="border-2 border-border">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Nº</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Fornecedor</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Descrição</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Vencimento</th>
                <th className="text-right p-1 px-2 border-r border-primary-foreground/30">Valor</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Status</th>
                <th className="text-center p-1 px-2 w-[100px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center p-8 text-muted-foreground">Nenhuma conta encontrada.</td></tr>
              ) : filtered.map((c, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-secondary/30"}>
                  <td className="p-1 px-2">{c.numero}</td>
                  <td className="p-1 px-2">{c.fornecedor}</td>
                  <td className="p-1 px-2">{c.descricao}</td>
                  <td className="p-1 px-2">{c.vencimento}</td>
                  <td className="p-1 px-2 text-right">R$ {c.valor.toFixed(2)}</td>
                  <td className="p-1 px-2">
                    <span className={`px-2 py-0.5 text-[11px] rounded ${
                      c.status === "Pago" ? "bg-green-200 text-green-800" :
                      c.status === "Vencido" ? "bg-red-200 text-red-800" :
                      c.status === "Cancelado" ? "bg-gray-200 text-gray-800" :
                      "bg-yellow-200 text-yellow-800"
                    }`}>{c.status}</span>
                  </td>
                  <td className="p-1 px-2 text-center">
                    <button className="btn-retro text-[11px] px-1 mr-1" onClick={() => handleEditar(i)}><Pencil size={12} /></button>
                    <button className="btn-retro text-[11px] px-1" onClick={() => handleExcluir(i)}><Trash2 size={12} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-2 text-[12px]">
          <span className="text-muted-foreground">Total de registros: {filtered.length}</span>
          <span className="font-bold">Total em aberto: R$ {totalAberto.toFixed(2)}</span>
        </div>
      </fieldset>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="window-frame w-[600px]">
            <div className="window-titlebar">{editIndex !== null ? "Editar Conta a Pagar" : "Nova Conta a Pagar"}</div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[12px] font-medium">Nº</label>
                  <input className="input-retro w-full" value={form.numero} readOnly />
                </div>
                <div>
                  <label className="text-[12px] font-medium">Emissão</label>
                  <input type="date" className="input-retro w-full" value={form.emissao}
                    onChange={(e) => setForm({ ...form, emissao: e.target.value })} />
                </div>
                <div>
                  <label className="text-[12px] font-medium">Vencimento</label>
                  <input type="date" className="input-retro w-full" value={form.vencimento}
                    onChange={(e) => setForm({ ...form, vencimento: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="text-[12px] font-medium">Fornecedor</label>
                <input className="input-retro w-full" value={form.fornecedor}
                  onChange={(e) => setForm({ ...form, fornecedor: e.target.value })} />
              </div>
              <div>
                <label className="text-[12px] font-medium">Descrição</label>
                <input className="input-retro w-full" value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[12px] font-medium">Valor (R$)</label>
                  <input type="number" step="0.01" className="input-retro w-full" value={form.valor}
                    onChange={(e) => setForm({ ...form, valor: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="text-[12px] font-medium">Forma Pagamento</label>
                  <select className="input-retro w-full" value={form.formaPagamento}
                    onChange={(e) => setForm({ ...form, formaPagamento: e.target.value })}>
                    {formas.map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-medium">Status</label>
                  <select className="input-retro w-full" value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    {statusOpts.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button className="btn-retro btn-retro-primary" onClick={handleSalvar}>Salvar</button>
                <button className="btn-retro btn-retro-danger" onClick={() => setShowForm(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContasPagar;
