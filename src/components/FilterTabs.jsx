export default function FilterTabs({ filters, activeFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(filters).map(([key, label]) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeFilter === key
              ? 'bg-accent text-background border border-accent'
              : 'border border-border/50 text-foreground hover:border-accent/50'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
