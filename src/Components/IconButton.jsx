function IconButton({ children, label, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="rounded-md bg-slate-400 p-2 text-white hover:bg-slate-500"
    >
      {children}
    </button>
  );
}

export default IconButton;
