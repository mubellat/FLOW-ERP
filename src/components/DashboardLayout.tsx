import { Outlet } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col">
        <div className="window-titlebar flex items-center justify-between">
          <span>Sistema PDV / ERP — Painel Principal</span>
          <span className="text-[11px] opacity-80">
            {new Date().toLocaleDateString("pt-BR")}
          </span>
        </div>
        <div className="flex-1 p-3 overflow-auto">
          <Outlet />
        </div>
        <div className="border-t-2 border-border px-3 py-1 text-[11px] text-muted-foreground flex justify-between">
          <span>Operador: Admin</span>
          <span>PDV/ERP v1.0</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
