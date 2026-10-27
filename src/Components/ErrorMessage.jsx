function ErrorMessage({ children }) {
  return (
    <p role="alert" className="rounded-md bg-red-100 p-3 text-sm text-red-700">
      {children}
    </p>
  );
}

export default ErrorMessage;
