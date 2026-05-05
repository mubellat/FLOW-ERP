import { useState } from "react";
import { ShoppingCart, Trash2, Search, Plus, Minus } from "lucide-react";

interface ItemVenda {
  codigo: string;
  descricao: string;
  qtd: number;
  preco: number;
}

interface ProdutoCatalogo {
  codigo: string;
  descricao: string;
  preco: number;
}

const catalogo: ProdutoCatalogo[] = [
  { codigo: "001", descricao: "Refrigerante 2L", preco: 9.99 },
  { codigo: "002", descricao: "Pão Francês (kg)", preco: 14.50 },
  { codigo: "003", descricao: "Leite Integral 1L", preco: 5.79 },
  { codigo: "004", descricao: "Café 500g", preco: 18.90 },
  { codigo: "005", descricao: "Açúcar 1kg", preco: 4.49 },
  { codigo: "006", descricao: "Arroz 5kg", preco: 28.90 },
];

const PDV = () => {
  const [codigoProduto, setCodigoProduto] = useState("");
  const [itens, setItens] = useState<ItemVenda[]>([]);
  const [cliente, setCliente] = useState("Consumidor Final");
  const [pagamento, setPagamento] = useState("");
  const [valorRecebido, setValorRecebido] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchProd, setSearchProd] = useState("");

  const total = itens.reduce((acc, item) => acc + item.qtd * item.preco, 0);
  const troco = pagamento === "Dinheiro" ? Math.max(0, valorRecebido - total) : 0;

  const addProduto = (prod: ProdutoCatalogo) => {
    setItens((prev) => {
      const existing = prev.findIndex((i) => i.codigo === prod.codigo);
      if (existing >= 0) {
        const copy = [...prev];
        copy[existing] = { ...copy[existing], qtd: copy[existing].qtd + 1 };
        return copy;
      }
      return [...prev, { codigo: prod.codigo, descricao: prod.descricao, qtd: 1, preco: prod.preco }];
    });
  };

  const addItem = () => {
    if (!codigoProduto) return;
    const prod = catalogo.find((p) => p.codigo === codigoProduto);
    if (prod) addProduto(prod);
    else addProduto({ codigo: codigoProduto, descricao: `Produto ${codigoProduto}`, preco: 9.99 });
    setCodigoProduto("");
  };

  const updateQtd = (idx: number, delta: number) => {
    setItens((prev) => prev.map((it, i) => i === idx ? { ...it, qtd: Math.max(1, it.qtd + delta) } : it));
  };

  const removeItem = (index: number) => setItens(itens.filter((_, i) => i !== index));

  const finalizar = () => {
    if (itens.length === 0) { alert("Adicione itens à venda."); return; }
    if (!pagamento) { alert("Selecione a forma de pagamento."); return; }
    if (pagamento === "Dinheiro" && valorRecebido < total) { alert("Valor recebido insuficiente."); return; }
    alert(`Venda finalizada!\nTotal: R$ ${total.toFixed(2)}\nPagamento: ${pagamento}${pagamento === "Dinheiro" ? `\nTroco: R$ ${troco.toFixed(2)}` : ""}`);
    setItens([]); setPagamento(""); setValorRecebido(0); setCliente("Consumidor Final");
  };

  const cancelar = () => {
    if (itens.length === 0 || confirm("Cancelar venda?")) {
      setItens([]); setPagamento(""); setValorRecebido(0);
    }
  };

  const filteredCat = catalogo.filter((p) =>
    p.codigo.includes(searchProd) || p.descricao.toLowerCase().includes(searchProd.toLowerCase())
  );

  return (
    <div className="flex gap-3 h-full">
      <div className="flex-1">
        <fieldset className="fieldset-retro">
          <legend><ShoppingCart size={14} className="inline mr-1" />PDV — Ponto de Venda</legend>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="col-span-2">
              <label className="text-[12px] font-medium">Cliente</label>
              <input className="input-retro w-full" value={cliente} onChange={(e) => setCliente(e.target.value)} />
            </div>
            <div>
              <label className="text-[12px] font-medium">Operador</label>
              <input className="input-retro w-full" value="admin" readOnly />
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            <input type="text" className="input-retro flex-1" placeholder="Código do produto ou cód. de barras..."
              value={codigoProduto} onChange={(e) => setCodigoProduto(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()} autoFocus />
            <button className="btn-retro btn-retro-primary" onClick={addItem}>Adicionar (Enter)</button>
            <button className="btn-retro" onClick={() => setShowSearch(true)}><Search size={14} /> Consultar</button>
          </div>

          <div className="border-2 border-border">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-1 px-2">Código</th>
                  <th className="text-left p-1 px-2">Descrição</th>
                  <th className="text-center p-1 px-2 w-[110px]">Qtd</th>
                  <th className="text-right p-1 px-2">Preço</th>
                  <th className="text-right p-1 px-2">Subtotal</th>
                  <th className="text-center p-1 px-2 w-[40px]">X</th>
                </tr>
              </thead>
              <tbody>
                {itens.length === 0 ? (
                  <tr><td colSpan={6} className="text-center p-6 text-muted-foreground">Nenhum item adicionado.</td></tr>
                ) : itens.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-background" : "bg-secondary/30"}>
                    <td className="p-1 px-2">{item.codigo}</td>
                    <td className="p-1 px-2">{item.descricao}</td>
                    <td className="p-1 px-2 text-center">
                      <div className="inline-flex items-center gap-1">
                        <button className="btn-retro text-[10px] px-1" onClick={() => updateQtd(idx, -1)}><Minus size={10} /></button>
                        <span className="w-6 inline-block">{item.qtd}</span>
                        <button className="btn-retro text-[10px] px-1" onClick={() => updateQtd(idx, 1)}><Plus size={10} /></button>
                      </div>
                    </td>
                    <td className="p-1 px-2 text-right">R$ {item.preco.toFixed(2)}</td>
                    <td className="p-1 px-2 text-right font-medium">R$ {(item.qtd * item.preco).toFixed(2)}</td>
                    <td className="p-1 px-2 text-center">
                      <button onClick={() => removeItem(idx)} className="text-destructive"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>

      <div className="w-[280px]">
        <fieldset className="fieldset-retro">
          <legend>Resumo da Venda</legend>
          <div className="text-[12px] text-muted-foreground mb-1">Itens: {itens.reduce((s, i) => s + i.qtd, 0)}</div>
          <div className="window-frame p-3 mb-3 text-center">
            <div className="text-[12px] text-muted-foreground">TOTAL</div>
            <div className="text-3xl font-bold text-primary">R$ {total.toFixed(2)}</div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="btn-retro btn-retro-success w-full text-[13px]" onClick={finalizar}>✅ Finalizar Venda (F12)</button>
            <button className="btn-retro btn-retro-danger w-full text-[13px]" onClick={cancelar}>❌ Cancelar Venda (ESC)</button>
          </div>
        </fieldset>

        <fieldset className="fieldset-retro mt-3">
          <legend>Pagamento</legend>
          <div className="grid grid-cols-2 gap-1 mb-2">
            {["Dinheiro", "Cartão Crédito", "Cartão Débito", "PIX"].map((p) => (
              <button key={p}
                className={`btn-retro text-[11px] ${pagamento === p ? "btn-retro-primary" : ""}`}
                onClick={() => setPagamento(p)}>{p}</button>
            ))}
          </div>
          {pagamento === "Dinheiro" && (
            <div className="space-y-2 mt-2">
              <div>
                <label className="text-[11px] font-medium">Valor Recebido</label>
                <input type="number" step="0.01" className="input-retro w-full" value={valorRecebido}
                  onChange={(e) => setValorRecebido(Number(e.target.value))} />
              </div>
              <div className="window-frame p-2 text-center">
                <div className="text-[11px] text-muted-foreground">TROCO</div>
                <div className="text-lg font-bold">R$ {troco.toFixed(2)}</div>
              </div>
            </div>
          )}
        </fieldset>
      </div>

      {showSearch && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="window-frame w-[600px]">
            <div className="window-titlebar">Consultar Produto</div>
            <div className="p-4 space-y-3">
              <input className="input-retro w-full" placeholder="Buscar por código ou descrição..." autoFocus
                value={searchProd} onChange={(e) => setSearchProd(e.target.value)} />
              <div className="border-2 border-border max-h-[300px] overflow-y-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="bg-primary text-primary-foreground sticky top-0">
                      <th className="text-left p-1 px-2">Código</th>
                      <th className="text-left p-1 px-2">Descrição</th>
                      <th className="text-right p-1 px-2">Preço</th>
                      <th className="w-[60px]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCat.map((p) => (
                      <tr key={p.codigo} className="hover:bg-accent cursor-pointer">
                        <td className="p-1 px-2">{p.codigo}</td>
                        <td className="p-1 px-2">{p.descricao}</td>
                        <td className="p-1 px-2 text-right">R$ {p.preco.toFixed(2)}</td>
                        <td className="p-1 text-center">
                          <button className="btn-retro btn-retro-success text-[11px]"
                            onClick={() => { addProduto(p); setShowSearch(false); setSearchProd(""); }}>+</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end">
                <button className="btn-retro btn-retro-danger" onClick={() => setShowSearch(false)}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDV;
