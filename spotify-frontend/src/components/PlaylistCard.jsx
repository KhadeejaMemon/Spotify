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
      ? `http://localhost:5000${playlist.coverImage}`
      : playlist.songs?.length > 0 &&
        playlist.songs[0]?.thumbnail
      ? `http://localhost:5000${playlist.songs[0].thumbnail}`
      : "https://placehold.co/300x300?text=Playlist";



  return (

    <div
      className="
        relative
        group
        cursor-pointer
        rounded-xl
        p-3
        transition
        hover:bg-[#181818]
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
              group-hover:scale-105
              transition
              duration-300
            "

          />

        </div>





        <h2
          className="
            text-white
            font-semibold
            mt-3
            truncate
          "
        >

          {playlist.name}

        </h2>





        <p
          className="
            text-gray-400
            text-sm
            truncate
          "
        >

          {playlist.description || "Playlist"}

        </p>





        <p
          className="
            text-gray-500
            text-xs
            mt-2
          "
        >

          {playlist.songs?.length || 0} songs

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