import ModulePage from "@/components/ModulePage";

const ContasPagar = () => (
  <ModulePage
    title="Módulo Financeiro — Contas a Pagar"
    moduleName="Contas a Pagar"
    columns={[
      { key: "codigo", label: "Nº" },
      { key: "fornecedor", label: "Fornecedor" },
      { key: "descricao", label: "Descrição" },
      { key: "vencimento", label: "Vencimento" },
      { key: "valor", label: "Valor" },
      { key: "status", label: "Status" },
    ]}
  />
);

export default ContasPagar;
