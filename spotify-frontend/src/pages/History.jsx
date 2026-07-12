import { useEffect, useState } from "react";
import API from "../services/api";
import HistoryCard from "../components/HistoryCard";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const res = await API.get("/history");

      if (res.data.success) {
        setHistory(res.data.history);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#121212]">
        <h2 className="text-white text-2xl">
          Loading History...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">

      {/* Header */}

      <div className="bg-gradient-to-b from-[#4d2d8b] via-[#24123c] to-[#121212]">

        <div className="p-10">

          <p className="uppercase text-sm tracking-widest text-gray-300">
            Your Music
          </p>

          <h1 className="text-6xl font-black mt-4">
            Recently Played
          </h1>

          <p className="text-gray-300 mt-5 text-lg">
            Songs you've listened to recently.
          </p>

          <p className="text-gray-400 mt-2">
            {history.length} Songs
          </p>

        </div>

      </div>

      {/* Songs */}

      <div className="px-10 py-8">

        {history.length === 0 ? (

          <div className="text-center mt-20">

            <h2 className="text-3xl font-bold">
              No History Yet
            </h2>

            <p className="text-gray-400 mt-4">
              Play some songs and they'll appear here.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">

            {history.map((item) => (
              <HistoryCard
                key={item._id}
                item={item}
                history={history}
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default History;