import ModulePage from "@/components/ModulePage";

const Usuarios = () => (
  <ModulePage
    title="Controle de Acesso — Usuários"
    moduleName="Usuários"
    columns={[
      { key: "codigo", label: "Código" },
      { key: "nome", label: "Nome" },
      { key: "login", label: "Login" },
      { key: "perfil", label: "Perfil" },
      { key: "status", label: "Status" },
    ]}
  />
);

export default Usuarios;
