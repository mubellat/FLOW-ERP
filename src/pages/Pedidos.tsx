import { useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

interface ItemPedido {
  produto: string;
  quantidade: number;
  precoUnitario: number;
}

interface Pedido {
  numero: string;
  cliente: string;
  data: string;
  status: string;
  observacao: string;
  itens: ItemPedido[];
}

const statusOptions = ["Aberto", "Em andamento", "Faturado", "Cancelado"];

const Pedidos = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Pedido[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Pedido>({
    numero: "",
    cliente: "",
    data: new Date().toISOString().slice(0, 10),
    status: "Aberto",
    observacao: "",
    itens: [],
  });
  const [itemForm, setItemForm] = useState<ItemPedido>({ produto: "", quantidade: 1, precoUnitario: 0 });

  const handleNovo = () => {
    setForm({
      numero: String(items.length + 1).padStart(6, "0"),
      cliente: "",
      data: new Date().toISOString().slice(0, 10),
      status: "Aberto",
      observacao: "",
      itens: [],
    });
    setEditIndex(null);
    setShowForm(true);
  };

  const handleSalvar = () => {
    if (!form.cliente) return;
    if (editIndex !== null) {
      setItems((prev) => prev.map((it, i) => (i === editIndex ? form : it)));
    } else {
      setItems((prev) => [...prev, form]);
    }
    setShowForm(false);
  };

  const handleEditar = (i: number) => {
    setForm(items[i]);
    setEditIndex(i);
    setShowForm(true);
  };

  const handleExcluir = (i: number) => {
    if (confirm("Deseja excluir este pedido?")) setItems((prev) => prev.filter((_, idx) => idx !== i));
  };

  const addItem = () => {
    if (!itemForm.produto) return;
    setForm((prev) => ({ ...prev, itens: [...prev.itens, { ...itemForm }] }));
    setItemForm({ produto: "", quantidade: 1, precoUnitario: 0 });
  };

  const removeItem = (i: number) => {
    setForm((prev) => ({ ...prev, itens: prev.itens.filter((_, idx) => idx !== i) }));
  };

  const totalPedido = (itens: ItemPedido[]) =>
    itens.reduce((s, it) => s + it.quantidade * it.precoUnitario, 0);

  const filtered = items.filter(
    (p) =>
      p.numero.includes(search) ||
      p.cliente.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <fieldset className="fieldset-retro">
        <legend>Módulo Vendas — Pedidos de Venda</legend>

        <div className="flex items-center gap-2 mb-3">
          <label className="text-[13px] font-medium">Buscar:</label>
          <input
            type="text"
            className="input-retro flex-1"
            placeholder="Pesquisar por nº ou cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn-retro btn-retro-primary">Buscar</button>
          <button className="btn-retro btn-retro-success" onClick={handleNovo}>+ Novo Pedido</button>
        </div>

        <div className="border-2 border-border">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Nº Pedido</th>
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Cliente</th>
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Data</th>
                <th className="text-right p-1 px-2 font-semibold border-r border-primary-foreground/30">Valor Total</th>
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Status</th>
                <th className="text-center p-1 px-2 font-semibold w-[100px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-8 text-muted-foreground">
                    Nenhum pedido encontrado.
                  </td>
                </tr>
              ) : (
                filtered.map((p, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-secondary/30"}>
                    <td className="p-1 px-2">{p.numero}</td>
                    <td className="p-1 px-2">{p.cliente}</td>
                    <td className="p-1 px-2">{p.data}</td>
                    <td className="p-1 px-2 text-right">
                      R$ {totalPedido(p.itens).toFixed(2)}
                    </td>
                    <td className="p-1 px-2">
                      <span className={`px-2 py-0.5 text-[11px] rounded ${
                        p.status === "Faturado" ? "bg-green-200 text-green-800" :
                        p.status === "Cancelado" ? "bg-red-200 text-red-800" :
                        p.status === "Em andamento" ? "bg-yellow-200 text-yellow-800" :
                        "bg-blue-200 text-blue-800"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-1 px-2 text-center">
                      <button className="btn-retro text-[11px] px-1 mr-1" onClick={() => handleEditar(i)}><Pencil size={12} /></button>
                      <button className="btn-retro text-[11px] px-1" onClick={() => handleExcluir(i)}><Trash2 size={12} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-2 text-[12px] text-muted-foreground">
          <span>Total de registros: {filtered.length}</span>
        </div>
      </fieldset>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="window-frame w-[700px] max-h-[90vh] overflow-y-auto">
            <div className="window-titlebar">{editIndex !== null ? "Editar Pedido" : "Novo Pedido"}</div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[12px] font-medium">Nº Pedido</label>
                  <input className="input-retro w-full" value={form.numero} readOnly />
                </div>
                <div>
                  <label className="text-[12px] font-medium">Data</label>
                  <input type="date" className="input-retro w-full" value={form.data}
                    onChange={(e) => setForm({ ...form, data: e.target.value })} />
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
                <label className="text-[12px] font-medium">Cliente</label>
                <input className="input-retro w-full" value={form.cliente}
                  onChange={(e) => setForm({ ...form, cliente: e.target.value })} placeholder="Nome do cliente" />
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
                  <button className="btn-retro btn-retro-success text-[11px]" onClick={addItem}>
                    <Plus size={12} />
                  </button>
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
                    ) : (
                      form.itens.map((it, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "" : "bg-secondary/30"}>
                          <td className="p-1 px-2">{it.produto}</td>
                          <td className="p-1 text-center">{it.quantidade}</td>
                          <td className="p-1 px-2 text-right">R$ {it.precoUnitario.toFixed(2)}</td>
                          <td className="p-1 px-2 text-right">R$ {(it.quantidade * it.precoUnitario).toFixed(2)}</td>
                          <td className="p-1 text-center">
                            <button onClick={() => removeItem(idx)}><X size={12} className="text-destructive" /></button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="text-right mt-1 font-bold text-[13px]">
                  Total: R$ {totalPedido(form.itens).toFixed(2)}
                </div>
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

export default Pedidos;
