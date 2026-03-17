import { ShoppingCart, Package, Users, CreditCard, BarChart3, Warehouse, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

const cards = [
  { label: "Vendas Hoje", value: "R$ 1.250,00", icon: <ShoppingCart size={20} />, trend: "+12%" },
  { label: "Produtos Cadastrados", value: "148", icon: <Package size={20} /> },
  { label: "Clientes", value: "87", icon: <Users size={20} /> },
  { label: "Contas a Pagar", value: "R$ 3.420,00", icon: <CreditCard size={20} />, trend: "-5%" },
  { label: "Contas a Receber", value: "R$ 8.150,00", icon: <BarChart3 size={20} />, trend: "+8%" },
  { label: "Itens em Estoque", value: "1.230", icon: <Warehouse size={20} /> },
];

const vendasSemana = [
  { dia: "Seg", valor: 820 },
  { dia: "Ter", valor: 1150 },
  { dia: "Qua", valor: 980 },
  { dia: "Qui", valor: 1340 },
  { dia: "Sex", valor: 1890 },
  { dia: "Sáb", valor: 2100 },
  { dia: "Dom", valor: 650 },
];

const vendasMes = [
  { mes: "Jan", vendas: 12500, compras: 8200 },
  { mes: "Fev", vendas: 15300, compras: 9100 },
  { mes: "Mar", vendas: 13800, compras: 7800 },
  { mes: "Abr", vendas: 16200, compras: 10500 },
  { mes: "Mai", vendas: 18900, compras: 11200 },
  { mes: "Jun", vendas: 17100, compras: 9800 },
];

const pagamentoPie = [
  { name: "Dinheiro", value: 35 },
  { name: "Cartão Crédito", value: 30 },
  { name: "Cartão Débito", value: 20 },
  { name: "PIX", value: 15 },
];

const COLORS = ["hsl(214, 100%, 41%)", "hsl(120, 61%, 34%)", "hsl(40, 90%, 50%)", "hsl(0, 68%, 42%)"];

const topProdutos = [
  { produto: "Coca-Cola 2L", qtd: 45 },
  { produto: "Arroz 5kg", qtd: 32 },
  { produto: "Feijão 1kg", qtd: 28 },
  { produto: "Leite Integral", qtd: 25 },
  { produto: "Pão Francês", qtd: 22 },
];

const DashboardHome = () => {
  return (
    <div className="space-y-3">
      {/* Cards resumo */}
      <fieldset className="fieldset-retro">
        <legend>Resumo do Sistema</legend>
        <div className="grid grid-cols-3 gap-3">
          {cards.map((card) => (
            <div key={card.label} className="window-frame p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-primary">{card.icon}</span>
                <span className="font-semibold text-[13px]">{card.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{card.value}</span>
                {card.trend && (
                  <span className={`text-[11px] font-bold flex items-center gap-0.5 ${card.trend.startsWith("+") ? "text-success" : "text-destructive"}`}>
                    {card.trend.startsWith("+") ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {card.trend}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Gráficos */}
      <div className="grid grid-cols-2 gap-3">
        <fieldset className="fieldset-retro">
          <legend>Vendas da Semana (R$)</legend>
          <div className="window-frame p-2" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vendasSemana}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip formatter={(v: number) => `R$ ${v.toFixed(2)}`} />
                <Bar dataKey="valor" fill="hsl(214, 100%, 41%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </fieldset>

        <fieldset className="fieldset-retro">
          <legend>Formas de Pagamento (%)</legend>
          <div className="window-frame p-2 flex items-center justify-center" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pagamentoPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, value }) => `${name}: ${value}%`} fontSize={10}>
                  {pagamentoPie.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </fieldset>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <fieldset className="fieldset-retro">
          <legend>Vendas vs Compras — Últimos 6 Meses (R$)</legend>
          <div className="window-frame p-2" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vendasMes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip formatter={(v: number) => `R$ ${v.toFixed(2)}`} />
                <Legend fontSize={11} />
                <Line type="monotone" dataKey="vendas" stroke="hsl(214, 100%, 41%)" strokeWidth={2} name="Vendas" />
                <Line type="monotone" dataKey="compras" stroke="hsl(0, 68%, 42%)" strokeWidth={2} name="Compras" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </fieldset>

        <fieldset className="fieldset-retro">
          <legend>Top 5 Produtos Mais Vendidos</legend>
          <div className="window-frame p-2" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProdutos} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" fontSize={11} />
                <YAxis dataKey="produto" type="category" fontSize={10} width={100} />
                <Tooltip />
                <Bar dataKey="qtd" fill="hsl(120, 61%, 34%)" name="Quantidade" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default DashboardHome;
