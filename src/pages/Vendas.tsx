import ModulePage from "@/components/ModulePage";

const Vendas = () => (
  <ModulePage
    title="Módulo Vendas — Consultar Vendas"
    moduleName="Vendas"
    columns={[
      { key: "numero", label: "Nº Venda" },
      { key: "data", label: "Data" },
      { key: "cliente", label: "Cliente" },
      { key: "itens", label: "Itens" },
      { key: "total", label: "Total" },
      { key: "pagamento", label: "Pagamento" },
    ]}
  />
);

export default Vendas;
