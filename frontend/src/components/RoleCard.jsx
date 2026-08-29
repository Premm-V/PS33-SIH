// RoleCard — a selectable card for role-selection during signup.
// The value prop must be one of the three contract role strings:
//   "farmer" | "buyer_individual" | "buyer_enterprise"

export default function RoleCard({
  value,
  label,
  description,
  icon: Icon,
  selected,
  onSelect,
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(value)}
      className={`role-card w-full text-left transition-all ${
        selected
          ? 'border-forest bg-forest/5 shadow-sm'
          : 'border-stone/20 hover:border-sage/50 hover:shadow-sm'
      } rounded-xl border-2 p-5 cursor-pointer`}
    >
      <div className="flex items-start gap-4">
        <span
          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
            selected ? 'bg-forest text-white' : 'bg-stone/10 text-stone'
          }`}
        >
          <Icon size={20} strokeWidth={1.8} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={`font-semibold text-sm ${selected ? 'text-forest' : 'text-ink'}`}>
              {label}
            </span>
            {/* Custom radio indicator */}
            <span
              className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                selected
                  ? 'border-forest bg-forest'
                  : 'border-stone/40'
              }`}
            />
          </div>
          <p className="text-xs text-stone mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
    </button>
  )
}
