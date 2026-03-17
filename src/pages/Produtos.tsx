import ModulePage from "@/components/ModulePage";

const Produtos = () => (
  <ModulePage
    title="Cadastro de Produtos"
    moduleName="Produtos"
    columns={[
      { key: "codigo", label: "Código" },
      { key: "descricao", label: "Descrição" },
      { key: "categoria", label: "Categoria" },
      { key: "preco", label: "Preço Unit." },
      { key: "estoque", label: "Estoque" },
    ]}
  />
);

export default Produtos;
