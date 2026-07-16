import { Link } from "react-router-dom";
import { useState } from "react";

import PlaylistMenu from "./PlaylistMenu";
import EditPlaylistModal from "./EditPlaylistModal";
import DeletePlaylistModal from "./DeletePlaylistModal";


const PlaylistCard = ({ playlist }) => {

  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

const image =
  playlist.coverImage
    ? `https://spotify-backend-gilt.vercel.app${playlist.coverImage}`
    : playlist.songs?.length > 0 && playlist.songs[0]?.thumbnail
    ? (
        playlist.songs[0].thumbnail.startsWith("http")
          ? playlist.songs[0].thumbnail
          : `https://spotify-backend-gilt.vercel.app${playlist.songs[0].thumbnail}`
      )
    : "https://placehold.co/300x300?text=Playlist";



  return (

    <div
     className="
relative
group
cursor-pointer
bg-[#181818]
border
border-[#262626]
rounded-2xl
p-4
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


      {/* Menu */}

      <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
  }}
  className="
    absolute
    top-3
    right-3
    w-10
    h-10
    flex
    items-center
    justify-center
    rounded-full
    bg-black/70
    text-white
    hover:bg-green-500
    hover:text-black
    transition
    z-50
  "
>
  ⋮
</button>



      {
        showMenu && (

          <PlaylistMenu

            onClose={() => setShowMenu(false)}

            onEdit={() => setShowEditModal(true)}

            onDelete={() => setShowDeleteModal(true)}

          />

        )
      }





      <Link to={`/playlist/${playlist._id}`}>



        <div className="
          overflow-hidden
          rounded-xl
          aspect-square
        ">

          <img


            src={image}

            alt={playlist.name}
className="
w-full
h-full
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
{playlist.name}
</h2>

<p
className="
mt-1
text-xs
text-gray-400
truncate
"
>
{playlist.description || "Playlist"}
</p>

<p
className="
mt-2
text-xs
text-gray-500
"
>
🎵 {playlist.songs?.length || 0} Songs
</p>



      </Link>






      {
        showEditModal && (

          <EditPlaylistModal

            playlist={playlist}

            onClose={() => setShowEditModal(false)}

            onSuccess={() => window.location.reload()}

          />

        )
      }





      {
        showDeleteModal && (

          <DeletePlaylistModal

            playlist={playlist}

            onClose={() => setShowDeleteModal(false)}

            onSuccess={() => window.location.reload()}

          />

        )
      }



    </div>

  );

};


export default PlaylistCard;