import { useEffect, useRef } from "react";

const PlaylistMenu = ({
  onClose,
  onEdit,
  onDelete,
}) => {
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute right-3 top-3 bg-[#282828] rounded-lg shadow-xl w-48 z-50 overflow-hidden border border-gray-700"
    >
      <button
        onClick={() => {
          onEdit();
          onClose();
        }}
        className="w-full text-left px-4 py-3 hover:bg-[#3E3E3E] text-white transition"
      >
        ✏️ Edit Playlist
      </button>

      <button
        onClick={() => {
          onDelete();
          onClose();
        }}
        className="w-full text-left px-4 py-3 hover:bg-red-600 text-red-400 hover:text-white transition"
      >
        🗑 Delete Playlist
      </button>
    </div>
  );
};

export default PlaylistMenu;