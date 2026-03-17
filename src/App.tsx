import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "./pages/Login";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Produtos from "./pages/Produtos";
import Clientes from "./pages/Clientes";
import Fornecedores from "./pages/Fornecedores";
import Usuarios from "./pages/Usuarios";
import ContasPagar from "./pages/ContasPagar";
import ContasReceber from "./pages/ContasReceber";
import PDV from "./pages/PDV";
import Vendas from "./pages/Vendas";
import Compras from "./pages/Compras";
import Estoque from "./pages/Estoque";
import Relatorios from "./pages/Relatorios";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="produtos" element={<Produtos />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="fornecedores" element={<Fornecedores />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="contas-pagar" element={<ContasPagar />} />
            <Route path="contas-receber" element={<ContasReceber />} />
            <Route path="pdv" element={<PDV />} />
            <Route path="vendas" element={<Vendas />} />
            <Route path="compras" element={<Compras />} />
            <Route path="estoque" element={<Estoque />} />
            <Route path="relatorios" element={<Relatorios />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
