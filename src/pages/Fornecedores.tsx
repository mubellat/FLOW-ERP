import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

interface Fornecedor {
  codigo: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  ie: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  uf: string;
  cep: string;
  contato: string;
}

const ufs = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

const Fornecedores = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Fornecedor[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const emptyForm: Fornecedor = { codigo: "", razaoSocial: "", nomeFantasia: "", cnpj: "", ie: "", telefone: "", email: "", endereco: "", cidade: "", uf: "", cep: "", contato: "" };
  const [form, setForm] = useState<Fornecedor>(emptyForm);

  const handleNovo = () => {
    setForm({ ...emptyForm, codigo: String(items.length + 1).padStart(4, "0") });
    setEditIndex(null);
    setShowForm(true);
  };

  const handleSalvar = () => {
    if (!form.razaoSocial.trim()) return;
    if (editIndex !== null) {
      setItems((prev) => prev.map((p, i) => (i === editIndex ? form : p)));
    } else {
      setItems((prev) => [...prev, form]);
    }
    setShowForm(false);
  };

  const handleEditar = (index: number) => { setForm(items[index]); setEditIndex(index); setShowForm(true); };
  const handleExcluir = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index));

  const filtered = items.filter((p) => p.razaoSocial.toLowerCase().includes(search.toLowerCase()) || p.cnpj.includes(search) || p.codigo.includes(search));

  return (
    <div>
      <fieldset className="fieldset-retro">
        <legend>Cadastro de Fornecedores</legend>
        <div className="flex items-center gap-2 mb-3">
          <label className="text-[13px] font-medium">Buscar:</label>
          <input type="text" className="input-retro flex-1" placeholder="Pesquisar por razão social, CNPJ ou código..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="btn-retro btn-retro-primary">Buscar</button>
          <button className="btn-retro btn-retro-success" onClick={handleNovo}>+ Novo</button>
        </div>

        <div className="border-2 border-border">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Código</th>
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Razão Social</th>
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">CNPJ</th>
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Telefone</th>
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Cidade</th>
                <th className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30">Contato</th>
                <th className="text-center p-1 px-2 font-semibold w-[100px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center p-8 text-muted-foreground">Nenhum registro encontrado.</td></tr>
              ) : filtered.map((p, i) => {
                const ri = items.indexOf(p);
                return (
                  <tr key={i} className={`${i % 2 === 0 ? "bg-background" : "bg-muted/30"} hover:bg-accent/20`}>
                    <td className="p-1 px-2 border-r border-border">{p.codigo}</td>
                    <td className="p-1 px-2 border-r border-border">{p.razaoSocial}</td>
                    <td className="p-1 px-2 border-r border-border">{p.cnpj}</td>
                    <td className="p-1 px-2 border-r border-border">{p.telefone}</td>
                    <td className="p-1 px-2 border-r border-border">{p.cidade}</td>
                    <td className="p-1 px-2 border-r border-border">{p.contato}</td>
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
          <div className="window-frame w-[540px]">
            <div className="window-titlebar">{editIndex !== null ? "Editar Fornecedor" : "Novo Fornecedor"}</div>
            <div className="p-4">
              <fieldset className="fieldset-retro">
                <legend>Dados do Fornecedor</legend>
                <div className="grid grid-cols-[110px_1fr] gap-y-2 items-center text-[13px]">
                  <label className="font-medium">Código:</label>
                  <input type="text" className="input-retro" value={form.codigo} readOnly />
                  <label className="font-medium">Razão Social:</label>
                  <input type="text" className="input-retro" placeholder="Razão Social" value={form.razaoSocial} onChange={(e) => setForm({ ...form, razaoSocial: e.target.value })} maxLength={100} />
                  <label className="font-medium">Nome Fantasia:</label>
                  <input type="text" className="input-retro" placeholder="Nome Fantasia" value={form.nomeFantasia} onChange={(e) => setForm({ ...form, nomeFantasia: e.target.value })} maxLength={100} />
                  <label className="font-medium">CNPJ:</label>
                  <input type="text" className="input-retro" placeholder="00.000.000/0000-00" value={form.cnpj} onChange={(e) => setForm({ ...form, cnpj: e.target.value })} maxLength={18} />
                  <label className="font-medium">Inscrição Est.:</label>
                  <input type="text" className="input-retro" placeholder="Inscrição Estadual" value={form.ie} onChange={(e) => setForm({ ...form, ie: e.target.value })} maxLength={20} />
                  <label className="font-medium">Telefone:</label>
                  <input type="text" className="input-retro" placeholder="(00) 00000-0000" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} maxLength={15} />
                  <label className="font-medium">E-mail:</label>
                  <input type="email" className="input-retro" placeholder="email@exemplo.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={100} />
                  <label className="font-medium">Endereço:</label>
                  <input type="text" className="input-retro" placeholder="Rua, número, bairro" value={form.endereco} onChange={(e) => setForm({ ...form, endereco: e.target.value })} maxLength={150} />
                  <label className="font-medium">Cidade:</label>
                  <input type="text" className="input-retro" placeholder="Cidade" value={form.cidade} onChange={(e) => setForm({ ...form, cidade: e.target.value })} maxLength={60} />
                  <label className="font-medium">UF:</label>
                  <select className="input-retro" value={form.uf} onChange={(e) => setForm({ ...form, uf: e.target.value })}>
                    <option value="">-- Selecione --</option>
                    {ufs.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                  <label className="font-medium">CEP:</label>
                  <input type="text" className="input-retro" placeholder="00000-000" value={form.cep} onChange={(e) => setForm({ ...form, cep: e.target.value })} maxLength={9} />
                  <label className="font-medium">Contato:</label>
                  <input type="text" className="input-retro" placeholder="Nome do contato" value={form.contato} onChange={(e) => setForm({ ...form, contato: e.target.value })} maxLength={60} />
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

export default Fornecedores;
