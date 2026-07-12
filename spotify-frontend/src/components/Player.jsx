import { usePlayer } from "../context/PlayerContext";

import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
} from "react-icons/fa";
const formatTime = (time) => {
  if (!time || isNaN(time)) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const Player = () => {
  const {
    currentSong,
    isPlaying,
    togglePlay,

    nextSong,
    previousSong,

    currentTime,
    duration,

    seekSong,

    volume,
    changeVolume,
  } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-24 bg-[#181818] border-t border-gray-800 flex items-center justify-between px-5">

      {/* LEFT */}

      <div className="flex items-center gap-3 w-1/4">
        <img
          src={`http://localhost:5000${currentSong.thumbnail}`}
          alt={currentSong.title}
          className="w-14 h-14 rounded"
        />

        <div>
          <h4 className="text-white font-medium">
            {currentSong.title}
          </h4>

          <p className="text-gray-400 text-sm">
            {currentSong.artist?.name}
          </p>
        </div>
      </div>

      {/* CENTER */}

      <div className="flex flex-col items-center w-2/4">

        <div className="flex items-center gap-4 mb-2">

        <button
  onClick={previousSong}
  className="text-white text-xl hover:text-green-500"
>
  <FaStepBackward />
</button>
<button
  onClick={togglePlay}
  className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center"
>
  {isPlaying ? <FaPause /> : <FaPlay />}
</button>
         <button
  onClick={nextSong}
  className="text-white text-xl hover:text-green-500"
>
  <FaStepForward />
</button>

        </div>

        <div className="flex items-center gap-3 w-full">

          <span className="text-xs text-gray-400">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => seekSong(Number(e.target.value))}
            className="w-full"
          />

          <span className="text-xs text-gray-400">
            {formatTime(duration)}
          </span>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-3 w-1/4 justify-end">

      <FaVolumeUp className="text-white" />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) =>
            changeVolume(Number(e.target.value))
          }
        />

      </div>

    </div>
  );
};

export default Player;