import { inputClass } from "../utils/styles";

function FormField({ label, id, ...inputProps }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {label}
      </label>
      <input id={id} className={inputClass} {...inputProps} />
    </div>
  );
}

export default FormField;
