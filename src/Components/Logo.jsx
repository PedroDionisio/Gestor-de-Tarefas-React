import { Link } from "react-router-dom";
import { Check } from "lucide-react";

function Logo({ light = false }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 font-semibold ${
        light ? "text-white" : "text-ink"
      }`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-white">
        <Check size={16} strokeWidth={3} />
      </span>
      Gestor
    </Link>
  );
}

export default Logo;
