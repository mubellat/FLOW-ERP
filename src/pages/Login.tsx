import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [cnpj, setCnpj] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Um e-mail de recuperação foi enviado para: " + email);
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="window-frame" style={{ width: 380 }}>
        <div className="window-titlebar flex items-center gap-2">
          <span>🖥️</span>
          {showForgotPassword ? "Recuperar Senha" : "Sistema PDV - Login"}
        </div>

        <div className="p-4">
          {!showForgotPassword ? (
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset-retro">
                <legend>Dados de Acesso</legend>

                <div className="mb-3">
                  <label className="block mb-1 font-medium text-[13px]">CNPJ do Estabelecimento:</label>
                  <input
                    type="text"
                    className="input-retro"
                    placeholder="00.000.000/0000-00"
                    value={cnpj}
                    onChange={(e) => setCnpj(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="block mb-1 font-medium text-[13px]">Usuário:</label>
                  <input
                    type="text"
                    className="input-retro"
                    placeholder="Digite seu usuário"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="block mb-1 font-medium text-[13px]">Senha:</label>
                  <input
                    type="password"
                    className="input-retro"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </div>
              </fieldset>

              <div className="flex items-center justify-between mt-3">
                <button type="submit" className="btn-retro btn-retro-primary">
                  Entrar
                </button>
                <button
                  type="button"
                  className="text-primary underline text-[13px] bg-transparent border-none cursor-pointer"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Esqueci a senha
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleForgotPassword}>
              <fieldset className="fieldset-retro">
                <legend>Recuperação de Senha</legend>

                <p className="text-[13px] mb-3 text-muted-foreground">
                  Informe seu e-mail cadastrado para receber o link de recuperação.
                </p>

                <div className="mb-3">
                  <label className="block mb-1 font-medium text-[13px]">E-mail:</label>
                  <input
                    type="email"
                    className="input-retro"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </fieldset>

              <div className="flex items-center justify-between mt-3">
                <button type="submit" className="btn-retro btn-retro-primary">
                  Enviar
                </button>
                <button
                  type="button"
                  className="btn-retro"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Voltar
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground text-center">
          Sistema PDV/ERP v1.0 — Todos os direitos reservados
        </div>
      </div>
    </div>
  );
};

export default Login;
