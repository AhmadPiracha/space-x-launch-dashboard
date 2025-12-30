import { useState, useMemo } from 'react';
import FilterTabs from './FilterTabs';
import SelectData from './SelectData';

const FILTERS_STATUS = {
  all: 'All',
  success: 'Success',
  failed: 'Failed',
  upcoming: 'Upcoming',
};

export default function LaunchesList({ launches, rockets, onSelectLaunch }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredAndSortedLaunches = useMemo(() => {
    let filtered = launches;

    if (activeFilter === 'success') {
      filtered = filtered.filter((launch) => launch.success === true);
    } else if (activeFilter === 'failed') {
      filtered = filtered.filter((launch) => launch.success === false);
    } else if (activeFilter === 'upcoming') {
      filtered = filtered.filter((launch) => launch.upcoming === true);
    }

    const sorted = [...filtered].sort((a, b) => {
      const dateA = new Date(a.date_utc).getTime();
      const dateB = new Date(b.date_utc).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return sorted;
  }, [launches, activeFilter, sortOrder]);
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg p-4">
        <FilterTabs
          filters={FILTERS_STATUS}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <SelectData sortOrder={sortOrder} onSortChange={setSortOrder} />
      </div>
    </div>
  );
}
