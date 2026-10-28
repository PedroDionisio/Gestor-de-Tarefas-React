function InfoMessage({ children }) {
  return (
    <p
      role="status"
      className="rounded-md border border-accent/20 bg-accent-soft px-3 py-2 text-sm text-accent-hover"
    >
      {children}
    </p>
  );
}

export default InfoMessage;
