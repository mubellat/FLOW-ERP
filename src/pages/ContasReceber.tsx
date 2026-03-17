import ModulePage from "@/components/ModulePage";

const ContasReceber = () => (
  <ModulePage
    title="Módulo Financeiro — Contas a Receber"
    moduleName="Contas a Receber"
    columns={[
      { key: "codigo", label: "Nº" },
      { key: "cliente", label: "Cliente" },
      { key: "descricao", label: "Descrição" },
      { key: "vencimento", label: "Vencimento" },
      { key: "valor", label: "Valor" },
      { key: "status", label: "Status" },
    ]}
  />
);

export default ContasReceber;
