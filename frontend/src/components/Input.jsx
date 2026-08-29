// Input — labelled form input with consistent design-system styling.

export default function Input({
  id,
  label,
  hint,
  className = '',
  ...props
}) {
  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <input id={id} className="input-field" {...props} />
      {hint && (
        <p className="text-xs text-stone mt-1">{hint}</p>
      )}
    </div>
  )
}
