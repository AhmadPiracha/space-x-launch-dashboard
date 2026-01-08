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

        // console.log('Launch data', launchesData);
        // console.log('Rockets data', rocketsData);

        const rocketMap = rocketsData.reduce((map, rocket) => {
          map[rocket.id] = rocket.name;
          return map;
        }, {});

        // console.log('Rocket Map', rocketMap);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-lg p-6 max-w-md text-center">
          <p className="text-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-accent text-background rounded-md hover:bg-accent/90 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    )
  }

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