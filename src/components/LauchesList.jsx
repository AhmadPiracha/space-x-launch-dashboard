import { useState, useMemo, useEffect } from 'react';
import FilterTabs from './FilterTabs';
import SelectData from './SelectData';
import LaunchCard from './LaunchCard';

const FILTERS_STATUS = {
  all: 'All',
  success: 'Success',
  failed: 'Failed',
  upcoming: 'Upcoming',
};

const PAGE_SIZE = 9;


export default function LaunchesList({ launches, rockets, onSelectLaunch }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);


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

  const totalPages = Math.ceil(filteredAndSortedLaunches.length / PAGE_SIZE);
  const paginatedLaunches = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredAndSortedLaunches.slice(start, start + PAGE_SIZE);
  }, [filteredAndSortedLaunches, page]);


  useEffect(() => {
    setPage(1);
  }, [activeFilter, sortOrder]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg p-4">
        <FilterTabs filters={FILTERS_STATUS} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <SelectData sortOrder={sortOrder} onSortChange={setSortOrder} />
      </div>

      {filteredAndSortedLaunches.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {paginatedLaunches.map((launch) => (
            <LaunchCard
              key={launch.id}
              launch={launch}
              rocketName={rockets[launch.rocket]}
              onClick={() => onSelectLaunch(launch)}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center border border-border/30 bg-card/30 backdrop-blur-sm rounded-lg">
          <p className="text-muted-foreground mb-2 text-lg">No launches found</p>
          <p className="text-sm text-muted-foreground mb-6">Try adjusting your filters</p>
          <button
            onClick={() => setActiveFilter("all")}
            className="px-4 py-2 border border-accent/30 hover:border-accent hover:bg-accent/10 text-accent rounded-md transition-colors cursor-pointer"
          >
            View All Launches
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40 cursor-pointer"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, page - 2), page + 1)
            .map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 border rounded cursor-pointer ${p === page ? 'bg-accent text-white' : ''
                  }`}
              >
                {p}
              </button>
            ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}


      <div className="text-center text-sm text-muted-foreground pt-4">
        Showing{" "}
        <span className="text-accent font-semibold">
          {(page - 1) * PAGE_SIZE + paginatedLaunches.length}
        </span>{" "}
        of{" "}
        <span className="text-accent font-semibold">
          {filteredAndSortedLaunches.length}
        </span>{" "}
        launches
      </div>

    </div>
  );
}