import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface Produto {
  codigo: string;
  descricao: string;
  categoria: string;
  unidade: string;
  preco: string;
  estoque: string;
}

const categorias = ["Alimentos", "Bebidas", "Limpeza", "Higiene", "Eletrônicos", "Vestuário", "Outros"];
const unidades = ["UN", "KG", "LT", "CX", "PC", "MT"];

const Produtos = () => {
  const [search, setSearch] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Produto>({
    codigo: "",
    descricao: "",
    categoria: "",
    unidade: "UN",
    preco: "",
    estoque: "0",
  });

  const resetForm = () => {
    setForm({ codigo: "", descricao: "", categoria: "", unidade: "UN", preco: "", estoque: "0" });
    setEditIndex(null);
  };

  const handleNovo = () => {
    resetForm();
    setForm((f) => ({ ...f, codigo: String(produtos.length + 1).padStart(4, "0") }));
    setShowForm(true);
  };

  const handleSalvar = () => {
    if (!form.descricao.trim() || !form.preco.trim()) return;
    if (editIndex !== null) {
      setProdutos((prev) => prev.map((p, i) => (i === editIndex ? form : p)));
    } else {
      setProdutos((prev) => [...prev, form]);
    }
    setShowForm(false);
    resetForm();
  };

  const handleEditar = (index: number) => {
    setForm(produtos[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleExcluir = (index: number) => {
    setProdutos((prev) => prev.filter((_, i) => i !== index));
  };

  const filtered = produtos.filter(
    (p) =>
      p.descricao.toLowerCase().includes(search.toLowerCase()) ||
      p.codigo.includes(search)
  );

  return (
    <div>
      <fieldset className="fieldset-retro">
        <legend>Cadastro de Produtos</legend>

        <div className="flex items-center gap-2 mb-3">
          <label className="text-[13px] font-medium">Buscar:</label>
          <input
            type="text"
            className="input-retro flex-1"
            placeholder="Pesquisar por código ou descrição..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn-retro btn-retro-primary">Buscar</button>
          <button className="btn-retro btn-retro-success" onClick={handleNovo}>
            + Novo
          </button>
        </div>

        <div className="border-2 border-border">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Código</th>
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Descrição</th>
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Categoria</th>
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Unidade</th>
                <th className="text-right p-1 px-2 font-semibold border-r border-primary-foreground/30">Preço Unit.</th>
                <th className="text-right p-1 px-2 font-semibold border-r border-primary-foreground/30">Estoque</th>
                <th className="text-center p-1 px-2 font-semibold w-[100px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-muted-foreground">
                    Nenhum registro encontrado.
                  </td>
                </tr>
              ) : (
                filtered.map((p, i) => {
                  const realIndex = produtos.indexOf(p);
                  return (
                    <tr
                      key={i}
                      className={`${i % 2 === 0 ? "bg-background" : "bg-muted/30"} hover:bg-accent/20`}
                    >
                      <td className="p-1 px-2 border-r border-border">{p.codigo}</td>
                      <td className="p-1 px-2 border-r border-border">{p.descricao}</td>
                      <td className="p-1 px-2 border-r border-border">{p.categoria}</td>
                      <td className="p-1 px-2 border-r border-border">{p.unidade}</td>
                      <td className="p-1 px-2 border-r border-border text-right">
                        R$ {Number(p.preco).toFixed(2)}
                      </td>
                      <td className="p-1 px-2 border-r border-border text-right">{p.estoque}</td>
                      <td className="p-1 px-2 text-center">
                        <div className="flex justify-center gap-1">
                          <button
                            className="btn-retro text-[11px] px-1 py-0.5"
                            onClick={() => handleEditar(realIndex)}
                            title="Editar"
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            className="btn-retro btn-retro-danger text-[11px] px-1 py-0.5"
                            onClick={() => handleExcluir(realIndex)}
                            title="Excluir"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-2 text-[12px] text-muted-foreground">
          <span>Total de registros: {filtered.length}</span>
        </div>
      </fieldset>

      {/* Modal de cadastro */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="window-frame w-[480px]">
            <div className="window-titlebar">
              {editIndex !== null ? "Editar Produto" : "Novo Produto"}
            </div>
            <div className="p-4">
              <fieldset className="fieldset-retro">
                <legend>Dados do Produto</legend>

                <div className="grid grid-cols-[100px_1fr] gap-y-2 items-center text-[13px]">
                  <label className="font-medium">Código:</label>
                  <input
                    type="text"
                    className="input-retro"
                    value={form.codigo}
                    readOnly
                  />

                  <label className="font-medium">Descrição:</label>
                  <input
                    type="text"
                    className="input-retro"
                    placeholder="Nome do produto"
                    value={form.descricao}
                    onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                    maxLength={100}
                  />

                  <label className="font-medium">Categoria:</label>
                  <select
                    className="input-retro"
                    value={form.categoria}
                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  >
                    <option value="">-- Selecione --</option>
                    {categorias.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  <label className="font-medium">Unidade:</label>
                  <select
                    className="input-retro"
                    value={form.unidade}
                    onChange={(e) => setForm({ ...form, unidade: e.target.value })}
                  >
                    {unidades.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>

                  <label className="font-medium">Preço Unit.:</label>
                  <input
                    type="number"
                    className="input-retro"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    value={form.preco}
                    onChange={(e) => setForm({ ...form, preco: e.target.value })}
                  />

                  <label className="font-medium">Estoque:</label>
                  <input
                    type="number"
                    className="input-retro"
                    placeholder="0"
                    min="0"
                    value={form.estoque}
                    onChange={(e) => setForm({ ...form, estoque: e.target.value })}
                  />
                </div>
              </fieldset>

              <div className="flex justify-end gap-2 mt-3">
                <button className="btn-retro btn-retro-success" onClick={handleSalvar}>
                  💾 Salvar
                </button>
                <button
                  className="btn-retro btn-retro-danger"
                  onClick={() => { setShowForm(false); resetForm(); }}
                >
                  ✖ Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produtos;
