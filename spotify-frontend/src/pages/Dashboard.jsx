import { useEffect, useState } from "react";

import {
  Users,
  Music,
  Disc3,
  Mic2,
  ListMusic,
} from "lucide-react";

import { getStats } from "../services/adminService";
import StatCard from "../components/StatCard";

const Dashboard = () => {

  const [stats, setStats] = useState({
    users: 0,
    songs: 0,
    albums: 0,
    artists: 0,
    playlists: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {

      const res = await getStats();

      if (res.data.success) {
        setStats(res.data.stats);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="text-white text-2xl p-8">
        Loading Dashboard...
      </div>
    );

  }

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold text-white mb-2">
        Spotify Admin Dashboard
      </h1>

      <p className="text-gray-400 mb-8">
        Manage your Spotify Clone from one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <StatCard
          title="Users"
          value={stats.users}
          icon={<Users className="text-green-500" />}
        />

        <StatCard
          title="Songs"
          value={stats.songs}
          icon={<Music className="text-green-500" />}
        />

        <StatCard
          title="Albums"
          value={stats.albums}
          icon={<Disc3 className="text-green-500" />}
        />

        <StatCard
          title="Artists"
          value={stats.artists}
          icon={<Mic2 className="text-green-500" />}
        />

        <StatCard
          title="Playlists"
          value={stats.playlists}
          icon={<ListMusic className="text-green-500" />}
        />

      </div>

    </div>

  );

};

export default Dashboard;