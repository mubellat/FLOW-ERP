import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface Usuario {
  codigo: string;
  nome: string;
  login: string;
  senha: string;
  perfil: string;
  status: string;
  email: string;
}

const perfis = ["Administrador", "Gerente", "Operador de Caixa", "Estoquista", "Financeiro", "Vendedor"];

const Usuarios = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Usuario[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const emptyForm: Usuario = { codigo: "", nome: "", login: "", senha: "", perfil: "", status: "Ativo", email: "" };
  const [form, setForm] = useState<Usuario>(emptyForm);

  const handleNovo = () => {
    setForm({ ...emptyForm, codigo: String(items.length + 1).padStart(4, "0") });
    setEditIndex(null);
    setShowForm(true);
  };

  const handleSalvar = () => {
    if (!form.nome.trim() || !form.login.trim()) return;
    if (editIndex !== null) {
      setItems((prev) => prev.map((p, i) => (i === editIndex ? form : p)));
    } else {
      setItems((prev) => [...prev, form]);
    }
    setShowForm(false);
  };

  const handleEditar = (index: number) => { setForm(items[index]); setEditIndex(index); setShowForm(true); };
  const handleExcluir = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index));

  const filtered = items.filter((p) => p.nome.toLowerCase().includes(search.toLowerCase()) || p.login.toLowerCase().includes(search.toLowerCase()) || p.codigo.includes(search));

  return (
    <div>
      <fieldset className="fieldset-retro">
        <legend>Cadastro de Usuários</legend>
        <div className="flex items-center gap-2 mb-3">
          <label className="text-[13px] font-medium">Buscar:</label>
          <input type="text" className="input-retro flex-1" placeholder="Pesquisar por nome, login ou código..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn-retro btn-retro-primary">Buscar</button>
          <button className="btn-retro btn-retro-success" onClick={handleNovo}>+ Novo</button>
        </div>

        <div className="border-2 border-border">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Código</th>
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Nome</th>
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Login</th>
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Perfil</th>
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Status</th>
                <th className="text-center p-1 px-2 font-semibold w-[100px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center p-8 text-muted-foreground">Nenhum registro encontrado.</td></tr>
              ) : filtered.map((p, i) => {
                const ri = items.indexOf(p);
                return (
                  <tr key={i} className={`${i % 2 === 0 ? "bg-background" : "bg-muted/30"} hover:bg-accent/20`}>
                    <td className="p-1 px-2 border-r border-border">{p.codigo}</td>
                    <td className="p-1 px-2 border-r border-border">{p.nome}</td>
                    <td className="p-1 px-2 border-r border-border">{p.login}</td>
                    <td className="p-1 px-2 border-r border-border">{p.perfil}</td>
                    <td className="p-1 px-2 border-r border-border">
                      <span className={`px-2 py-0.5 text-[11px] font-semibold ${p.status === "Ativo" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="p-1 px-2 text-center">
                      <div className="flex justify-center gap-1">
                        <button className="btn-retro text-[11px] px-1 py-0.5" onClick={() => handleEditar(ri)} title="Editar"><Pencil size={12} /></button>
                        <button className="btn-retro btn-retro-danger text-[11px] px-1 py-0.5" onClick={() => handleExcluir(ri)} title="Excluir"><Trash2 size={12} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-2 text-[12px] text-muted-foreground">
          <span>Total de registros: {filtered.length}</span>
        </div>
      </fieldset>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="window-frame w-[480px]">
            <div className="window-titlebar">{editIndex !== null ? "Editar Usuário" : "Novo Usuário"}</div>
            <div className="p-4">
              <fieldset className="fieldset-retro">
                <legend>Dados do Usuário</legend>
                <div className="grid grid-cols-[100px_1fr] gap-y-2 items-center text-[13px]">
                  <label className="font-medium">Código:</label>
                  <input type="text" className="input-retro" value={form.codigo} readOnly />
                  <label className="font-medium">Nome:</label>
                  <input type="text" className="input-retro" placeholder="Nome completo" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} maxLength={100} />
                  <label className="font-medium">Login:</label>
                  <input type="text" className="input-retro" placeholder="Nome de usuário" value={form.login} onChange={(e) => setForm({ ...form, login: e.target.value })} maxLength={30} />
                  <label className="font-medium">Senha:</label>
                  <input type="password" className="input-retro" placeholder="••••••••" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} maxLength={30} />
                  <label className="font-medium">E-mail:</label>
                  <input type="email" className="input-retro" placeholder="email@exemplo.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={100} />
                  <label className="font-medium">Perfil:</label>
                  <select className="input-retro" value={form.perfil} onChange={(e) => setForm({ ...form, perfil: e.target.value })}>
                    <option value="">-- Selecione --</option>
                    {perfis.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <label className="font-medium">Status:</label>
                  <select className="input-retro" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>
              </fieldset>
              <div className="flex justify-end gap-2 mt-3">
                <button className="btn-retro btn-retro-success" onClick={handleSalvar}>💾 Salvar</button>
                <button className="btn-retro btn-retro-danger" onClick={() => setShowForm(false)}>✖ Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
