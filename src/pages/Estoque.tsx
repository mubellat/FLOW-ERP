import ModulePage from "@/components/ModulePage";

const Estoque = () => (
  <ModulePage
    title="Módulo Estoque — Controle de Estoque"
    moduleName="Estoque"
    columns={[
      { key: "codigo", label: "Código" },
      { key: "produto", label: "Produto" },
      { key: "qtdAtual", label: "Qtd Atual" },
      { key: "qtdMinima", label: "Qtd Mínima" },
      { key: "ultimaMovimentacao", label: "Última Movimentação" },
    ]}
  />
);

export default Estoque;
