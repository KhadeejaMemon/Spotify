import { createContext, useContext, useEffect, useRef, useState } from "react";
import API from "../services/api";
export const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  const [currentSong, setCurrentSong] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
const [loading,setLoading]=useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolume] = useState(1);
const addToHistory = async (songId) => {
  try {

    await API.post(`/history/${songId}`);

  } catch(error){

    console.log("History error:", error);

  }
};
  // ================= PLAY SONG =================
// ================= PLAY SONG =================
// const playSong = async (song, songs = playlist) => {

//   if (!song?.audio) return;

//   setLoading(true);

//   await addToHistory(song._id);

//   if (songs.length > 0) {
//     setPlaylist(songs);

//     const index = songs.findIndex(
//       (s) => s._id === song._id
//     );

//     if (index !== -1) {
//       setCurrentIndex(index);
//     }
//   }

//   setCurrentSong(song);

//   audioRef.current.src =
//     `https://spotify-backend-gilt.vercel.app${song.audio}`;

//   audioRef.current.play();

//   setIsPlaying(true);
// };

const playSong = async (song, songs = playlist) => {

  if (!song) return;


  setLoading(true);


  // History only for database songs
  if(song._id && !song.isSpotify){
    await addToHistory(song._id);
  }



  if (songs.length > 0) {

    setPlaylist(songs);


    const index = songs.findIndex(
      (s)=>s._id === song._id
    );


    if(index !== -1){
      setCurrentIndex(index);
    }

  }



  setCurrentSong(song);



  let audioUrl;



  // Spotify API song

  if(song.isSpotify){

    audioUrl = song.previewUrl;

  }


  // MongoDB song

  else{

    audioUrl =
    `https://spotify-backend-gilt.vercel.app${song.audio}`;

  }



  audioRef.current.src = audioUrl;


  audioRef.current.load();


  await audioRef.current.play();


  setIsPlaying(true);


};
  // ================= PAUSE =================

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  // ================= RESUME =================

  const resumeSong = () => {
    if (!currentSong) return;

    audioRef.current.play();

    setIsPlaying(true);
  };

  // ================= TOGGLE =================

  const togglePlay = () => {
    if (!currentSong) return;

    isPlaying ? pauseSong() : resumeSong();
  };

  const handleCanPlay = () => {
  setLoading(false);
};

const handleWaiting = () => {
  setLoading(true);
};
  // ================= NEXT =================

  const nextSong = () => {
    if (playlist.length === 0) return;

    const nextIndex =
      currentIndex === playlist.length - 1
        ? 0
        : currentIndex + 1;

    playSong(playlist[nextIndex], playlist);
  };

  // ================= PREVIOUS =================

  const previousSong = () => {
    if (playlist.length === 0) return;

    const prevIndex =
      currentIndex === 0
        ? playlist.length - 1
        : currentIndex - 1;

    playSong(playlist[prevIndex], playlist);
  };

  // ================= SEEK =================

  const seekSong = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // ================= VOLUME =================

  const changeVolume = (value) => {
    audioRef.current.volume = value;
    setVolume(value);
  };

  // ================= EVENTS =================

  useEffect(() => {
  const audio = audioRef.current;

  const handleTimeUpdate = () => {
    setCurrentTime(audio.currentTime);
    setDuration(audio.duration || 0);
  };

  const handleEnded = () => {
    nextSong();
  };

  audio.addEventListener("timeupdate", handleTimeUpdate);
  audio.addEventListener("ended", handleEnded);

  audio.addEventListener("canplay", handleCanPlay);
  audio.addEventListener("waiting", handleWaiting);

  return () => {
    audio.removeEventListener("timeupdate", handleTimeUpdate);
    audio.removeEventListener("ended", handleEnded);

    audio.removeEventListener("canplay", handleCanPlay);
    audio.removeEventListener("waiting", handleWaiting);
  };
}, [currentIndex, playlist]);

  return (
    <PlayerContext.Provider
     value={{
  audioRef,

  currentSong,
  playlist,
  currentIndex,

  isPlaying,
  loading,

  currentTime,
  duration,

  volume,

  playSong,
  pauseSong,
  resumeSong,
  togglePlay,

  nextSong,
  previousSong,

  seekSong,
  changeVolume,

  setPlaylist,
}}
    >
      {children}
    </PlayerContext.Provider>
  );
};
