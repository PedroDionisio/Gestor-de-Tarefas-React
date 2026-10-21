import { Link } from "react-router-dom";
import Title from "../components/Title";

function NotFound() {
  return (
    <div className="flex min-h-screen w-full justify-center bg-slate-500 p-6">
      <div className="w-full max-w-[500px] space-y-4 text-center">
        <Title>Página não encontrada</Title>
        <Link to="/" className="font-medium text-slate-100 underline">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
