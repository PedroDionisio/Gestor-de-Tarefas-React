function IconButton({ children, label, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="rounded-md p-1.5 text-muted transition-colors hover:bg-line/60 hover:text-ink"
    >
      {children}
    </button>
  );
}

export default IconButton;
