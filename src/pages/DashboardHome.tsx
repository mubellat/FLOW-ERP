import { ShoppingCart, Package, Users, CreditCard, BarChart3, Warehouse } from "lucide-react";

const cards = [
  { label: "Vendas Hoje", value: "R$ 0,00", icon: <ShoppingCart size={20} /> },
  { label: "Produtos Cadastrados", value: "0", icon: <Package size={20} /> },
  { label: "Clientes", value: "0", icon: <Users size={20} /> },
  { label: "Contas a Pagar", value: "R$ 0,00", icon: <CreditCard size={20} /> },
  { label: "Contas a Receber", value: "R$ 0,00", icon: <BarChart3 size={20} /> },
  { label: "Itens em Estoque", value: "0", icon: <Warehouse size={20} /> },
];

const DashboardHome = () => {
  return (
    <div>
      <fieldset className="fieldset-retro">
        <legend>Resumo do Sistema</legend>
        <div className="grid grid-cols-3 gap-3">
          {cards.map((card) => (
            <div key={card.label} className="window-frame p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-primary">{card.icon}</span>
                <span className="font-semibold text-[13px]">{card.label}</span>
              </div>
              <div className="text-xl font-bold">{card.value}</div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default DashboardHome;
