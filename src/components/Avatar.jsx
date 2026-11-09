const SIZES = {
  sm: "h-8 w-8 text-sm",
  lg: "h-16 w-16 text-2xl",
};

function Avatar({ name, size = "sm" }) {
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-accent-soft font-semibold text-accent ${SIZES[size]}`}
    >
      {initial}
    </span>
  );
}

export default Avatar;
