import { useState } from "react";
import { Pencil, Trash2, ArrowUpDown } from "lucide-react";

interface ItemEstoque {
  codigo: string;
  produto: string;
  unidade: string;
  qtdAtual: number;
  qtdMinima: number;
  localizacao: string;
  ultimaMovimentacao: string;
}

interface Movimentacao {
  tipo: string;
  quantidade: number;
  motivo: string;
}

const Estoque = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<ItemEstoque[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<ItemEstoque>({
    codigo: "", produto: "", unidade: "UN",
    qtdAtual: 0, qtdMinima: 0, localizacao: "",
    ultimaMovimentacao: new Date().toISOString().slice(0, 10),
  });

  const [showMov, setShowMov] = useState<number | null>(null);
  const [mov, setMov] = useState<Movimentacao>({ tipo: "Entrada", quantidade: 0, motivo: "" });

  const handleNovo = () => {
    setForm({
      codigo: String(items.length + 1).padStart(6, "0"),
      produto: "", unidade: "UN", qtdAtual: 0, qtdMinima: 0,
      localizacao: "", ultimaMovimentacao: new Date().toISOString().slice(0, 10),
    });
    setEditIndex(null);
    setShowForm(true);
  };

  const handleSalvar = () => {
    if (!form.produto) return;
    if (editIndex !== null) setItems((p) => p.map((x, i) => i === editIndex ? form : x));
    else setItems((p) => [...p, form]);
    setShowForm(false);
  };

  const handleEditar = (i: number) => { setForm(items[i]); setEditIndex(i); setShowForm(true); };
  const handleExcluir = (i: number) => { if (confirm("Excluir item?")) setItems((p) => p.filter((_, idx) => idx !== i)); };

  const handleMovimentar = (i: number) => {
    setShowMov(i);
    setMov({ tipo: "Entrada", quantidade: 0, motivo: "" });
  };
  const confirmMov = () => {
    if (showMov === null || mov.quantidade <= 0) return;
    setItems((p) => p.map((x, i) => i === showMov ? {
      ...x,
      qtdAtual: mov.tipo === "Entrada" ? x.qtdAtual + mov.quantidade : x.qtdAtual - mov.quantidade,
      ultimaMovimentacao: new Date().toISOString().slice(0, 10),
    } : x));
    setShowMov(null);
  };

  const filtered = items.filter((x) =>
    x.codigo.includes(search) || x.produto.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <fieldset className="fieldset-retro">
        <legend>Módulo Estoque — Controle de Estoque</legend>

        <div className="flex items-center gap-2 mb-3">
          <label className="text-[13px] font-medium">Buscar:</label>
          <input type="text" className="input-retro flex-1" placeholder="Código ou produto..."
            value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn-retro btn-retro-primary">Buscar</button>
          <button className="btn-retro btn-retro-success" onClick={handleNovo}>+ Novo Item</button>
        </div>

        <div className="border-2 border-border">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Código</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Produto</th>
                <th className="text-center p-1 px-2 border-r border-primary-foreground/30">UN</th>
                <th className="text-right p-1 px-2 border-r border-primary-foreground/30">Qtd Atual</th>
                <th className="text-right p-1 px-2 border-r border-primary-foreground/30">Qtd Mínima</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Localização</th>
                <th className="text-left p-1 px-2 border-r border-primary-foreground/30">Últ. Mov.</th>
                <th className="text-center p-1 px-2 w-[140px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center p-8 text-muted-foreground">Nenhum item cadastrado.</td></tr>
              ) : filtered.map((it, i) => {
                const baixo = it.qtdAtual <= it.qtdMinima;
                return (
                  <tr key={i} className={baixo ? "bg-red-100" : i % 2 === 0 ? "bg-background" : "bg-secondary/30"}>
                    <td className="p-1 px-2">{it.codigo}</td>
                    <td className="p-1 px-2">{it.produto}</td>
                    <td className="p-1 px-2 text-center">{it.unidade}</td>
                    <td className={`p-1 px-2 text-right ${baixo ? "font-bold text-destructive" : ""}`}>{it.qtdAtual}</td>
                    <td className="p-1 px-2 text-right">{it.qtdMinima}</td>
                    <td className="p-1 px-2">{it.localizacao}</td>
                    <td className="p-1 px-2">{it.ultimaMovimentacao}</td>
                    <td className="p-1 px-2 text-center">
                      <button className="btn-retro text-[11px] px-1 mr-1" title="Movimentar" onClick={() => handleMovimentar(i)}><ArrowUpDown size={12} /></button>
                      <button className="btn-retro text-[11px] px-1 mr-1" onClick={() => handleEditar(i)}><Pencil size={12} /></button>
                      <button className="btn-retro text-[11px] px-1" onClick={() => handleExcluir(i)}><Trash2 size={12} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-2 text-[12px] text-muted-foreground">Total: {filtered.length} | Itens em alerta (estoque baixo): {filtered.filter(x => x.qtdAtual <= x.qtdMinima).length}</div>
      </fieldset>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="window-frame w-[600px]">
            <div className="window-titlebar">{editIndex !== null ? "Editar Item de Estoque" : "Novo Item de Estoque"}</div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[12px] font-medium">Código</label>
                  <input className="input-retro w-full" value={form.codigo} readOnly />
                </div>
                <div className="col-span-2">
                  <label className="text-[12px] font-medium">Produto</label>
                  <input className="input-retro w-full" value={form.produto}
                    onChange={(e) => setForm({ ...form, produto: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="text-[12px] font-medium">Unidade</label>
                  <select className="input-retro w-full" value={form.unidade}
                    onChange={(e) => setForm({ ...form, unidade: e.target.value })}>
                    {["UN", "KG", "L", "CX", "PCT"].map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-medium">Qtd Atual</label>
                  <input type="number" className="input-retro w-full" value={form.qtdAtual}
                    onChange={(e) => setForm({ ...form, qtdAtual: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="text-[12px] font-medium">Qtd Mínima</label>
                  <input type="number" className="input-retro w-full" value={form.qtdMinima}
                    onChange={(e) => setForm({ ...form, qtdMinima: Number(e.target.value) })} />
                </div>
                <div>
                  <label className="text-[12px] font-medium">Localização</label>
                  <input className="input-retro w-full" value={form.localizacao}
                    onChange={(e) => setForm({ ...form, localizacao: e.target.value })} placeholder="Ex: A-01" />
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

      {showMov !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="window-frame w-[450px]">
            <div className="window-titlebar">Movimentar Estoque — {items[showMov]?.produto}</div>
            <div className="p-4 space-y-3">
              <div className="text-[12px]">Estoque atual: <strong>{items[showMov]?.qtdAtual}</strong> {items[showMov]?.unidade}</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-medium">Tipo</label>
                  <select className="input-retro w-full" value={mov.tipo}
                    onChange={(e) => setMov({ ...mov, tipo: e.target.value })}>
                    <option>Entrada</option>
                    <option>Saída</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-medium">Quantidade</label>
                  <input type="number" className="input-retro w-full" value={mov.quantidade}
                    onChange={(e) => setMov({ ...mov, quantidade: Number(e.target.value) })} />
                </div>
              </div>
              <div>
                <label className="text-[12px] font-medium">Motivo</label>
                <input className="input-retro w-full" value={mov.motivo}
                  onChange={(e) => setMov({ ...mov, motivo: e.target.value })} placeholder="Ex: Compra, Venda, Ajuste..." />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button className="btn-retro btn-retro-primary" onClick={confirmMov}>Confirmar</button>
                <button className="btn-retro btn-retro-danger" onClick={() => setShowMov(null)}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estoque;
