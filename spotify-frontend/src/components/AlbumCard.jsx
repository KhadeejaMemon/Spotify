import { useNavigate } from "react-router-dom";

const AlbumCard = ({ album }) => {
  const navigate = useNavigate();

  return (
    <div
  onClick={() => navigate(`/albums/${album._id}`)}
  className="
    group
    cursor-pointer
    bg-[#181818]
    border
    border-[#262626]
    p-4
    rounded-2xl
    shadow-md
    hover:bg-[#232323]
    hover:border-[#3a3a3a]
    hover:-translate-y-1
    hover:shadow-2xl
    transition-all
    duration-300
    overflow-hidden
  "
>
  <div className="overflow-hidden rounded-xl">

  <img
    src={`https://spotify-backend-gilt.vercel.app${album.coverImage}`}
    alt={album.title}
    className="
      w-full
      aspect-square
      object-cover
      rounded-xl
      transition-all
      duration-500
      group-hover:scale-105
    "
  />

</div>
<h2
  className="
    mt-4
    text-base
    font-bold
    text-white
    truncate
    group-hover:text-green-400
    transition-all
    duration-300
  "
>
  {album.title}
</h2>

<p
  className="
    mt-1
    text-xs
    text-gray-400
    truncate
  "
>
  Album • {album.artist?.name}
</p>
    </div>
  );
};

export default AlbumCard;