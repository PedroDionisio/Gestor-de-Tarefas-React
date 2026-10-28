import { LoaderCircle } from "lucide-react";

function Loader({ fullPage = false }) {
  const loader = (
    <div
      role="status"
      className="flex items-center justify-center gap-2 py-6 text-sm text-muted"
    >
      <LoaderCircle size={18} className="animate-spin" />
      <span>A carregar...</span>
    </div>
  );

  if (!fullPage) return loader;

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas">
      {loader}
    </div>
  );
}

export default Loader;
