function FormField({ label, id, ...inputProps }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        className="rounded-md border border-slate-300 px-4 py-2"
        {...inputProps}
      />
    </div>
  );
}

export default FormField;
