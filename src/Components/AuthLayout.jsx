import Title from "./Title";

function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full justify-center bg-slate-500 p-6">
      <div className="w-full max-w-[500px] space-y-4">
        <Title>Gestor de Tarefas</Title>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
