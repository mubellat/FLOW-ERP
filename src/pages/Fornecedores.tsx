import ModulePage from "@/components/ModulePage";

const Fornecedores = () => (
  <ModulePage
    title="Cadastro de Fornecedores"
    moduleName="Fornecedores"
    columns={[
      { key: "codigo", label: "Código" },
      { key: "razaoSocial", label: "Razão Social" },
      { key: "cnpj", label: "CNPJ" },
      { key: "telefone", label: "Telefone" },
      { key: "cidade", label: "Cidade" },
    ]}
  />
);

export default Fornecedores;
