import { useLocation, useNavigate } from "react-router-dom";
import {
  Package, Users, UserCog, Truck, CreditCard, Receipt,
  BarChart3, ShoppingCart, ClipboardList, Warehouse,
  ArrowLeftRight, LogOut, LayoutDashboard
} from "lucide-react";
import { useState } from "react";

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface Module {
  name: string;
  items: MenuItem[];
}

const modules: Module[] = [
  {
    name: "Cadastro",
    items: [
      { label: "Produtos", path: "/dashboard/produtos", icon: <Package size={14} /> },
      { label: "Clientes", path: "/dashboard/clientes", icon: <Users size={14} /> },
      { label: "Fornecedores", path: "/dashboard/fornecedores", icon: <Truck size={14} /> },
      { label: "Usuários", path: "/dashboard/usuarios", icon: <UserCog size={14} /> },
    ],
  },
  {
    name: "Financeiro",
    items: [
      { label: "Contas a Pagar", path: "/dashboard/contas-pagar", icon: <CreditCard size={14} /> },
      { label: "Contas a Receber", path: "/dashboard/contas-receber", icon: <Receipt size={14} /> },
    ],
  },
  {
    name: "Vendas",
    items: [
      { label: "PDV - Ponto de Venda", path: "/dashboard/pdv", icon: <ShoppingCart size={14} /> },
      { label: "Pedidos de Venda", path: "/dashboard/pedidos", icon: <ClipboardList size={14} /> },
      { label: "Consultar Vendas", path: "/dashboard/vendas", icon: <ClipboardList size={14} /> },
    ],
  },
  {
    name: "Compras",
    items: [
      { label: "Pedidos de Compra", path: "/dashboard/compras", icon: <ArrowLeftRight size={14} /> },
    ],
  },
  {
    name: "Estoque",
    items: [
      { label: "Controle de Estoque", path: "/dashboard/estoque", icon: <Warehouse size={14} /> },
    ],
  },
  {
    name: "Relatórios",
    items: [
      { label: "Relatórios", path: "/dashboard/relatorios", icon: <BarChart3 size={14} /> },
    ],
  },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleModule = (name: string) => {
    setCollapsed((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="w-[220px] min-h-screen border-r-2 border-border bg-secondary flex flex-col">
      <div className="window-titlebar flex items-center gap-2 text-[12px]">
        <LayoutDashboard size={14} />
        Menu Principal
      </div>

      <div className="flex-1 overflow-y-auto">
        {modules.map((mod) => (
          <div key={mod.name}>
            <button
              className="sidebar-module-header w-full text-left flex items-center justify-between"
              onClick={() => toggleModule(mod.name)}
            >
              {mod.name}
              <span className="text-[10px]">{collapsed[mod.name] ? "▶" : "▼"}</span>
            </button>
            {!collapsed[mod.name] &&
              mod.items.map((item) => (
                <div
                  key={item.path}
                  className={`sidebar-item flex items-center gap-2 ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  {item.icon}
                  {item.label}
                </div>
              ))}
          </div>
        ))}
      </div>

      <div className="border-t-2 border-border p-2">
        <button
          className="btn-retro btn-retro-danger w-full flex items-center justify-center gap-2 text-[12px]"
          onClick={() => navigate("/")}
        >
          <LogOut size={14} />
          Sair do Sistema
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
