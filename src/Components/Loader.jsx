import { LoaderCircle } from "lucide-react";

function Loader({ fullPage = false, className = "text-slate-500" }) {
  const loader = (
    <div
      role="status"
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      <LoaderCircle className="animate-spin" />
      <span>A carregar...</span>
    </div>
  );

  if (!fullPage) return loader;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-500 text-slate-100">
      {loader}
    </div>
  );
}

export default Loader;
