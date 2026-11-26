import "./FormField.css";

// Wraps any input with a label, optional required star and error message.
export default function FormField({ id, label, required, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label} {required && <span className="required">*</span>}
      </label>
      {children}
      {error && <p className="error">{error}</p>}
    </div>
  );
}