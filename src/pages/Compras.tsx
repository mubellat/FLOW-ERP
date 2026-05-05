import { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

interface ItemCompra {
  produto: string;
  quantidade: number;
  precoUnitario: number;
}

interface PedidoCompra {
  numero: string;
  fornecedor: string;
  data: string;
  previsaoEntrega: string;
  status: string;
  observacao: string;
  itens: ItemCompra[];
}

const statusOptions = ["Aberto", "Aprovado", "Recebido", "Cancelado"];

const Compras = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<PedidoCompra[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<PedidoCompra>({
    numero: "", fornecedor: "",
    data: new Date().toISOString().slice(0, 10),
    previsaoEntrega: new Date().toISOString().slice(0, 10),
    status: "Aberto", observacao: "", itens: [],
  });
  const [itemForm, setItemForm] = useState<ItemCompra>({ produto: "", quantidade: 1, precoUnitario: 0 });

  const handleNovo = () => {
    setForm({
      numero: String(items.length + 1).padStart(6, "0"),
      fornecedor: "",
      data: new Date().toISOString().slice(0, 10),
      previsaoEntrega: new Date().toISOString().slice(0, 10),
      status: "Aberto", observacao: "", itens: [],
    });
    setEditIndex(null);
    setShowForm(true);
  };

  const handleSalvar = () => {
    if (!form.fornecedor) return;
    if (editIndex !== null) setItems((p) => p.map((x, i) => i === editIndex ? form : x));
    else setItems((p) => [...p, form]);
    setShowForm(false);
  };

  const handleEditar = (i: number) => { setForm(items[i]); setEditIndex(i); setShowForm(true); };
  const handleExcluir = (i: number) => { if (confirm("Excluir pedido?")) setItems((p) => p.filter((_, idx) => idx !== i)); };

  const addItem = () => {
    if (!itemForm.produto) return;
    setForm((p) => ({ ...p, itens: [...p.itens, { ...itemForm }] }));
    setItemForm({ produto: "", quantidade: 1, precoUnitario: 0 });
  };
  const removeItem = (i: number) => setForm((p) => ({ ...p, itens: p.itens.filter((_, idx) => idx !== i) }));

  const total = (its: ItemCompra[]) => its.reduce((s, x) => s + x.quantidade * x.precoUnitario, 0);

  const filtered = items.filter((x) =>
    x.numero.includes(search) || x.fornecedor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <fieldset className="fieldset-retro">
        <legend>Módulo Compras — Pedidos de Compra</legend>

        <div className="flex items-center gap-2 mb-3">
          <label className="text-[13px] font-medium">Buscar:</label>
          <input type="text" className="input-retro flex-1" placeholder="Nº ou fornecedor..."
            value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn-retro btn-retro-primary">Buscar</button>
          <button className="btn-retro btn-retro-success" onClick={handleNovo}>+ Novo Pedido</button>
        </div>

        <div className="border-2 border-border">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Nº Pedido</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Fornecedor</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Data</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Previsão</th>
                <th className="text-right p-1 px-2 border-r border-primary-foreground/30">Valor Total</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Status</th>
                <th className="text-center p-1 px-2 w-[100px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center p-8 text-muted-foreground">Nenhum pedido encontrado.</td></tr>
              ) : filtered.map((p, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-secondary/30"}>
                  <td className="p-1 px-2">{p.numero}</td>
                  <td className="p-1 px-2">{p.fornecedor}</td>
                  <td className="p-1 px-2">{p.data}</td>
                  <td className="p-1 px-2">{p.previsaoEntrega}</td>
                  <td className="p-1 px-2 text-right">R$ {total(p.itens).toFixed(2)}</td>
                  <td className="p-1 px-2">
                    <span className={`px-2 py-0.5 text-[11px] rounded ${
                      p.status === "Recebido" ? "bg-green-200 text-green-800" :
                      p.status === "Cancelado" ? "bg-red-200 text-red-800" :
                      p.status === "Aprovado" ? "bg-blue-200 text-blue-800" :
                      "bg-yellow-200 text-yellow-800"
                    }`}>{p.status}</span>
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

        <div className="mt-2 text-[12px] text-muted-foreground">Total de registros: {filtered.length}</div>
      </fieldset>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="window-frame w-[700px] max-h-[90vh] overflow-y-auto">
            <div className="window-titlebar">{editIndex !== null ? "Editar Pedido de Compra" : "Novo Pedido de Compra"}</div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="text-[12px] font-medium">Nº</label>
                  <input className="input-retro w-full" value={form.numero} readOnly />
                </div>
                <div>
                  <label className="text-[12px] font-medium">Data</label>
                  <input type="date" className="input-retro w-full" value={form.data}
                    onChange={(e) => setForm({ ...form, data: e.target.value })} />
                </div>
                <div>
                  <label className="text-[12px] font-medium">Previsão</label>
                  <input type="date" className="input-retro w-full" value={form.previsaoEntrega}
                    onChange={(e) => setForm({ ...form, previsaoEntrega: e.target.value })} />
                </div>
                <div>
                  <label className="text-[12px] font-medium">Status</label>
                  <select className="input-retro w-full" value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    {statusOptions.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[12px] font-medium">Fornecedor</label>
                <input className="input-retro w-full" value={form.fornecedor}
                  onChange={(e) => setForm({ ...form, fornecedor: e.target.value })} />
              </div>
              <div>
                <label className="text-[12px] font-medium">Observação</label>
                <textarea className="input-retro w-full" rows={2} value={form.observacao}
                  onChange={(e) => setForm({ ...form, observacao: e.target.value })} />
              </div>

              <fieldset className="fieldset-retro">
                <legend>Itens do Pedido</legend>
                <div className="flex gap-2 mb-2 items-end">
                  <div className="flex-1">
                    <label className="text-[11px] font-medium">Produto</label>
                    <input className="input-retro w-full" value={itemForm.produto}
                      onChange={(e) => setItemForm({ ...itemForm, produto: e.target.value })} />
                  </div>
                  <div className="w-[80px]">
                    <label className="text-[11px] font-medium">Qtd</label>
                    <input type="number" className="input-retro w-full" value={itemForm.quantidade}
                      onChange={(e) => setItemForm({ ...itemForm, quantidade: Number(e.target.value) })} />
                  </div>
                  <div className="w-[100px]">
                    <label className="text-[11px] font-medium">Preço Unit.</label>
                    <input type="number" step="0.01" className="input-retro w-full" value={itemForm.precoUnitario}
                      onChange={(e) => setItemForm({ ...itemForm, precoUnitario: Number(e.target.value) })} />
                  </div>
                  <button className="btn-retro btn-retro-success text-[11px]" onClick={addItem}><Plus size={12} /></button>
                </div>
                <table className="w-full text-[12px] border border-border">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left p-1 px-2">Produto</th>
                      <th className="text-center p-1 w-[60px]">Qtd</th>
                      <th className="text-right p-1 px-2 w-[90px]">Preço</th>
                      <th className="text-right p-1 px-2 w-[90px]">Subtotal</th>
                      <th className="w-[30px]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.itens.length === 0 ? (
                      <tr><td colSpan={5} className="text-center p-3 text-muted-foreground">Nenhum item adicionado.</td></tr>
                    ) : form.itens.map((it, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "" : "bg-secondary/30"}>
                        <td className="p-1 px-2">{it.produto}</td>
                        <td className="p-1 text-center">{it.quantidade}</td>
                        <td className="p-1 px-2 text-right">R$ {it.precoUnitario.toFixed(2)}</td>
                        <td className="p-1 px-2 text-right">R$ {(it.quantidade * it.precoUnitario).toFixed(2)}</td>
                        <td className="p-1 text-center">
                          <button onClick={() => removeItem(idx)}><X size={12} className="text-destructive" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-right mt-1 font-bold text-[13px]">Total: R$ {total(form.itens).toFixed(2)}</div>
              </fieldset>

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

export default Compras;
