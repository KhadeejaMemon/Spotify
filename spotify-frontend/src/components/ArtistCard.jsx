import { useNavigate } from "react-router-dom";

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/artists/${artist._id}`)}
      className="
        group 
        cursor-pointer 
        p-3 
        rounded-lg 
        hover:bg-[#181818] 
        transition-all 
        duration-300
      "
    >

      <div className="overflow-hidden rounded-full">

        <img
          src={
            artist.image
              ? `http://localhost:5000${artist.image}`
              : "/default-artist.png"
          }
          alt={artist.name}
          className="
            w-full 
            aspect-square 
            object-cover 
            rounded-full
            group-hover:scale-105
            transition
            duration-300
          "
        />

      </div>


      <h2 className="
        text-white 
        font-semibold 
        mt-4 
        truncate
      ">
        {artist.name}
      </h2>


      <p className="
        text-gray-400 
        text-sm
        mt-1
      ">
        Artist
      </p>


    </div>
  );
};

export default ArtistCard;