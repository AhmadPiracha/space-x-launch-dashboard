import { useState, useEffect, useRef } from 'react';
import LaunchesList from './components/LauchesList';
import LaunchDetails from './components/LauchDetails';
import { Loader2 } from 'lucide-react';
import './App.css';

function App() {
  const [launches, setLaunches] = useState([]);
  const [rockets, setRockets] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [launchesRes, rocketsRes] = await Promise.all([
          fetch('https://api.spacexdata.com/v4/launches'),
          fetch('https://api.spacexdata.com/v4/rockets'),
        ]);

        if (!launchesRes.ok || !rocketsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const launchesData = await launchesRes.json();
        const rocketsData = await rocketsRes.json();

        console.log('Launch data', launchesData);
        console.log('Rockets data', rocketsData);

        const rocketMap = rocketsData.reduce((map, rocket) => {
          map[rocket.id] = rocket.name;
          return map;
        }, {});

        console.log('Rocket Map', rocketMap);

        setRockets(rocketMap);
        setLaunches(launchesData);
        setError(null);
      } catch (err) {
        setError('Failed to load SpaceX launches. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(147,197,253,0.5)_0%,_transparent_50%)]" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="mb-2">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3">
              SpaceX Launches
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore SpaceX's comprehensive mission history with detailed
              flight information, mission status, and rocket specifications.
            </p>
          </div>
        </div>

        <LaunchesList
          launches={launches}
          rockets={rockets}
          onSelectLaunch={setSelectedLaunch}
        />
      </div>

      {selectedLaunch && (
      <LaunchDetails
        launch={selectedLaunch}
        rocketName={rockets[selectedLaunch.rocket]}
        onClose={() => setSelectedLaunch(null)}
      />
    )}
    </div>
  );
}

export default App;

// import { useEffect, useState } from 'react';
// import './App.css';

// const PAGE_SIZES = [5, 10, 20, 50];

// function getParams() {
//   const params = new URLSearchParams(window.location.search);
//   return {
//     page: Number(params.get('page')) || 1,
//     pageSize: Number(params.get('pageSize')) || 10,
//   };
// }

// function setParams(page, pageSize) {
//   const params = new URLSearchParams();
//   params.set('page', page);
//   params.set('pageSize', pageSize);
//   window.history.pushState({}, '', `?${params.toString()}`);
// }

// function App() {
//   const initial = getParams();

//   const [page, setPage] = useState(initial.page);
//   const [pageSize, setPageSize] = useState(initial.pageSize);
//   const [launches, setLaunches] = useState([]);
//   const [rockets, setRockets] = useState({});
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setParams(page, pageSize);

//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const launchesRes = await fetch(
//           'https://api.spacexdata.com/v4/launches/query',
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               query: {},
//               options: {
//                 page,
//                 limit: pageSize,
//                 sort: { date_utc: 'desc' },
//                 select: ['name', 'date_utc', 'success', 'rocket'],
//               },
//             }),
//           }
//         );

//         const rocketsRes = await fetch('https://api.spacexdata.com/v4/rockets');

//         const launchesData = await launchesRes.json();
//         const rocketsData = await rocketsRes.json();

//         const rocketMap = rocketsData.reduce((map, r) => {
//           map[r.id] = r.name;
//           return map;
//         }, {});

//         setLaunches(launchesData.docs);
//         setTotalPages(launchesData.totalPages);
//         setRockets(rocketMap);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [page, pageSize]);

//   const renderSkeletons = () =>
//     Array.from({ length: pageSize }).map((_, i) => (
//       <div
//         key={i}
//         className="grid grid-cols-5 gap-4 p-3 animate-pulse border-b"
//       >
//         <div className="h-4 bg-gray-300 rounded" />
//         <div className="h-4 bg-gray-300 rounded" />
//         <div className="h-4 bg-gray-300 rounded" />
//         <div className="h-4 bg-gray-300 rounded" />
//         <div className="h-4 bg-gray-300 rounded" />
//       </div>
//     ));

//   const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
//     Math.max(0, page - 3),
//     page + 2
//   );

//   return (
//     <div className="min-h-screen p-8 max-w-6xl mx-auto">
//       <h1 className="text-4xl font-bold mb-6">SpaceX Launches</h1>

//       {/* Controls */}
//       <div className="flex justify-between items-center mb-4">
//         <div>
//           <label className="mr-2 text-sm">Rows per page:</label>
//           <select
//             value={pageSize}
//             onChange={(e) => {
//               setPage(1);
//               setPageSize(Number(e.target.value));
//             }}
//             className="border rounded px-2 py-1"
//           >
//             {PAGE_SIZES.map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="text-sm text-gray-500">
//           Page {page} of {totalPages}
//         </div>
//       </div>

//       {/* Table */}
//       <div>
//         <div className="grid grid-cols-5 gap-4 font-semibold border-b p-3">
//           <div>#</div>
//           <div>Mission</div>
//           <div>Rocket</div>
//           <div>Date</div>
//           <div>Status</div>
//         </div>

//         {loading
//           ? renderSkeletons()
//           : launches.map((launch, index) => (
//               <div
//                 key={launch.id}
//                 className="grid grid-cols-5 gap-4 p-3 border-b last:border-b-0"
//               >
//                 <div className="text-gray-500">
//                   {(page - 1) * pageSize + index + 1}
//                 </div>
//                 <div className="font-medium">{launch.name}</div>
//                 <div>{rockets[launch.rocket] || 'Unknown'}</div>
//                 <div className="text-sm text-gray-500">
//                   {new Date(launch.date_utc).toLocaleDateString()}
//                 </div>
//                 <div className="text-sm">
//                   {launch.success === null
//                     ? 'Pending'
//                     : launch.success
//                     ? 'Success ✅'
//                     : 'Failed ❌'}
//                 </div>
//               </div>
//             ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center gap-2 mt-6">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-3 py-1 border rounded disabled:opacity-40"
//         >
//           Prev
//         </button>

//         {pages.map((p) => (
//           <button
//             key={p}
//             onClick={() => setPage(p)}
//             className={`px-3 py-1 border rounded ${
//               p === page ? 'bg-black text-white' : ''
//             }`}
//           >
//             {p}
//           </button>
//         ))}

//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage((p) => p + 1)}
//           className="px-3 py-1 border rounded disabled:opacity-40"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;
