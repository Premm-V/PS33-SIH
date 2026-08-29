// Button — thin wrapper that applies design-system class names.
// Use variant to pick the visual style; all other props pass through.

const variantClass = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  amber:     'btn-amber',
  ghost:     'btn-ghost',
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`${variantClass[variant] ?? variantClass.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
