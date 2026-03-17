import { useState } from "react";
import { ShoppingCart, Trash2 } from "lucide-react";

interface ItemVenda {
  codigo: string;
  descricao: string;
  qtd: number;
  preco: number;
}

const PDV = () => {
  const [codigoProduto, setCodigoProduto] = useState("");
  const [itens, setItens] = useState<ItemVenda[]>([]);

  const total = itens.reduce((acc, item) => acc + item.qtd * item.preco, 0);

  const addItem = () => {
    if (!codigoProduto) return;
    setItens([
      ...itens,
      { codigo: codigoProduto, descricao: `Produto ${codigoProduto}`, qtd: 1, preco: 9.99 },
    ]);
    setCodigoProduto("");
  };

  const removeItem = (index: number) => {
    setItens(itens.filter((_, i) => i !== index));
  };

  return (
    <div className="flex gap-3 h-full">
      {/* Left - Product list */}
      <div className="flex-1">
        <fieldset className="fieldset-retro">
          <legend>
            <ShoppingCart size={14} className="inline mr-1" />
            PDV — Ponto de Venda
          </legend>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              className="input-retro flex-1"
              placeholder="Código do produto ou código de barras..."
              value={codigoProduto}
              onChange={(e) => setCodigoProduto(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
            />
            <button className="btn-retro btn-retro-primary" onClick={addItem}>
              Adicionar
            </button>
          </div>

          <div className="border-2 border-border">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-1 px-2">Código</th>
                  <th className="text-left p-1 px-2">Descrição</th>
                  <th className="text-center p-1 px-2">Qtd</th>
                  <th className="text-right p-1 px-2">Preço</th>
                  <th className="text-right p-1 px-2">Subtotal</th>
                  <th className="text-center p-1 px-2 w-[50px]">X</th>
                </tr>
              </thead>
              <tbody>
                {itens.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-6 text-muted-foreground">
                      Nenhum item adicionado.
                    </td>
                  </tr>
                ) : (
                  itens.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-card" : "bg-secondary"}>
                      <td className="p-1 px-2">{item.codigo}</td>
                      <td className="p-1 px-2">{item.descricao}</td>
                      <td className="p-1 px-2 text-center">{item.qtd}</td>
                      <td className="p-1 px-2 text-right">R$ {item.preco.toFixed(2)}</td>
                      <td className="p-1 px-2 text-right">R$ {(item.qtd * item.preco).toFixed(2)}</td>
                      <td className="p-1 px-2 text-center">
                        <button onClick={() => removeItem(idx)} className="text-destructive">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>

      {/* Right - Total and actions */}
      <div className="w-[250px]">
        <fieldset className="fieldset-retro">
          <legend>Resumo da Venda</legend>

          <div className="mb-3">
            <div className="text-[12px] text-muted-foreground">Itens: {itens.length}</div>
          </div>

          <div className="window-frame p-3 mb-3 text-center">
            <div className="text-[12px] text-muted-foreground">TOTAL</div>
            <div className="text-2xl font-bold text-primary">
              R$ {total.toFixed(2)}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <button className="btn-retro btn-retro-success w-full text-[13px]">
              ✅ Finalizar Venda (F12)
            </button>
            <button
              className="btn-retro btn-retro-danger w-full text-[13px]"
              onClick={() => setItens([])}
            >
              ❌ Cancelar Venda (ESC)
            </button>
          </div>
        </fieldset>

        <fieldset className="fieldset-retro mt-3">
          <legend>Pagamento</legend>
          <div className="flex flex-col gap-1">
            <button className="btn-retro w-full text-[12px] text-left">💵 Dinheiro</button>
            <button className="btn-retro w-full text-[12px] text-left">💳 Cartão Crédito</button>
            <button className="btn-retro w-full text-[12px] text-left">💳 Cartão Débito</button>
            <button className="btn-retro w-full text-[12px] text-left">📱 PIX</button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default PDV;
