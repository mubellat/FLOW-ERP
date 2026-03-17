import ModulePage from "@/components/ModulePage";

const Clientes = () => (
  <ModulePage
    title="Cadastro de Clientes"
    moduleName="Clientes"
    columns={[
      { key: "codigo", label: "Código" },
      { key: "nome", label: "Nome" },
      { key: "cpfCnpj", label: "CPF/CNPJ" },
      { key: "telefone", label: "Telefone" },
      { key: "cidade", label: "Cidade" },
    ]}
  />
);

export default Clientes;
