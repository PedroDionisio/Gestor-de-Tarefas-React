function InfoMessage({ children }) {
  return (
    <p
      role="status"
      className="rounded-md bg-green-100 p-3 text-sm text-green-800"
    >
      {children}
    </p>
  );
}

export default InfoMessage;
