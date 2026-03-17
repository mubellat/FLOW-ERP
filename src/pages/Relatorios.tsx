import { BarChart3 } from "lucide-react";

const Relatorios = () => {
  const relatorios = [
    { nome: "Vendas por Período", descricao: "Relatório de vendas filtrado por data" },
    { nome: "Produtos Mais Vendidos", descricao: "Ranking dos produtos com mais saídas" },
    { nome: "Clientes por Volume", descricao: "Clientes ordenados por volume de compras" },
    { nome: "Contas a Pagar Vencidas", descricao: "Contas em atraso" },
    { nome: "Contas a Receber Vencidas", descricao: "Recebíveis em atraso" },
    { nome: "Movimentação de Estoque", descricao: "Entradas e saídas do estoque" },
    { nome: "Lucro por Período", descricao: "Lucro bruto por período selecionado" },
  ];

  return (
    <fieldset className="fieldset-retro">
      <legend>
        <BarChart3 size={14} className="inline mr-1" />
        Módulo de Relatórios
      </legend>

      <div className="grid grid-cols-2 gap-2">
        {relatorios.map((rel) => (
          <div key={rel.nome} className="window-frame p-3 cursor-pointer hover:bg-secondary">
            <div className="font-semibold text-[13px] text-primary">{rel.nome}</div>
            <div className="text-[12px] text-muted-foreground">{rel.descricao}</div>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default Relatorios;
