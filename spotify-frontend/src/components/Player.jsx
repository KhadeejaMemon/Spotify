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
  loading,
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
   <div
className="
fixed
bottom-0
left-0
w-full
h-24
bg-[#181818]/95
backdrop-blur-lg
border-t
border-gray-800
flex
items-center
justify-between
px-6
shadow-2xl
z-50
"
>
     {/* LEFT */}

<div
className="
flex
items-center
gap-4
w-1/4
min-w-0
"
>

<img
src={`https://spotify-backend-gilt.vercel.app${currentSong.thumbnail}`}
alt={currentSong.title}
className="
w-14
h-14
rounded-xl
object-cover
shadow-lg
hover:scale-105
transition-all
duration-300
"
/>

<div className="min-w-0">

<h4
className="
text-white
font-semibold
truncate
"
>
{currentSong.title}
</h4>

<p
className="
text-sm
text-gray-400
truncate
"
>
{currentSong.artist?.name}
</p>

</div>

</div>
     {/* CENTER */}

<div className="flex flex-col items-center w-2/4">

<div className="flex items-center gap-6 mb-3">

<button
onClick={previousSong}
className="
text-gray-300
hover:text-green-500
hover:scale-110
transition-all
duration-300
"
>
<FaStepBackward size={18}/>
</button>

<button
onClick={togglePlay}
className="
w-12
h-12
rounded-full
bg-white
text-black
flex
items-center
justify-center
shadow-xl
hover:scale-110
active:scale-95
transition-all
duration-300
"
>

{loading ? (

<div
className="
w-5
h-5
border-2
border-black
border-t-transparent
rounded-full
animate-spin
"
/>

) : isPlaying ? (

<FaPause size={18}/>

) : (

<FaPlay size={18} className="ml-1"/>

)}

</button>

<button
onClick={nextSong}
className="
text-gray-300
hover:text-green-500
hover:scale-110
transition-all
duration-300
"
>
<FaStepForward size={18}/>
</button>

</div>

<div className="flex items-center gap-3 w-full">

<span className="text-xs text-gray-400 w-10">
{formatTime(currentTime)}
</span>

<input
type="range"
min="0"
max={duration || 0}
value={currentTime}
onChange={(e)=>seekSong(Number(e.target.value))}
className="
w-full
accent-green-500
cursor-pointer
hover:accent-green-400
transition-all
duration-300
"
/>

<span className="text-xs text-gray-400 w-10 text-right">
{formatTime(duration)}
</span>

</div>

</div>

     {/* RIGHT */}

<div
className="
flex
items-center
justify-end
gap-3
w-1/4
"
>

<FaVolumeUp
className="
text-gray-300
text-lg
"
/>

<input
type="range"
min="0"
max="1"
step="0.01"
value={volume}
onChange={(e)=>
changeVolume(Number(e.target.value))
}
className="
w-28
accent-green-500
cursor-pointer
hover:accent-green-400
transition-all
duration-300
"
/>

</div>
    </div>
  );
};

export default Player;