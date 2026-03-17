import { useState } from "react";

interface Column {
  key: string;
  label: string;
}

interface ModulePageProps {
  title: string;
  columns: Column[];
  moduleName: string;
}

const ModulePage = ({ title, columns, moduleName }: ModulePageProps) => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <fieldset className="fieldset-retro">
        <legend>{title}</legend>

        <div className="flex items-center gap-2 mb-3">
          <label className="text-[13px] font-medium">Buscar:</label>
          <input
            type="text"
            className="input-retro flex-1"
            placeholder={`Pesquisar em ${moduleName}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn-retro btn-retro-primary">Buscar</button>
          <button className="btn-retro btn-retro-success">+ Novo</button>
        </div>

        <div className="border-2 border-border">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                {columns.map((col) => (
                  <th key={col.key} className="text-left p-1 px-2 font-semibold border-r border-primary-foreground/30 last:border-r-0">
                    {col.label}
                  </th>
                ))}
                <th className="text-center p-1 px-2 font-semibold w-[100px]">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={columns.length + 1} className="text-center p-8 text-muted-foreground">
                  Nenhum registro encontrado.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-2 text-[12px] text-muted-foreground">
          <span>Total de registros: 0</span>
          <div className="flex gap-1">
            <button className="btn-retro text-[11px]">« Anterior</button>
            <button className="btn-retro text-[11px]">Próximo »</button>
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default ModulePage;
