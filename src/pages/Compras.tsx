import ModulePage from "@/components/ModulePage";

const Compras = () => (
  <ModulePage
    title="Módulo Compras — Pedidos de Compra"
    moduleName="Compras"
    columns={[
      { key: "numero", label: "Nº Pedido" },
      { key: "fornecedor", label: "Fornecedor" },
      { key: "data", label: "Data" },
      { key: "total", label: "Valor Total" },
      { key: "status", label: "Status" },
    ]}
  />
);

export default Compras;
