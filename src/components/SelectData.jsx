'use client';

import { ArrowUp, ArrowDown } from 'lucide-react';

export default function SelectData({ sortOrder, onSortChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Sort by date:</span>
      <button
        onClick={() => onSortChange('asc')}
        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
          sortOrder === 'asc'
            ? 'bg-accent text-background border border-accent'
            : 'border border-border/50 text-foreground hover:border-accent/50'
        }`}
      >
        <ArrowUp className="w-4 h-4" />
        Oldest
      </button>
      <button
        onClick={() => onSortChange('desc')}
        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${
          sortOrder === 'desc'
            ? 'bg-accent text-background border border-accent'
            : 'border border-border/50 text-foreground hover:border-accent/50'
        }`}
      >
        <ArrowDown className="w-4 h-4" />
        Newest
      </button>
    </div>
  );
}
